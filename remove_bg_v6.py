"""
remove_bg_v6.py - Remoción correcta de fondo verde neón
Usa scipy flood fill para marcar zonas conectadas desde los bordes.
"""
from PIL import Image, ImageFilter, ImageDraw
import numpy as np

INPUT  = r"C:\Users\VN\.gemini\antigravity\brain\4d669f62-b1c5-4719-9623-3351963a1331\media__1772077595089.jpg"
OUTPUT = r"C:\Users\VN\WEB-AQUA\logo_transparent_v6.png"

img = Image.open(INPUT).convert("RGBA")
w, h = img.size
data = np.array(img, dtype=np.uint8)
R = data[:,:,0].astype(int)
G = data[:,:,1].astype(int)
B = data[:,:,2].astype(int)

# --- 1. Identificar píxeles verde neón ---
# Verde neón:  g alto, b muy bajo, g > r + cierto margen
neon = (
    (G > 200) &          # Verde muy alto
    (B < 90) &           # Azul muy bajo
    (G > R + 20)         # Verde domina sobre rojo
)

# Proteger elementos del logo:
# Alga teal: B > 80 (no neón ya excluido por regla B<90 pero puede estar en borde)
# En realidad la alga tiene B~100-160, así que B < 90 ya la excluye.
# Arco salmón: R > G (excluido por G > R+20)
# Azul/púrpura olas: B > 100 (excluido por B < 90)
# Blanco: G y R ambos muy altos
white = (R > 220) & (G > 220) & (B > 180)
neon = neon & ~white

# --- 2. Expandir máscara 3px para capturar halos de borde ---
neon_img = Image.fromarray(neon.astype(np.uint8) * 255, 'L')
neon_expanded = neon_img.filter(ImageFilter.MaxFilter(7))  # 3px cada lado
neon_exp_arr = np.array(neon_expanded) > 127

# No expandir sobre zonas claramente del logo
protected_logo = (
    ((R > B + 30) & (R > G) & (R > 150)) |   # arco salmón: R domina
    ((B > 95) & (G < B + 80)) |               # alga teal/azul
    ((B > 120)) |                              # azul/púrpura olas
    (white)                                    # blanco
)
# Los contornos negros tampoco
dark = (R < 80) & (G < 80) & (B < 80)

to_remove_candidates = neon_exp_arr & ~protected_logo & ~dark
# Siempre remover los neón originales si no son protegidos
to_remove_candidates |= (neon & ~protected_logo & ~dark)

# --- 3. Flood fill desde bordes (eliminar fondo exterior) ---
# Crear imagen de trabajo: 255=candidato a remover, 0=mantener
work = to_remove_candidates.astype(np.uint8) * 255

# Usar scipy para flood fill confiable
from scipy.ndimage import label

# Invertir para hacer flood fill: encontrar componentes conectadas de "candidatos"
labeled, num_features = label(to_remove_candidates)

# Las componentes que tocan el borde son fondo exterior
border_labels = set()
border_labels.update(labeled[0, :])      # top
border_labels.update(labeled[h-1, :])   # bottom  
border_labels.update(labeled[:, 0])     # left
border_labels.update(labeled[:, w-1])   # right
border_labels.discard(0)  # 0 = no es candidato, ignorar

# Crear máscara de lo que se elimina
remove_mask = np.zeros((h, w), dtype=bool)
for lbl in border_labels:
    remove_mask |= (labeled == lbl)

# --- 4. Agujeros internos de letras (zonas verdes no conectadas al borde) ---
# Estas son zonas candidatas que NO son fondo exterior
internal_green = to_remove_candidates & ~remove_mask

# También eliminar los agujeros internos
remove_mask |= internal_green

# --- 5. Aplicar transparencia ---
result = data.copy()
result[remove_mask, 3] = 0

out_img = Image.fromarray(result, 'RGBA')
out_img.save(OUTPUT, 'PNG')

total = w * h
removed = remove_mask.sum()
print(f"✓ Guardado: {OUTPUT}")
print(f"  Resolución: {w}x{h}")
print(f"  Píxeles eliminados: {removed:,} / {total:,} ({removed/total*100:.1f}%)")
print(f"  Píxeles conservados: {total-removed:,} ({(1-removed/total)*100:.1f}%)")
