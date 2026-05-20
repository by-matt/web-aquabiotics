"""
matte_remove3.py - Pasada final más agresiva sobre halos exteriores.
Trabaja sobre final3 y expande la zona de corrección a 8px del borde.
"""
from PIL import Image
import numpy as np
from scipy.ndimage import binary_dilation

INPUT_PNG = r"C:\Users\VN\WEB-AQUA\logo_clean_final3.png"
OUTPUT    = r"C:\Users\VN\WEB-AQUA\logo_clean_final4.png"

img  = Image.open(INPUT_PNG).convert("RGBA")
w, h = img.size
data = np.array(img, dtype=np.uint8)

R = data[:,:,0].astype(int)
G = data[:,:,1].astype(int)
B = data[:,:,2].astype(int)
A = data[:,:,3]

transparent = A == 0

# Capas de distancia al borde transparente
for iters in range(1, 9):
    border_zone = binary_dilation(transparent, iterations=iters) & ~transparent
    
    # Halo verde en el exterior: G domina, B bajo
    halo_green = (
        border_zone &
        (G > R + 3) &
        (G > B + 20) &
        (B < 115) &
        ~((R > 200) & (G > 200) & (B > 180))  # no blanco
    )
    
    # No tocar arco salmón (R claramente dominante)
    salmon = (R > G + 10) & (R > 150)
    halo_green = halo_green & ~salmon
    
    # No tocar azul/teal (B alto)
    teal_blue = (B > 110)
    halo_green = halo_green & ~teal_blue
    
    # Reemplazar color a oscuro
    ys, xs = np.where(halo_green)
    data[ys, xs, 0] = 45
    data[ys, xs, 1] = 45
    data[ys, xs, 2] = 45

out_img = Image.fromarray(data, 'RGBA')
out_img.save(OUTPUT, 'PNG')
print(f"Guardado: {OUTPUT}")
