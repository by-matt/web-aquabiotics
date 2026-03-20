"""
remove_bg_final.py - Estrategia definitiva:
1. Eliminar fondo verde + estrella (como antes)
2. En lugar de hacer transparentes los halos verdes del BORDE de contornos,
   NEUTRALIZARLOS convirtiéndolos a negro (el color del contorno),
   así no se nota en el resultado final.
"""
from PIL import Image, ImageFilter
import numpy as np
from scipy.ndimage import label, binary_dilation

INPUT  = r"C:\Users\VN\.gemini\antigravity\brain\4d669f62-b1c5-4719-9623-3351963a1331\media__1772077595089.jpg"
OUTPUT = r"C:\Users\VN\WEB-AQUA\logo_final_clean.png"

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

# --- Verde neón principal a eliminar ---
neon = (G > 185) & (B < 80) & (G > R + 10) & ~protected

# Estrella esquina inf-der
star_zone = np.zeros((h, w), dtype=bool)
star_zone[int(h*0.82):, int(w*0.82):] = True
star_green = star_zone & (G > R) & (G > B) & (G > 80)

to_remove = neon | star_green

# --- Expandir 9px para halos JPEG ---
to_remove_img = Image.fromarray(to_remove.astype(np.uint8) * 255, 'L')
to_remove_exp = to_remove_img.filter(ImageFilter.MaxFilter(9))
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
internal = to_remove_final & ~remove_mask
remove_mask |= internal
remove_mask |= star_green

# --- Post-proceso: halos de borde ---
# Zona que bordea lo transparente (1-3px hacia adentro)
border_halo = binary_dilation(remove_mask, iterations=4) & ~remove_mask

# En esa franja: si el pixel tiene verde dominante (halo JPEG),
# REEMPLAZAR por negro (color del contorno) en lugar de hacer transparente
result = data.copy()

# Primero hacer transparente el fondo principal
result[remove_mask, 3] = 0

# Ajustar los halos verdes en la franja de borde: convertir a negro oscuro
halo_pixels = border_halo & (G > R + 5) & (G > B + 30) & (B < 100) & ~protected
result[halo_pixels, 0] = 40   # R
result[halo_pixels, 1] = 40   # G  -> gris oscuro/negro
result[halo_pixels, 2] = 40   # B
result[halo_pixels, 3] = 255  # opaco

# Segunda pasada
border_halo2 = binary_dilation(remove_mask, iterations=7) & ~remove_mask
halo_pixels2 = border_halo2 & (G > R + 8) & (G > B + 40) & (B < 85) & ~protected & ~halo_pixels
result[halo_pixels2, 0] = 50
result[halo_pixels2, 1] = 50
result[halo_pixels2, 2] = 50
result[halo_pixels2, 3] = 200  # semi-transparente para suavizar

out_img = Image.fromarray(result, 'RGBA')
out_img.save(OUTPUT, 'PNG')

total = w * h
removed = remove_mask.sum()
print(f"Guardado: {OUTPUT}")
print(f"Pixeles eliminados (transparentes): {removed} / {total} ({removed/total*100:.1f}%)")
print(f"Pixeles conservados: {total-removed} ({(1-removed/total)*100:.1f}%)")
