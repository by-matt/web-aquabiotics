"""
remove_bg_v9.py - Limpieza final definitiva de halos verdes en contornos
Estrategia adicional: post-proceso sobre el resultado v8, 
erosionar 1px cualquier píxel verde-residual que esté en zona transparente-adyacente.
"""
from PIL import Image, ImageFilter
import numpy as np
from scipy.ndimage import label, binary_dilation

INPUT  = r"C:\Users\VN\.gemini\antigravity\brain\4d669f62-b1c5-4719-9623-3351963a1331\media__1772077595089.jpg"
OUTPUT = r"C:\Users\VN\WEB-AQUA\logo_transparent_v9.png"

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

# --- Verde a eliminar (MUY agresivo en halos) ---
neon = (G > 185) & (B < 80) & (G > R + 10) & ~protected
# Halo JPEG: cualquier pixel con G dominante sobre R y B bajo, aunque sea sutil
halo = (G > 130) & (B < 90) & (G > R + 5) & (G > B + 50) & ~protected

# Estrella esquina inf-der
star_zone = np.zeros((h, w), dtype=bool)
star_zone[int(h*0.82):, int(w*0.82):] = True
star_green = star_zone & (G > R) & (G > B) & (G > 80)

to_remove = neon | halo | star_green

# --- Expandir 11px (5px cada lado) para capturar halos JPEG ---
to_remove_img = Image.fromarray(to_remove.astype(np.uint8) * 255, 'L')
to_remove_exp = to_remove_img.filter(ImageFilter.MaxFilter(11))
to_remove_exp_arr = np.array(to_remove_exp) > 127

to_remove_final = (to_remove_exp_arr & ~protected) | to_remove

# --- Flood fill desde bordes ---
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

# Agujeros internos de letras + estrella
internal = to_remove_final & ~remove_mask
remove_mask |= internal
remove_mask |= star_green

# --- Post-proceso: eliminar píxeles con G>R y B bajo que sean adyacentes a zona transparente ---
# Esto captura halos de contorno que no entraron en la máscara anterior
transparent_now = remove_mask.copy()
# Dilatar 3px la zona transparente
transparent_dilated = binary_dilation(transparent_now, iterations=3)
# En esa zona borde, eliminar cualquier píxel con verde dominante moderado
border_zone = transparent_dilated & ~transparent_now
residual_green = border_zone & (G > R + 2) & (G > B + 30) & (B < 110) & ~protected
remove_mask |= residual_green

# Segunda pasada del post-proceso
transparent_now2 = remove_mask.copy()
transparent_dilated2 = binary_dilation(transparent_now2, iterations=2)
border_zone2 = transparent_dilated2 & ~transparent_now2
residual_green2 = border_zone2 & (G > R) & (G > B + 20) & (B < 100) & ~protected
remove_mask |= residual_green2

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
