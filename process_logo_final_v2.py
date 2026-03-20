from PIL import Image, ImageDraw

def process_logo_final_v2(input_path, output_path):
    # Load the image
    img = Image.open(input_path).convert("RGBA")
    width, height = img.size
    pix = img.load()
    
    # Threshold for white
    # We use a bit of tolerance to catch anti-aliased edges
    mask = Image.new("L", (width, height), 0)
    for y in range(height):
        for x in range(width):
            r, g, b, a = pix[x, y]
            # Capture everything that is "white-ish"
            if r > 230 and g > 230 and b > 230:
                mask.putpixel((x, y), 255)
    
    # Flood fill the outer background (transparent)
    # Start from corners to ensure we get the whole outside
    seeds = [(0,0), (width-1, 0), (0, height-1), (width-1, height-1)]
    for seed in seeds:
        ImageDraw.floodfill(mask, seed, 128)
    
    # Now address internal holes in letters.
    # In "AQUABIOTICS" and "SUR", the holes (255) are surrounded by non-white (black/colors).
    # The waves in the middle are ALSO white (255).
    # The user wants to remove holes in A, Q, B, O, R but KEEP the waves.
    
    # Wave areas are roughly 35% < Y < 85%
    # Top letters are Y < 35%
    # Bottom letters SUR are Y > 85%
    
    # We iterate over all white-ish pixels
    for y in range(height):
        for x in range(width):
            if mask.getpixel((x, y)) == 255:
                # Determine if this white island is in a letter area
                is_letter_area = (y < height * 0.35) or (y > height * 0.82)
                
                # Check neighbors to avoid accidentally skipping small pixels
                if is_letter_area:
                    # Mark as to be transparent
                    ImageDraw.floodfill(mask, (x, y), 128)
                else:
                    # Mark as to be kept white
                    ImageDraw.floodfill(mask, (x, y), 200)

    # Compose final image
    new_img = Image.new("RGBA", (width, height), (0, 0, 0, 0))
    new_pix = new_img.load()
    
    for y in range(height):
        for x in range(width):
            r, g, b, a = pix[x, y]
            m = mask.getpixel((x, y))
            
            if m == 128:
                # Transparent
                continue
            elif m == 200:
                # Keep white fill (the waves)
                new_pix[x, y] = (r, g, b, 255)
            else:
                # Keep original color/line
                new_pix[x, y] = (r, g, b, 255)
                
    new_img.save(output_path, "PNG")
    print(f"Final logo v2 saved to {output_path}")

if __name__ == "__main__":
    process_logo_final_v2("c:/Users/VN/WEB-AQUA/logo_original.png", "c:/Users/VN/WEB-AQUA/logo_final_v2.png")
