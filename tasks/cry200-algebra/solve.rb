require 'socket'
require 'openssl'

$MESSAGE_MODULE = 170141183460469231731687303715884105727

def message_to_number(message, key)
    num = message.bytes.reduce(0){ |res, cur| (res<<8)|cur }
    num * key % $MESSAGE_MODULE
end

def number_to_message(number, key)
    number = number * key % $MESSAGE_MODULE
    message = ""
    while number > 0 do
        message = (number & 0xff).chr + message
        number >>= 8
    end
    return message
end

hello_string = "Hello, client!"
hello_number = hello_string.bytes.reduce(0){ |res, cur| (res<<8)|cur } % $MESSAGE_MODULE
# hello_divider = hello_number ** (2 ** 999 - 1) % $MESSAGE_MODULE
hello_divider = hello_number.to_bn.mod_exp($MESSAGE_MODULE - 2, $MESSAGE_MODULE)

loop do
    sock = TCPSocket.open("ctf.h34dump.com", 2803)
    hello = sock.gets.to_i
    puts hello
    key = hello * hello_divider % $MESSAGE_MODULE
    puts "key = #{key}"
    key_hack = key.to_bn.mod_exp($MESSAGE_MODULE - 2, $MESSAGE_MODULE)
    sock.puts(message_to_number("Hello, server", key_hack))
    flag = sock.gets.to_i
    puts number_to_message(flag, key_hack)
    break
end
