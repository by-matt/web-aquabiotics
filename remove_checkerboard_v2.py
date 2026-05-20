from PIL import Image, ImageDraw

def remove_checkerboard_v2(input_path, output_path):
    img = Image.open(input_path).convert("RGBA")
    width, height = img.size
    pix = img.load()
    
    # We detected background-like colors in the corners/edges
    # Light: ~255, ~254
    # Dark: ~228, ~229
    
    mask = Image.new("L", (width, height), 0)
    for y in range(height):
        for x in range(width):
            r, g, b, a = pix[x, y]
            # If it's very light (white-ish) or is roughly the checkerboard gray (~228)
            # AND it's fairly desaturated (r,g,b are close)
            avg = (r + g + b) / 3
            is_desaturated = abs(r-avg) < 10 and abs(g-avg) < 10 and abs(b-avg) < 10
            
            # Checkerboard white: > 240
            # Checkerboard gray: ~220-235
            if is_desaturated and (avg > 240 or (avg > 215 and avg < 235)):
                mask.putpixel((x, y), 255)
    
    # Flood fill from all edges
    # Standard transparent indicator: flood fill anything connected to the boundary.
    seeds = []
    for x in range(width):
        seeds.append((x, 0))
        seeds.append((x, height-1))
    for y in range(height):
        seeds.append((0, y))
        seeds.append((width-1, y))
        
    for seed in seeds:
        if mask.getpixel(seed) == 255:
            ImageDraw.floodfill(mask, seed, 128)
            
    # Also handle the holes in the letters explicitly by coordinate areas
    # AQUABIOTICS (top) and SUR (bottom)
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
                # True transparency
                continue
            else:
                # Keep original pixel EXACTLY (colors, black lines, white fills)
                # But ensure we have full alpha for the logo parts
                # Unless it was already somewhat transparent in the source (unlikely for this file)
                new_pix[x, y] = (r, g, b, 255)
                
    new_img.save(output_path, "PNG")
    print(f"Final logo without checkerboard saved to {output_path}")

if __name__ == "__main__":
    input_img = "C:/Users/VN/.gemini/antigravity/brain/e7070946-8d70-4069-95fa-594e165af530/media__1772072415034.png"
    output_img = "c:/Users/VN/WEB-AQUA/logo_final_perfect.png"
    remove_checkerboard_v2(input_img, output_img)
