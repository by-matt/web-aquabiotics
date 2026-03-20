"""
remove_bg_v5.py - Eliminación de fondo verde neón con flood fill multi-semilla
Estrategia:
  1. Detectar píxeles verde neón con umbrales calibrados para este logo específico
  2. Flood fill desde todos los bordes + puntos de esquina para capturar el fondo externo
  3. Flood fill desde interior de agujeros de letras (zona predecible)
  4. Limpiar halos verdes en los bordes de los elementos usando erosión del borde
"""
from PIL import Image, ImageFilter, ImageDraw
import numpy as np

def is_neon_green(r, g, b):
    """
    Neon green del logo: r~168-175, g~248-255, b~20-40
    Distinguir de teal de la alga: r~60-120, g~150-200, b~100-160
    """
    # Verde dominante
    if g < 180:
        return False
    # El verde neón tiene azul MUY bajo
    if b > 80:
        return False
    # El verde del texto blanco contorno no es neón
    if r > 220 and g > 220 and b > 180:
        return False
    # Rojo no puede ser mayor que verde (descarta el arco rojo/salmón)
    if r >= g:
        return False
    # Ratio verde/azul muy alto en neón
    if g / (b + 1) < 3.5:
        return False
    return True

def remove_green_bg(input_path, output_path):
    img = Image.open(input_path).convert("RGBA")
    width, height = img.size
    data = np.array(img, dtype=np.uint8)
    
    R, G, B, A = data[:,:,0], data[:,:,1], data[:,:,2], data[:,:,3]
    
    # --- PASO 1: Máscara inicial de píxeles verdes neón ---
    green_mask = np.zeros((height, width), dtype=bool)
    for y in range(height):
        for x in range(width):
            if is_neon_green(int(R[y,x]), int(G[y,x]), int(B[y,x])):
                green_mask[y, x] = True

    # --- PASO 2: Expandir la máscara 2px para capturar halos ---
    # Convertir a imagen PIL para usar MaxFilter
    mask_img = Image.fromarray(green_mask.astype(np.uint8) * 255, 'L')
    mask_expanded = mask_img.filter(ImageFilter.MaxFilter(5))  # 5px = 2px cada lado
    green_mask_expanded = np.array(mask_expanded) > 127

    # Pero NO expandir sobre píxeles protegidos (arco salmón, alga teal, azul/púrpura)
    protected = np.zeros((height, width), dtype=bool)
    for y in range(height):
        for x in range(width):
            r, g, b = int(R[y,x]), int(G[y,x]), int(B[y,x])
            # Arco salmón: r > g and r > b
            if r > g and r > b and r > 150:
                protected[y,x] = True
            # Alga teal: azul > 80 y no neón
            elif b > 80 and not is_neon_green(r, g, b):
                protected[y,x] = True
            # Azul/púrpura de las olas: b > 100
            elif b > 100:
                protected[y,x] = True
            # Blanco/gris (olas blancas, texto blanco): todos altos
            elif r > 190 and g > 190 and b > 170:
                protected[y,x] = True
            # Negro/oscuro (contornos)
            elif r < 60 and g < 60 and b < 60:
                protected[y,x] = True

    # Aplicar expansión solo donde no hay protección
    final_remove = green_mask_expanded & ~protected
    # Siempre eliminar los pixeles originalmente verdes aunque estén "protegidos" por error
    final_remove = final_remove | (green_mask & ~protected)
    
    # --- PASO 3: Flood fill desde BORDES para identificar bg externo ---
    # Trabajar con imagen PIL para flood fill
    work_mask = Image.fromarray(final_remove.astype(np.uint8) * 255, 'L')
    
    # Semillas en todos los bordes
    seeds = set()
    for x in range(width):
        seeds.add((x, 0))
        seeds.add((x, height - 1))
    for y in range(height):
        seeds.add((0, y))
        seeds.add((width - 1, y))
    
    # Flood fill desde bordes (donde final_remove es True)
    bg_mask = Image.new('L', (width, height), 0)
    for seed in seeds:
        if work_mask.getpixel(seed) == 255:
            ImageDraw.floodfill(bg_mask, seed, 255, thresh=0)
    
    bg_array = np.array(bg_mask) > 127
    
    # --- PASO 4: Detectar agujeros internos de letras ---
    # Los agujeros internos son zonas verdes NO alcanzadas por flood fill desde bordes
    # son exactamente: final_remove=True AND bg_array=False
    letter_holes = final_remove & ~bg_array
    
    # Flood fill los agujeros de letras también (son zonas aisladas verdes)
    hole_mask = Image.new('L', (width, height), 0)
    lh_img = Image.fromarray(letter_holes.astype(np.uint8) * 255, 'L')
    # Find seeds in letter holes
    for y in range(height):
        for x in range(width):
            if letter_holes[y, x]:
                ImageDraw.floodfill(hole_mask, (x, y), 255, thresh=0)
                break
        else:
            continue
        break
    
    # Marcar todos los letter_holes como transparentes
    transparent_mask = bg_array | letter_holes
    
    # --- PASO 5: Componer resultado final ---
    result = img.copy()
    result_data = np.array(result)
    result_data[transparent_mask, 3] = 0  # Alpha = 0 donde remover
    
    result_img = Image.fromarray(result_data, 'RGBA')
    result_img.save(output_path, 'PNG')
    
    removed = transparent_mask.sum()
    total = width * height
    print(f"Guardado: {output_path}")
    print(f"Píxeles eliminados: {removed:,} / {total:,} ({removed/total*100:.1f}%)")
    return result_img

if __name__ == "__main__":
    # Usar la imagen del chat actual (guardada automáticamente por el sistema)
    # Intentar varias fuentes posibles
    import os, glob
    
    # Primero buscar la imagen más reciente en el directorio del brain actual
    brain_dir = r"C:\Users\VN\.gemini\antigravity\brain\4d669f62-b1c5-4719-9623-3351963a1331"
    media_files = glob.glob(os.path.join(brain_dir, "media*.*"))
    
    if media_files:
        # Usar el más reciente
        input_img = sorted(media_files)[-1]
        print(f"Usando imagen: {input_img}")
    else:
        # Fallback al de la conversación anterior
        input_img = r"C:\Users\VN\.gemini\antigravity\brain\e7070946-8d70-4069-95fa-594e165af530\media__1772073582788.jpg"
        print(f"Usando imagen fallback: {input_img}")
    
    output_img = r"C:\Users\VN\WEB-AQUA\logo_transparent_v5.png"
    remove_green_bg(input_img, output_img)
