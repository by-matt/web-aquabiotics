"""
remove_bg_halo_fix.py - Estrategia definitiva para halos de contorno JPEG.

El halo verde exterior de los contornos es porque en el JPG original, 
los píxeles frontera negro-verde tienen mezcla: son verde oscuro.
Solución: después de hacer transparente el fondo, erosionar 1-2px el alpha
(shrink el logo ligeramente) para cortar esos píxeles mixtos del borde exterior.
"""
from PIL import Image, ImageFilter, ImageChops
import numpy as np
from scipy.ndimage import label, binary_erosion, binary_dilation

INPUT  = r"C:\Users\VN\.gemini\antigravity\brain\4d669f62-b1c5-4719-9623-3351963a1331\media__1772077595089.jpg"
OUTPUT = r"C:\Users\VN\WEB-AQUA\logo_clean_final.png"

img = Image.open(INPUT).convert("RGBA")
w, h = img.size
data = np.array(img, dtype=np.uint8)
R = data[:,:,0].astype(int)
G = data[:,:,1].astype(int)
B = data[:,:,2].astype(int)

# --- Protegidos ---
arc_salmon   = (R > G + 20) & (R > B + 20) & (R > 140)
alga_teal    = (B > 90) & ~arc_salmon
blue_waves   = (B > 120) & (B > R - 20)
white_fill   = (R > 200) & (G > 200) & (B > 180)
dark_outline = (R < 90) & (G < 90) & (B < 90)
protected    = arc_salmon | alga_teal | blue_waves | white_fill | dark_outline

# --- Verde neón a eliminar ---
neon = (G > 185) & (B < 80) & (G > R + 10) & ~protected

# Estrella esquina inf-der
star_zone = np.zeros((h, w), dtype=bool)
star_zone[int(h*0.82):, int(w*0.82):] = True
star_green = star_zone & (G > R) & (G > B) & (G > 80)

to_remove = neon | star_green

# Expandir 9px
to_remove_img = Image.fromarray(to_remove.astype(np.uint8) * 255, 'L')
to_remove_exp = to_remove_img.filter(ImageFilter.MaxFilter(9))
to_remove_exp_arr = np.array(to_remove_exp) > 127
to_remove_final = (to_remove_exp_arr & ~protected) | to_remove

# Flood fill desde bordes
labeled, _ = label(to_remove_final)
border_labels = set()
border_labels.update(int(x) for x in labeled[0, :])
border_labels.update(int(x) for x in labeled[h-1, :])
border_labels.update(int(x) for x in labeled[:, 0])
border_labels.update(int(x) for x in labeled[:, w-1])
border_labels.discard(0)

remove_mask = np.zeros((h, w), dtype=bool)
for lbl in border_labels:
    remove_mask |= (labeled == lbl)
internal = to_remove_final & ~remove_mask
remove_mask |= internal
remove_mask |= star_green

# --- NUEVA ESTRATEGIA: Erosión del logo para eliminar píxeles de borde mixtos ---
# keep_mask = lo que se mantiene opaco
keep_mask = ~remove_mask

# Erosionar keep_mask 2px -> corta el exterior del logo donde están los halos
# Usamos erosión con estructura de 3x3 (1px) o 5x5 (2px)
keep_eroded = binary_erosion(keep_mask, iterations=2)

# La diferencia (borde que se erosionó): hacerla semi-transparente para suavizar
eroded_border = keep_mask & ~keep_eroded

# Resultado final: 
# - zona removida (remove_mask): alpha=0
# - zona erosionada borde: check si es verde -> alpha=0, si no -> semi-transparente
result = data.copy()
result[remove_mask, 3] = 0

# En el borde erosionado: si el pixel tiene dominancia verde, hacerlo transparente
border_R = R[eroded_border]
border_G = G[eroded_border]
border_B = B[eroded_border]
is_green_border = (border_G > border_R + 3) & (border_G > border_B + 20) & (border_B < 100)

# Crear array de indices del borde
eroded_ys, eroded_xs = np.where(eroded_border)
green_border_ys = eroded_ys[is_green_border]
green_border_xs = eroded_xs[is_green_border]
not_green_ys = eroded_ys[~is_green_border]
not_green_xs = eroded_xs[~is_green_border]

# Los verdes del borde -> transparente
result[green_border_ys, green_border_xs, 3] = 0
# Los no-verdes del borde -> semi-transparente (80%) para suave antialias
result[not_green_ys, not_green_xs, 3] = 200

out_img = Image.fromarray(result, 'RGBA')
out_img.save(OUTPUT, 'PNG')

total = w * h
transparent = (result[:,:,3] == 0).sum()
print(f"Guardado: {OUTPUT}")
print(f"Pixeles transparentes: {transparent} / {total} ({transparent/total*100:.1f}%)")
print(f"Pixeles opacos: {total-transparent} ({(1-transparent/total)*100:.1f}%)")
