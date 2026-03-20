"""
logo_fix_v2.py
El logo tiene letras/puntos/olas superiores en color salmón IGUAL que el arco.
Estrategia: usar componentes conectadas para identificar los elementos individualmente.
El ARCO es una sola componente grande y continua en la zona central superior.
Las LETRAS son múltiples componentes pequeñas dispersas en el perímetro.
Los PUNTOS son componentes circulares muy pequeñas.
Las OLAS SUPERIORES son 3 bandas horizontales en la zona inferior-central.

Paso 1: Quitar checkerboard
Paso 2: Segmentar por componentes conectadas el color salmón
Paso 3: El arco = componente más grande en zona central
         Todo lo demás salmón = blanco
"""
from PIL import Image
import numpy as np
from scipy.ndimage import label

INPUT  = r"C:\Users\VN\.gemini\antigravity\brain\4d669f62-b1c5-4719-9623-3351963a1331\media__1772080504325.jpg"
OUTPUT = r"C:\Users\VN\WEB-AQUA\logo_definitivo_v3.png"

img  = Image.open(INPUT).convert("RGBA")
w, h = img.size
data = np.array(img, dtype=np.uint8)
R = data[:,:,0].astype(int)
G = data[:,:,1].astype(int)
B = data[:,:,2].astype(int)

# ─── PASO 1: Quitar fondo checkerboard ─────────────────────
gray_diff = np.abs(R - G) + np.abs(G - B) + np.abs(R - B)
is_checker = (gray_diff < 30) & (R > 165)

labeled_bg, _ = label(is_checker)
border_labels = set()
border_labels.update(int(x) for x in labeled_bg[0, :])
border_labels.update(int(x) for x in labeled_bg[h-1, :])
border_labels.update(int(x) for x in labeled_bg[:, 0])
border_labels.update(int(x) for x in labeled_bg[:, w-1])
border_labels.discard(0)
bg_mask = np.zeros((h, w), dtype=bool)
for lbl in border_labels:
    bg_mask |= (labeled_bg == lbl)
internal_holes = is_checker & ~bg_mask
bg_mask |= internal_holes

data[bg_mask, 3] = 0

# ─── PASO 2: Detectar todos los píxeles salmón/terracotta ──
# Salmón: R domina, G y B intermedios pero NO acromáticos
R2 = data[:,:,0].astype(int)
G2 = data[:,:,1].astype(int)
B2 = data[:,:,2].astype(int)
A2 = data[:,:,3]

is_salmon = (
    (A2 > 0) &
    (R2 > 150) &
    (R2 > G2 + 40) &
    (R2 > B2 + 50) &
    (G2 > 60)   # no negro
)

# ─── PASO 3: Segmentar componentes del salmón ──────────────
labeled_s, num = label(is_salmon)
print(f"Componentes salmón encontradas: {num}")

# Calcular tamaño y centroide de cada componente
comp_info = []
for lbl in range(1, num + 1):
    comp = labeled_s == lbl
    size = comp.sum()
    if size < 10:  # ignorar ruido
        continue
    ys, xs = np.where(comp)
    cy, cx = ys.mean(), xs.mean()
    comp_info.append((lbl, size, cx, cy))

# Ordenar por tamaño descending
comp_info.sort(key=lambda x: -x[1])
print("\nTop 10 componentes por tamaño:")
for lbl, size, cx, cy in comp_info[:10]:
    print(f"  Label {lbl}: size={size:6d}  centro=({cx:.0f}, {cy:.0f})")

# El ARCO es la componente más grande, centrada horizontalmente
# y ubicada en la mitad superior del logo
cx_center = w / 2
cy_upper  = h / 2

# Identificar el arco: componente grande y centrada
arc_labels = set()
for lbl, size, cx, cy in comp_info:
    # Arco: grande (>5000px), centrado (250-750 en x), mitad superior-media (200-600 en y)
    if size > 5000 and abs(cx - cx_center) < 200 and cy < h * 0.65:
        arc_labels.add(lbl)
        print(f"\n  -> ARCO identificado: Label {lbl}, size={size}, centro=({cx:.0f},{cy:.0f})")
        break  # solo uno

# Construir máscara del arco
arc_mask = np.zeros((h, w), dtype=bool)
for lbl in arc_labels:
    arc_mask |= (labeled_s == lbl)

# Todo salmón que NO es el arco -> BLANCO
to_whiten = is_salmon & ~arc_mask
data[to_whiten, 0] = 255
data[to_whiten, 1] = 255
data[to_whiten, 2] = 255
data[to_whiten, 3] = 255

print(f"\nPíxeles convertidos a blanco: {to_whiten.sum():,}")

# ─── PASO 4: Guardar ───────────────────────────────────────
out_img = Image.fromarray(data, 'RGBA')
out_img.save(OUTPUT, 'PNG')
print(f"Guardado: {OUTPUT}")
