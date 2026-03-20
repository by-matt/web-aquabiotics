from PIL import Image, ImageDraw, ImageFilter

def ratio_fix_v3(input_path, output_path):
    img = Image.open(input_path).convert("RGBA")
    width, height = img.size
    pix = img.load()
    
    # 1. Base neon mask
    mask = Image.new("L", (width, height), 0)
    for y in range(height):
        for x in range(width):
            r, g, b, a = pix[x, y]
            ratio = g / (b + 1)
            is_neon = (ratio > 1.1) and (g > 60)
            
            # Protection
            if b > 90: is_neon = False
            if r > 210 and b > 180: is_neon = False
            if g < 45: is_neon = False
            
            if is_neon:
                mask.putpixel((x, y), 255)
    
    # 2. Grow the mask by 1 pixel to catch anti-aliasing halos
    # This is slightly risky but effective for JPG artifacts.
    grown_mask = mask.filter(ImageFilter.MaxFilter(3))
    
    # 3. Flood fill outer background on the grown mask
    final_mask = Image.new("L", (width, height), 0)
    # Mark grown pixels as potentially transparent
    for y in range(height):
        for x in range(width):
            if grown_mask.getpixel((x, y)) == 255:
                # Protect the teal area from "growth" leakage
                # Only grow mask if not in teal area (approx center)
                # Actually, simpler: protect if current pixel b > 90
                r, g, b, a = pix[x, y]
                if b < 90:
                    final_mask.putpixel((x, y), 255)
                else:
                    # If it's teal and was in the original mask (background), 
                    # we keep it, but we don't GROW it.
                    final_mask.putpixel((x, y), mask.getpixel((x, y)))
    
    # Flood fill outer edge
    seeds = []
    for x in range(width): seeds.extend([(x, 0), (x, height-1)])
    for y in range(height): seeds.extend([(0, y), (width-1, y)])
    for seed in seeds:
        if final_mask.getpixel(seed) == 255:
            ImageDraw.floodfill(final_mask, seed, 128)
            
    # Handle letter holes
    for y in range(height):
        for x in range(width):
            if final_mask.getpixel((x, y)) == 255:
                if (y < height * 0.40) or (y > height * 0.82):
                    ImageDraw.floodfill(final_mask, (x, y), 128)
                    
    # 4. Final composition
    new_img = Image.new("RGBA", (width, height), (0, 0, 0, 0))
    new_pix = new_img.load()
    
    for y in range(height):
        for x in range(width):
            m = final_mask.getpixel((x, y))
            if m == 128:
                continue
            
            r, g, b, a = pix[x, y]
            new_pix[x, y] = (r, g, b, 255)
            
    new_img.save(output_path, "PNG")
    print(f"Ratio fix v3 (grown) saved to {output_path}")

if __name__ == "__main__":
    input_img = "C:/Users/VN/.gemini/antigravity/brain/e7070946-8d70-4069-95fa-594e165af530/media__1772073582788.jpg"
    output_img = "c:/Users/VN/WEB-AQUA/logo_ratio_v3.png"
    ratio_fix_v3(input_img, output_img)
