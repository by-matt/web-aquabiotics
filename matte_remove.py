"""
matte_remove.py - Decontaminación de color verde en PNG con canal alpha ya procesado.

Trabaja sobre logo_transparent_v7.png (que tiene buen alpha) y elimina
los píxeles verdes residuales en el borde:
- Si un píxel visible tiene componente verde dominante Y está adyacente a transparencia
  -> hacerlo transparente directamente.
- Esto elimina precisamente el halo sin cortar el interior del logo.
"""
from PIL import Image
import numpy as np
from scipy.ndimage import binary_dilation

# Partir desde el mejor resultado: v7
INPUT_PNG = r"C:\Users\VN\WEB-AQUA\logo_transparent_v7.png"
OUTPUT    = r"C:\Users\VN\WEB-AQUA\logo_clean_final2.png"

img  = Image.open(INPUT_PNG).convert("RGBA")
w, h = img.size
data = np.array(img, dtype=np.uint8)

R = data[:,:,0].astype(int)
G = data[:,:,1].astype(int)
B = data[:,:,2].astype(int)
A = data[:,:,3]

# --- Zona transparente actual ---
transparent = A == 0

# --- Zona de borde: píxeles opacos adyacentes a transparencia (1-4px) ---
border_zone = binary_dilation(transparent, iterations=4) & ~transparent

# --- En esa franja: identificar píxeles con verde dominante ---
# Halo JPEG: G > R, B bajo, no muy azul
# Distinguir de la alga teal que tiene B > 90
halo_green = (
    border_zone &
    (G > R + 3) &           # verde domina sobre rojo
    (G > B + 25) &          # verde domina sobre azul
    (B < 100) &             # no es teal azulado
    (G > 100)               # suficientemente verde para ser artefacto
)

# Proteger: arco salmón (en el borde, R puede ser alto)
arc_salmon = (R > G + 15) & (R > 140)
halo_green = halo_green & ~arc_salmon

# Proteger: blanco real (olas blancas)  
white = (R > 200) & (G > 200) & (B > 180)
halo_green = halo_green & ~white

# --- También: estrella verde de esquina inf-der (en caso de que quedara) ---
star_zone = np.zeros((h, w), dtype=bool)
star_zone[int(h*0.82):, int(w*0.82):] = True
star_remaining = star_zone & A > 0 & (G > R) & (G > B) & (G > 80)

# Eliminar esos píxeles (hacerlos transparentes)
remove_extra = halo_green | star_remaining

result = data.copy()
result[remove_extra, 3] = 0

# Guardar
out_img = Image.fromarray(result, 'RGBA')
out_img.save(OUTPUT, 'PNG')

total = w * h
transparent_final = (result[:,:,3] == 0).sum()
removed_extra = remove_extra.sum()
print(f"Guardado: {OUTPUT}")
print(f"Pixeles adicionales eliminados (halos): {removed_extra}")
print(f"Total transparentes: {transparent_final} / {total} ({transparent_final/total*100:.1f}%)")
