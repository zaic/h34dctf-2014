from PIL import Image
from struct import pack

im = Image.open("tan.png")
pix = im.load()

orig = Image.open("Wikipe-tan_meditating.png")
pix_orig = orig.load()

width, height = im.size

def set_bit(v, index, x):
  """Set the index:th bit of v to x, and return the new value."""
  mask = 1 << index
  v &= ~mask
  if x:
    v |= mask
  return v

def get_bit(v, index):
  mask = 1 << index
  v &= mask
  if v:
    return 1
  return 0
  
def flip_bit(v, index):
  numbits = 8
  flipped = sum(1<<i for i in range(numbits) if (i != index and (v>>i)&1) or (i == index and (v>>i)&1 == 0))
  return flipped

def unhide(pix, pix_orig):
	sz = 0
	cur_byte = 0
	cur_bit = 7
	data = []

	for y in xrange(height):
		for x in xrange(width):
			if pix[x,y] != (255,255,255): # don't touch transparent pixels
				for color in xrange(3):
					for pix_pos in [1,0]:
						pic_bit = get_bit(pix[x,y][color], pix_pos)
						orig_pic_bit = get_bit(pix_orig[x,y][color], pix_pos)
						cur_byte = set_bit(cur_byte, cur_bit, pic_bit^orig_pic_bit)	
						cur_bit -= 1
						if cur_bit < 0:
							data.append(pack("B", cur_byte))
							cur_bit = 7
							cur_byte += 0
						
	return "".join(data)

data = unhide(pix, pix_orig)

out = open("unhide", "wb")
out.write(data)