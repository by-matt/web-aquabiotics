"""
remove_checkerboard.py - Remueve el fondo ajedrezado (checkerboard) de un PNG exportado
con transparencia visible. El checkerboard tiene cuadros grises y blancos alternados.
"""
from PIL import Image
import numpy as np
from scipy.ndimage import label

INPUT  = r"C:\Users\VN\.gemini\antigravity\brain\4d669f62-b1c5-4719-9623-3351963a1331\media__1772080504325.jpg"
OUTPUT = r"C:\Users\VN\WEB-AQUA\logo_definitivo.png"

img  = Image.open(INPUT).convert("RGBA")
w, h = img.size
data = np.array(img, dtype=np.uint8)

R = data[:,:,0].astype(int)
G = data[:,:,1].astype(int)
B = data[:,:,2].astype(int)

# El fondo checkerboard tiene: gris claro (186-210, 186-210, 186-210) y blanco (240-255)
# Son zonas acromáticas (R≈G≈B) y claras.
# El logo tiene colores (salmón, teal, azul, púrpura) excepto las olas blancas y contornos.

# Detectar checkerboard: pixels acromáticos claros
gray_diff = np.abs(R - G) + np.abs(G - B) + np.abs(R - B)
is_achromatic = gray_diff < 25  # muy poca diferencia entre canales
is_light = (R > 175) & (G > 175) & (B > 175)
is_checkerboard = is_achromatic & is_light

# Proteger olas blancas del logo: también son blancas pero están dentro del logo
# Diferencia: el checkerboard conecta con los bordes de la imagen
labeled, _ = label(is_checkerboard)

border_labels = set()
border_labels.update(int(x) for x in labeled[0, :])
border_labels.update(int(x) for x in labeled[h-1, :])
border_labels.update(int(x) for x in labeled[:, 0])
border_labels.update(int(x) for x in labeled[:, w-1])
border_labels.discard(0)

remove_mask = np.zeros((h, w), dtype=bool)
for lbl in border_labels:
    remove_mask |= (labeled == lbl)

# Agujeros internos de letras (zonas checkerboard no conectadas al borde)
internal = is_checkerboard & ~remove_mask
remove_mask |= internal

# Aplicar transparencia
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
