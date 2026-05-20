"""
remove_bg_v7.py - Ajuste fino: eliminar residuos verdes dentro de la alga
y la estrella verde de la esquina si no forma parte del logo oficial.
"""
from PIL import Image, ImageFilter
import numpy as np
from scipy.ndimage import label

INPUT  = r"C:\Users\VN\.gemini\antigravity\brain\4d669f62-b1c5-4719-9623-3351963a1331\media__1772077595089.jpg"
OUTPUT = r"C:\Users\VN\WEB-AQUA\logo_transparent_v7.png"

img = Image.open(INPUT).convert("RGBA")
w, h = img.size
data = np.array(img, dtype=np.uint8)
R = data[:,:,0].astype(int)
G = data[:,:,1].astype(int)
B = data[:,:,2].astype(int)

# --- 1. Mascaras de elementos del logo a PROTEGER ---
# Arco salmon/rojo
arc_salmon = (R > G + 20) & (R > B + 20) & (R > 140)
# Alga teal (azul-verdoso con B alto)
# En la alga: B va de 100 a 160, G de 140 a 200, R de 60 a 150
# Criterio: B > 90 (diferencia clave con verde neon que tiene B < 40)
alga_teal = (B > 90) & ~arc_salmon
# Olas azul/purpura
blue_waves = (B > 120) & (B > R - 20)
# Blanco (olas blancas, relleno letras)
white_fill = (R > 200) & (G > 200) & (B > 180)
# Contornos oscuros
dark_outline = (R < 90) & (G < 90) & (B < 90)
# Estrella verde en esquina inferior derecha - PARTE del logo, mantener por ahora
# (sera decision del usuario si mantenerla)

protected = arc_salmon | alga_teal | blue_waves | white_fill | dark_outline

# --- 2. Verde neon a eliminar ---
# Verde neon puro: G alto, B muy bajo, G domina
neon_strict = (G > 195) & (B < 70) & (G > R + 15) & ~protected

# Verde ligeramente contaminado en bordes de la alga
# Entre la alga y el fondo puede haber mezcla: g alto, b medio-bajo
neon_halo = (G > 170) & (B < 85) & (G > R + 10) & ~protected & ~alga_teal

to_remove = neon_strict | neon_halo

# --- 3. Expandir para capturar halos de JPEG compression ---
to_remove_img = Image.fromarray(to_remove.astype(np.uint8) * 255, 'L')
to_remove_expanded = to_remove_img.filter(ImageFilter.MaxFilter(5))
to_remove_exp_arr = np.array(to_remove_expanded) > 127

# No expandir sobre zonas protegidas
to_remove_final = to_remove_exp_arr & ~protected
to_remove_final |= to_remove  # siempre incluir los originales no protegidos

# --- 4. Flood fill: separar fondo exterior de agujeros de letras ---
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

# Agujeros internos de letras (componentes verdes internas)
internal = to_remove_final & ~remove_mask
remove_mask |= internal

# --- 5. Guardar ---
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
