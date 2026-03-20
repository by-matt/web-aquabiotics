from PIL import Image, ImageDraw

def fix_logo_alga(input_path, output_path):
    img = Image.open(input_path).convert("RGBA")
    width, height = img.size
    pix = img.load()
    
    # 1. Background color is (171, 253, 28)
    bg_green = (171, 253, 28)
    
    mask = Image.new("L", (width, height), 0)
    for y in range(height):
        for x in range(width):
            r, g, b, a = pix[x, y]
            
            # Use color distance to the specific neon green
            dist = ((r - bg_green[0])**2 + (g - bg_green[1])**2 + (b - bg_green[2])**2)**0.5
            
            # If it's VERY close to the neon green
            if dist < 45: # Tight threshold
               # Further check: background has very low blue (< 50)
               # The alga has blue > 100
               if b < 70:
                   mask.putpixel((x, y), 255)
    
    # 2. Flood fill outer background from edges (mark as 128)
    seeds = []
    for x in range(width): seeds.extend([(x, 0), (x, height-1)])
    for y in range(height): seeds.extend([(0, y), (width-1, y)])
           
    for seed in seeds:
        if mask.getpixel(seed) == 255:
            ImageDraw.floodfill(mask, seed, 128)
            
    # 3. Handle letter holes (A, Q, B, O, R)
    # Only if they are neon green
    for y in range(height):
        for x in range(width):
            if mask.getpixel((x, y)) == 255:
                # Top letters approx Y < 35%
                # Bottom letters approx Y > 83%
                if (y < height * 0.35) or (y > height * 0.83):
                    ImageDraw.floodfill(mask, (x, y), 128)
                    
    # 4. Final composition
    new_img = Image.new("RGBA", (width, height), (0, 0, 0, 0))
    new_pix = new_img.load()
    
    for y in range(height):
        for x in range(width):
            m = mask.getpixel((x, y))
            if m == 128:
                continue # Transparent
            
            r, g, b, a = pix[x, y]
            # Keep original colors EXACTLY
            new_pix[x, y] = (r, g, b, 255)
            
    new_img.save(output_path, "PNG")
    print(f"Fixed logo saved to {output_path}")

if __name__ == "__main__":
    input_img = "C:/Users/VN/.gemini/antigravity/brain/e7070946-8d70-4069-95fa-594e165af530/media__1772073582788.jpg"
    output_img = "c:/Users/VN/WEB-AQUA/logo_fixed_alga.png"
    fix_logo_alga(input_img, output_img)
