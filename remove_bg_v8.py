"""
remove_bg_v8.py - Limpieza final: elimina verde residual en bordes + estrella verde
"""
from PIL import Image, ImageFilter
import numpy as np
from scipy.ndimage import label

INPUT  = r"C:\Users\VN\.gemini\antigravity\brain\4d669f62-b1c5-4719-9623-3351963a1331\media__1772077595089.jpg"
OUTPUT = r"C:\Users\VN\WEB-AQUA\logo_transparent_v8.png"

img = Image.open(INPUT).convert("RGBA")
w, h = img.size
data = np.array(img, dtype=np.uint8)
R = data[:,:,0].astype(int)
G = data[:,:,1].astype(int)
B = data[:,:,2].astype(int)

# --- Protegidos del logo ---
arc_salmon = (R > G + 20) & (R > B + 20) & (R > 140)
alga_teal  = (B > 90) & ~arc_salmon
blue_waves = (B > 120) & (B > R - 20)
white_fill = (R > 200) & (G > 200) & (B > 180)
dark_outline = (R < 90) & (G < 90) & (B < 90)

protected = arc_salmon | alga_teal | blue_waves | white_fill | dark_outline

# --- Verde a eliminar: MAS AGRESIVO para halos ---
# Incluye verde puro neon Y verde en halos de borde (G>R, B bajo)
neon = (G > 185) & (B < 80) & (G > R + 10) & ~protected

# Verde muy ligeramente mezclado en bordes de contorno (halo JPEG)
# Estos tienen G moderado, B muy bajo, cerca de contornos
halo = (G > 150) & (B < 70) & (G > R + 5) & ~protected

# La estrella verde en esquina inf-derecha: eliminar toda zona verde en esa esquina
# Aproximadamente x > w*0.85, y > h*0.85
star_zone = np.zeros((h, w), dtype=bool)
star_zone[int(h*0.82):, int(w*0.82):] = True
star_green = star_zone & (G > R) & (G > B) & (G > 100)

to_remove = neon | halo | star_green

# --- Expandir para capturar residuos de compression JPEG (7px) ---
to_remove_img = Image.fromarray(to_remove.astype(np.uint8) * 255, 'L')
to_remove_exp = to_remove_img.filter(ImageFilter.MaxFilter(9))  # 4px cada lado
to_remove_exp_arr = np.array(to_remove_exp) > 127

# Aplicar expansion solo fuera de protegidos
to_remove_final = (to_remove_exp_arr & ~protected) | to_remove

# --- Flood fill: separar fondo exterior de agujeros de letras ---
labeled, num_features = label(to_remove_final)

border_labels = set()
border_labels.update(int(x) for x in labeled[0, :])
border_labels.update(int(x) for x in labeled[h-1, :])
border_labels.update(int(x) for x in labeled[:, 0])
border_labels.update(int(x) for x in labeled[:, w-1])
border_labels.discard(0)

remove_mask = np.zeros((h, w), dtype=bool)
for lbl in border_labels:
    remove_mask |= (labeled == lbl)

# Agujeros internos de letras
internal = to_remove_final & ~remove_mask
remove_mask |= internal

# La estrella siempre se elimina aunque no conecte al borde
remove_mask |= star_green

# --- Guardar ---
result = data.copy()
result[remove_mask, 3] = 0

out_img = Image.fromarray(result, 'RGBA')
out_img.save(OUTPUT, 'PNG')

total = w * h
removed = remove_mask.sum()
print(f"Guardado: {OUTPUT}")
print(f"Resolucion: {w}x{h}")
print(f"Pixeles eliminados: {removed} / {total} ({removed/total*100:.1f}%)")
print(f"Pixeles conservados: {total-removed} ({(1-removed/total)*100:.1f}%)")
