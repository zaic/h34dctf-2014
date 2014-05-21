fin = open("crypt.txt", "r")
ct = fin.read()
pt = []

sum = 0
for c in ct:
	if c.isalpha():
		cur = ord(c.lower()) - ord('a')
		if c.isupper():
			sum += cur
		else:
			sum -= cur
	if c == '@':
		pt.append(chr(sum))
		sum = 0
			
pt = ''.join(pt)

print pt



