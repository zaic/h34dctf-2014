require 'socket'
require 'timeout'

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

server = TCPServer.new("0.0.0.0", 2803)
flag = File.read("flag.txt").chomp

loop do
    Thread.start(server.accept) do |client|
        begin
            key = Random.rand($MESSAGE_MODULE)
            puts "key = #{key.to_s}"
            puts(message_to_number("Hello, client!", key))
            client.puts(message_to_number("Hello, client!", key))
            s = ""
            timeout(10) { s = client.gets.to_i }
            puts number_to_message(s, key).to_s.inspect
            client.puts(message_to_number(flag, key)) if number_to_message(s, key) == "Hello, server"
        rescue Timeout::Error
            # :(
        end
    end
end
