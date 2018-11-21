import pygame
import glob

img = glob.glob('**/**.jpg', recursive = True) + glob.glob('**/**.png', recursive=True)
print(img)

W = 500

for i in img:
	c = pygame.image.load(i)

	if c.get_width() > W:

		scale_factor = W / c.get_width()

		pygame.image.save(pygame.transform.scale(c, (W, int(c.get_height() * scale_factor))), i)
