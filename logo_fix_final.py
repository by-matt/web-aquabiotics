"""
logo_fix_final.py
1. Elimina fondo checkerboard (gris/blanco ajedrezado) -> transparente
2. Convierte elementos rojos (letras, puntos, olas superiores) -> BLANCO
3. Conserva: arco salmón, alga teal, olas azul/púrpura
"""
from PIL import Image
import numpy as np
from scipy.ndimage import label

INPUT  = r"C:\Users\VN\.gemini\antigravity\brain\4d669f62-b1c5-4719-9623-3351963a1331\media__1772080504325.jpg"
OUTPUT = r"C:\Users\VN\WEB-AQUA\logo_definitivo_v2.png"

img  = Image.open(INPUT).convert("RGBA")
w, h = img.size
data = np.array(img, dtype=np.uint8)
R = data[:,:,0].astype(int)
G = data[:,:,1].astype(int)
B = data[:,:,2].astype(int)

# ─────────────────────────────────────────────────────────────
# PASO 1: Remover fondo checkerboard
# Checkerboard: píxeles acromáticos (R≈G≈B) y claros
# ─────────────────────────────────────────────────────────────
gray_diff = np.abs(R - G) + np.abs(G - B) + np.abs(R - B)
is_checkerboard = (gray_diff < 30) & (R > 170)

# Flood fill desde bordes para capturar solo el fondo exterior
labeled, _ = label(is_checkerboard)

border_labels = set()
border_labels.update(int(x) for x in labeled[0, :])
border_labels.update(int(x) for x in labeled[h-1, :])
border_labels.update(int(x) for x in labeled[:, 0])
border_labels.update(int(x) for x in labeled[:, w-1])
border_labels.discard(0)

bg_mask = np.zeros((h, w), dtype=bool)
for lbl in border_labels:
    bg_mask |= (labeled == lbl)

# Agujeros internos de letras (checkerboard dentro del logo)
internal_holes = is_checkerboard & ~bg_mask
bg_mask |= internal_holes

# Hacer transparente el fondo
data[bg_mask, 3] = 0

# Recalcular R,G,B del array actualizado
R = data[:,:,0].astype(int)
G = data[:,:,1].astype(int)
B = data[:,:,2].astype(int)
A = data[:,:,3]

# ─────────────────────────────────────────────────────────────
# PASO 2: Identificar elementos ROJOS y convertirlos a BLANCO
# Rojo de letras/puntos/olas: R alto (~180-220), G bajo (<110), B bajo (<110)
# Arco salmón (conservar): R alto pero G>110 y B>80 (más anaranjado/pastel)
# ─────────────────────────────────────────────────────────────
is_red_element = (
    (A > 0) &          # visible (no transparente)
    (R > 140) &        # rojo alto
    (G < 115) &        # verde bajo
    (B < 115) &        # azul bajo
    (R > G + 60) &     # rojo muy dominante sobre verde
    (R > B + 60)       # rojo muy dominante sobre azul
)

# Convertir rojo -> blanco (255, 255, 255)
data[is_red_element, 0] = 255
data[is_red_element, 1] = 255
data[is_red_element, 2] = 255
data[is_red_element, 3] = 255

# ─────────────────────────────────────────────────────────────
# PASO 3: Guardar
# ─────────────────────────────────────────────────────────────
out_img = Image.fromarray(data, 'RGBA')
out_img.save(OUTPUT, 'PNG')

total = w * h
transparent = (data[:,:,3] == 0).sum()
red_conv = is_red_element.sum()
print(f"Guardado: {OUTPUT}")
print(f"Resolucion: {w}x{h}")
print(f"Pixeles de fondo eliminados: {bg_mask.sum():,}")
print(f"Pixeles rojos -> blancos: {red_conv:,}")
print(f"Pixeles transparentes final: {transparent:,} ({transparent/total*100:.1f}%)")
