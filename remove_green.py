from PIL import Image, ImageDraw

def remove_green_background(input_path, output_path):
    img = Image.open(input_path).convert("RGBA")
    width, height = img.size
    pix = img.load()
    
    # The green is likely something like (173, 255, 47) or similar bright green.
    # Let's find the exact background color in the corners.
    bg_color = pix[0, 0]
    print(f"Detected background color: {bg_color}")
    
    mask = Image.new("L", (width, height), 0)
    for y in range(height):
        for x in range(width):
            r, g, b, a = pix[x, y]
            # Match the bright green with tolerance
            if abs(r - bg_color[0]) < 30 and abs(g - bg_color[1]) < 30 and abs(b - bg_color[2]) < 30:
                mask.putpixel((x, y), 255)
    
    # Flood fill outer background from edges
    seeds = []
    for x in range(width): seeds.extend([(x, 0), (x, height-1)])
    for y in range(height): seeds.extend([(0, y), (width-1, y)])
           
    for seed in seeds:
        if mask.getpixel(seed) == 255:
            ImageDraw.floodfill(mask, seed, 128)
            
    # Remove internal green holes in letters A, Q, B, O, R
    # In this logo, the letters are in specific regions.
    for y in range(height):
        for x in range(width):
            if mask.getpixel((x, y)) == 255:
                # Top letters approx Y < 35%
                # Bottom letters approx Y > 83%
                if (y < height * 0.35) or (y > height * 0.83):
                    ImageDraw.floodfill(mask, (x, y), 128)
                    
    # Create final image
    new_img = Image.new("RGBA", (width, height), (0, 0, 0, 0))
    new_pix = new_img.load()
    
    for y in range(height):
        for x in range(width):
            r, g, b, a = pix[x, y]
            m = mask.getpixel((x, y))
            
            if m == 128:
                # Transparent
                continue
            else:
                # Keep original pixel, but make content opaque
                new_pix[x, y] = (r, g, b, 255)
                
    new_img.save(output_path, "PNG")
    print(f"Green-background-free logo saved to {output_path}")

if __name__ == "__main__":
    input_img = "C:/Users/VN/.gemini/antigravity/brain/e7070946-8d70-4069-95fa-594e165af530/media__1772073582788.jpg"
    output_img = "c:/Users/VN/WEB-AQUA/logo_final_green_free.png"
    remove_green_background(input_img, output_img)
