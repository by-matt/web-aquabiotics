from PIL import Image, ImageDraw

def process_logo_green_final(input_path, output_path):
    img = Image.open(input_path).convert("RGBA")
    width, height = img.size
    pix = img.load()
    
    # 1. Create a very aggressive green mask
    mask = Image.new("L", (width, height), 0)
    for y in range(height):
        for x in range(width):
            r, g, b, a = pix[x, y]
            # Identify green: green is high relative to others
            # Or it's the specific neon green (171, 253, 28)
            is_green = (g > 120 and g > r * 1.1 and g > b * 1.1) or (g > 200 and r < 200 and b < 100)
            if is_green:
                mask.putpixel((x, y), 255)
    
    # 2. Flood fill outer background
    seeds = []
    for x in range(width): seeds.extend([(x, 0), (x, height-1)])
    for y in range(height): seeds.extend([(0, y), (width-1, y)])
    for seed in seeds:
        if mask.getpixel(seed) == 255:
            ImageDraw.floodfill(mask, seed, 128)
            
    # 3. Handle letter holes (A, Q, B, O, R)
    # These are regions where we want to remove any remaining green/white-ish blobs
    for y in range(height):
        for x in range(width):
            if mask.getpixel((x, y)) == 255:
                # Top letters approx Y < 35%
                # Bottom letters approx Y > 83%
                if (y < height * 0.35) or (y > height * 0.82):
                    ImageDraw.floodfill(mask, (x, y), 128)
                    
    # 4. Final composition & Halo Cleanup
    new_img = Image.new("RGBA", (width, height), (0, 0, 0, 0))
    new_pix = new_img.load()
    
    for y in range(height):
        for x in range(width):
            m = mask.getpixel((x, y))
            if m == 128:
                continue
            
            r, g, b, a = pix[x, y]
            
            # Additional halo cleanup: desaturate any remaining slight green tint on edges
            avg = (r + g + b) / 3
            if g > r + 10 and g > b + 10:
                # It's a halo. If it's desaturated-ish, just make it gray/white
                if abs(r - b) < 20:
                     # Force it to be desaturated (e.g. for the black outlines)
                     v = min(r, b)
                     new_pix[x, y] = (v, v, v, 255)
                else:
                     # Keep original but maybe it's the Teal wave?
                     # Teal wave is roughly (66, 178, 163) -> g is high but r,b are also significant
                     new_pix[x, y] = (r, g, b, 255)
            else:
                new_pix[x, y] = (r, g, b, 255)
                
    new_img.save(output_path, "PNG")
    print(f"Final perfect logo saved to {output_path}")

if __name__ == "__main__":
    input_img = "C:/Users/VN/.gemini/antigravity/brain/e7070946-8d70-4069-95fa-594e165af530/media__1772073582788.jpg"
    output_img = "c:/Users/VN/WEB-AQUA/logo_perfect_green_free.png"
    process_logo_green_final(input_img, output_img)
