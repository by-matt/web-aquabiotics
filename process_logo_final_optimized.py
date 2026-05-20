from PIL import Image, ImageDraw

def process_logo_final(input_path, output_path):
    # Load the image
    img = Image.open(input_path).convert("RGBA")
    width, height = img.size
    pix = img.load()
    
    # We'll use a grayscale mask for flood filling
    mask = Image.new("L", (width, height), 0)
    for y in range(height):
        for x in range(width):
            r, g, b, a = pix[x, y]
            # Threshold for "white"
            if r > 240 and g > 240 and b > 240:
                mask.putpixel((x, y), 255)
    
    # Flood fill the outer background (transparent)
    # We use 128 to mark "to be transparent"
    ImageDraw.floodfill(mask, (0, 0), 128)
    ImageDraw.floodfill(mask, (width-1, 0), 128)
    ImageDraw.floodfill(mask, (0, height-1), 128)
    ImageDraw.floodfill(mask, (width-1, height-1), 128)
    
    # We also want to find holes in letters: A, Q, B, O, R
    # These are small white islands. 
    # Waves are large white islands.
    
    # Find all white islands
    for y in range(height):
        for x in range(width):
            if mask.getpixel((x, y)) == 255:
                # Determine if this island is a hole in a letter
                # AQUABIOTICS is roughly at Y < 35%
                # SUR is roughly at Y > 85%
                # Middle waves are 35% < Y < 85%
                is_letter_area = (y < height * 0.35) or (y > height * 0.85)
                
                # We could also check size, but Y coordinate is very reliable here.
                if is_letter_area:
                    # Mark as to be transparent
                    ImageDraw.floodfill(mask, (x, y), 128)
                else:
                    # Likely a wave. Mark as to be kept white (255)
                    ImageDraw.floodfill(mask, (x, y), 200) # 200 means "keep white"

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
                # Keep original white fill
                new_pix[x, y] = (r, g, b, a)
            else:
                # Likely part of the colored elements or outlines
                new_pix[x, y] = (r, g, b, a)
                
    new_img.save(output_path, "PNG")
    print(f"Final logo saved to {output_path}")

if __name__ == "__main__":
    process_logo_final("c:/Users/VN/WEB-AQUA/logo_original.png", "c:/Users/VN/WEB-AQUA/logo_final_transparent.png")
