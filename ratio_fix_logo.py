from PIL import Image, ImageDraw

def ratio_fix_logo(input_path, output_path):
    img = Image.open(input_path).convert("RGBA")
    width, height = img.size
    pix = img.load()
    
    mask = Image.new("L", (width, height), 0)
    for y in range(height):
        for x in range(width):
            r, g, b, a = pix[x, y]
            
            # Use G/B ratio. 
            # Neon green background has B=28, G=253 -> ratio 9
            # Teal alga has B=111, G=246 -> ratio 2.2
            # We add 1 to b to avoid division by zero
            ratio = g / (b + 1)
            
            # Aggressive background/halo detection
            is_neon = (ratio > 3.0) and (g > 80)
            
            # Protect dark outlines (where G is low)
            if g < 60:
                is_neon = False
            
            # Protect anything with significant Blue (Teal/Purple/Blue)
            if b > 90:
                is_neon = False
                
            if is_neon:
                mask.putpixel((x, y), 255)
    
    # 2. Flood fill from edges
    seeds = []
    for x in range(width): seeds.extend([(x, 0), (x, height-1)])
    for y in range(height): seeds.extend([(0, y), (width-1, y)])
    for seed in seeds:
        if mask.getpixel(seed) == 255:
            ImageDraw.floodfill(mask, seed, 128)
            
    # 3. Handle letter holes (A, Q, B, O, R)
    for y in range(height):
        for x in range(width):
            if mask.getpixel((x, y)) == 255:
                if (y < height * 0.40) or (y > height * 0.82):
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
    print(f"Ratio fixed logo saved to {output_path}")

if __name__ == "__main__":
    input_img = "C:/Users/VN/.gemini/antigravity/brain/e7070946-8d70-4069-95fa-594e165af530/media__1772073582788.jpg"
    output_img = "c:/Users/VN/WEB-AQUA/logo_ratio_fixed.png"
    ratio_fix_logo(input_img, output_img)
