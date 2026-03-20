"""
matte_remove2.py - Corrección definitiva de halos.
Trabaja sobre logo_transparent_v7.png.
Para píxeles opacos visibles adyacentes a la transparencia con G dominante:
  - Reemplazar color a negro oscuro manteniendo opaco
  - Así el halo verde se convierte en halo negro, coherente con el contorno.
"""
from PIL import Image
import numpy as np
from scipy.ndimage import binary_dilation

INPUT_PNG = r"C:\Users\VN\WEB-AQUA\logo_transparent_v7.png"
OUTPUT    = r"C:\Users\VN\WEB-AQUA\logo_clean_final3.png"

img  = Image.open(INPUT_PNG).convert("RGBA")
w, h = img.size
data = np.array(img, dtype=np.uint8)

R = data[:,:,0].astype(int)
G = data[:,:,1].astype(int)
B = data[:,:,2].astype(int)
A = data[:,:,3]

# Zona transparente actual
transparent = A == 0

# Ampliar zona transparente 1-5 px
for iters in [1, 2, 3, 4]:
    border_zone = binary_dilation(transparent, iterations=iters) & ~transparent
    
    # En esa franja, identificar verde halo (G dominante, B bajo, no teal, no salmón, no blanco)
    halo_green = (
        border_zone &
        (G > R + 5) &      # verde domina rojo
        (G > B + 30) &     # verde domina azul
        (B < 105) &        # no es teal
        ~((R > 200) & (G > 200) & (B > 180))  # no blanco
    )
    
    # Proteger arco salmón: R > G implica que G no domina, ya cubierto.
    # Pero a veces el arco rosa-salmón puede tener G cerca de R:
    salmon = (R > 160) & (R > B + 30)
    halo_green = halo_green & ~salmon
    
    # Reemplazar esos píxeles: cambiar color a gris oscuro (50,50,50) 
    # manteniendo alpha opaco para no adelgazar el contorno
    ys, xs = np.where(halo_green)
    data[ys, xs, 0] = 50
    data[ys, xs, 1] = 50
    data[ys, xs, 2] = 50
    # alpha queda igual (255 = opaco)

# También eliminar la estrella de esquina inf-der si quedó algo
star_zone = np.zeros((h, w), dtype=bool)
star_zone[int(h*0.82):, int(w*0.82):] = True
star_pix = star_zone & (A > 0) & (G > R) & (G > B) & (G > 80)
data[star_pix, 3] = 0

out_img = Image.fromarray(data, 'RGBA')
out_img.save(OUTPUT, 'PNG')

total = w * h
transparent_final = (data[:,:,3] == 0).sum()
print(f"Guardado: {OUTPUT}")
print(f"Total transparentes: {transparent_final} / {total} ({transparent_final/total*100:.1f}%)")
