from PIL import Image, ImageDraw

def ultimate_fix_logo(input_path, output_path):
    img = Image.open(input_path).convert("RGBA")
    width, height = img.size
    pix = img.load()
    
    # Target Background Green: (171, 253, 28)
    # Alga Color (Light): (190, 246, 111)
    # Alga Color (Dark Outlines): (3, 38, 0)
    
    mask = Image.new("L", (width, height), 0)
    for y in range(height):
        for x in range(width):
            r, g, b, a = pix[x, y]
            
            # Identify neon-green background or halo
            # Neon green has extremely high Green and low Blue
            is_neon = g > 150 and b < 85
            
            # Further refinement: if the green is extremely dominant
            if g > 1.5 * r and g > 1.5 * b and g > 100:
                is_neon = True
                
            # Protect the alga: alga has significant blue (B > 95)
            if b > 95:
                is_neon = False
            
            # Protect the dark outlines: they are low-intensity
            # Background G is > 200 (unless it's a very dark halo point?)
            # Let's check G < 100 to protect all dark details
            if g < 80:
                is_neon = False
                
            if is_neon:
                mask.putpixel((x, y), 255)
    
    # 2. Flood fill from edges to get the outer background
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
                # Top/Bottom letter regions
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
            # Output clean colors, ensure full opacity for the logo content
            new_pix[x, y] = (r, g, b, 255)
            
    new_img.save(output_path, "PNG")
    print(f"Ultimate fixed logo saved to {output_path}")

if __name__ == "__main__":
    input_img = "C:/Users/VN/.gemini/antigravity/brain/e7070946-8d70-4069-95fa-594e165af530/media__1772073582788.jpg"
    output_img = "c:/Users/VN/WEB-AQUA/logo_ultimate_fixed.png"
    ultimate_fix_logo(input_img, output_img)
