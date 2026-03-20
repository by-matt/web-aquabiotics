from PIL import Image, ImageDraw, ImageFilter

def perfect_logo_v4(input_path, output_path):
    img = Image.open(input_path).convert("RGBA")
    width, height = img.size
    pix = img.load()
    
    # 1. Base Mask: Identify all background-like pixels
    # Neon Green Ratio: ~9
    # Teal Ratio: ~2.2
    # Target: everything with ratio > 1.2
    
    mask = Image.new("L", (width, height), 0)
    for y in range(height):
        for x in range(width):
            r, g, b, a = pix[x, y]
            ratio = g / (max(r, b) + 1) # Use max(r,b) for better contrast to red-ish arc too
            
            # Neon green is extremely green-dominant
            # r~170, g~250, b~25 -> ratio g/r=1.5, g/b=10
            is_neon = (g > r + 15 and g > b + 15) and (g > 70)
            
            # PROTECT WAVE (Teal/Blue/Purple)
            # Teal: (190, 246, 111) -> g (246) is high, but r(190) and b(111) are too.
            # Neon Green: (171, 253, 28) -> r(171), b(28)
            # The alga has g/b ~ 2.2, background has g/b ~ 9.
            if b > 95: is_neon = False
            
            # PROTECT RED ARC: (230, 140, 115) -> r is high
            if r > g: is_neon = False
            
            # PROTECT WHITE: r,g,b all high
            if r > 210 and g > 210 and b > 180: is_neon = False
            
            # PROTECT OUTLINES
            if g < 50: is_neon = False
            
            if is_neon:
                mask.putpixel((x, y), 255)
    
    # 2. Refine mask connection
    # Grow mask by 1px to catch halos
    grown_mask = mask.filter(ImageFilter.MaxFilter(3))
    
    # 3. Separate outer background from internal holes
    # Mark OUTER background as 128
    final_mask = Image.new("L", (width, height), 0)
    for y in range(height):
        for x in range(width):
            # Grow only if not protecting
            r, g, b, a = pix[x, y]
            if b < 95 and r < g + 10 and not (r > 210 and g > 210 and b > 180):
                final_mask.putpixel((x, y), grown_mask.getpixel((x, y)))
            else:
                final_mask.putpixel((x, y), mask.getpixel((x, y)))

    # Flood fill from ALL edges
    seeds = []
    for x in range(width): seeds.extend([(x, 0), (x, height-1)])
    for y in range(height): seeds.extend([(0, y), (width-1, y)])
           
    for seed in seeds:
        if final_mask.getpixel(seed) == 255:
            ImageDraw.floodfill(final_mask, seed, 128)
            
    # 4. Handle internal holes: 
    # Any remaining 255 in the mask must be a hole in a letter or design
    # UNLESS it's the protected alga (but we didn't put alga in the mask)
    for y in range(height):
        for x in range(width):
            if final_mask.getpixel((x, y)) == 255:
                 # Check if it's too green to keep (The neon green artifacts)
                 r, g, b, a = pix[x, y]
                 # If it's a hole in AQUABIOTICS or SUR
                 # Or if it's just very neon-green
                 if g > 120 and g > b + 40:
                     ImageDraw.floodfill(final_mask, (x, y), 128)

    # 5. Final Composition
    new_img = Image.new("RGBA", (width, height), (0, 0, 0, 0))
    new_pix = new_img.load()
    
    for y in range(height):
        for x in range(width):
            m = final_mask.getpixel((x, y))
            if m == 128:
                continue
            
            r, g, b, a = pix[x, y]
            new_pix[x, y] = (r, g, b, 255) # Full opacity
            
    new_img.save(output_path, "PNG")
    print(f"Perfect logo v4 saved to {output_path}")

if __name__ == "__main__":
    input_img = "C:/Users/VN/.gemini/antigravity/brain/e7070946-8d70-4069-95fa-594e165af530/media__1772073582788.jpg"
    output_img = "c:/Users/VN/WEB-AQUA/logo_perfect_v4.png"
    perfect_logo_v4(input_img, output_img)
