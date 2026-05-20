from PIL import Image, ImageDraw

def ratio_fix_v2(input_path, output_path):
    img = Image.open(input_path).convert("RGBA")
    width, height = img.size
    pix = img.load()
    
    mask = Image.new("L", (width, height), 0)
    for y in range(height):
        for x in range(width):
            r, g, b, a = pix[x, y]
            
            # G/B ratio is 9+ for background, ~2 for teal
            ratio = g / (b + 1)
            
            # Catch background and halo
            is_neon = (ratio > 1.5) and (g > 70)
            
            # PROTECTION LAYER
            # 1. Protect anything with significant Blue (Teal/Purple/Waves)
            if b > 90:
                is_neon = False
            
            # 2. Protect white elements (even if they have a slight green cast from JPG)
            # True white is 1:1 ratio. 
            if r > 220 and g > 220 and b > 180:
                is_neon = False
                
            # 3. Protect dark outlines
            if g < 50:
                is_neon = False
                
            if is_neon:
                mask.putpixel((x, y), 255)
    
    # 2. Flood fill outer background
    seeds = []
    for x in range(width): seeds.extend([(x, 0), (x, height-1)])
    for y in range(height): seeds.extend([(0, y), (width-1, y)])
    for seed in seeds:
        if mask.getpixel(seed) == 255:
            ImageDraw.floodfill(mask, seed, 128)
            
    # 3. Special: there are some green dots/glitches in this JPG.
    # If anything is VERY green, remove it even if not connected to edge (like letter holes)
    for y in range(height):
        for x in range(width):
            if mask.getpixel((x, y)) == 255:
                # If it's a letter area or just very obviously neon
                r, g, b, a = pix[x, y]
                ratio = g / (b + 1)
                if (y < height * 0.40) or (y > height * 0.82) or (ratio > 5):
                    ImageDraw.floodfill(mask, (x, y), 128)
                    
    # 4. Final composition
    new_img = Image.new("RGBA", (width, height), (0, 0, 0, 0))
    new_pix = new_img.load()
    
    for y in range(height):
        for x in range(width):
            m = mask.getpixel((x, y))
            if m == 128:
                continue
            
            r, g, b, a = pix[x, y]
            new_pix[x, y] = (r, g, b, 255)
            
    new_img.save(output_path, "PNG")
    print(f"Ratio fix v2 saved to {output_path}")

if __name__ == "__main__":
    input_img = "C:/Users/VN/.gemini/antigravity/brain/e7070946-8d70-4069-95fa-594e165af530/media__1772073582788.jpg"
    output_img = "c:/Users/VN/WEB-AQUA/logo_ratio_v2.png"
    ratio_fix_v2(input_img, output_img)
