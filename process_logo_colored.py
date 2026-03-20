from PIL import Image, ImageDraw

def process_logo_colored(input_path, output_path):
    # Load the image
    img = Image.open(input_path).convert("RGBA")
    width, height = img.size
    pix = img.load()

    # We want to remove the background (white-ish) and turn black/dark gray (text) to white.
    # The colored parts (arcs, waves) should stay.
    
    # Create a mask for the outer background using flood fill on a grayscale version
    temp_img = img.convert("L")
    mask_img = Image.new("L", (width, height), 0)
    
    # Threshold to find background-ish areas
    # In logo_original, background is white (255)
    for y in range(height):
        for x in range(width):
            v = temp_img.getpixel((x, y))
            if v > 240: # White background
                mask_img.putpixel((x, y), 255)
            else:
                mask_img.putpixel((x, y), 0)
    
    # Flood fill corners to isolate outer background
    ImageDraw.floodfill(mask_img, (0, 0), 128)
    ImageDraw.floodfill(mask_img, (width-1, 0), 128)
    ImageDraw.floodfill(mask_img, (0, height-1), 128)
    ImageDraw.floodfill(mask_img, (width-1, height-1), 128)
    
    new_img = Image.new("RGBA", (width, height), (0, 0, 0, 0))
    new_pix = new_img.load()
    
    for y in range(height):
        for x in range(width):
            r, g, b, a = pix[x, y]
            m = mask_img.getpixel((x, y))
            
            # Outer background
            if m == 128:
                continue
            
            # Identify text/lines (black/dark)
            avg = (r + g + b) / 3
            is_dark = (avg < 150 and abs(r-g) < 20 and abs(g-b) < 20)
            
            # Identity colors
            is_colored = (abs(r - avg) > 20 or abs(g - avg) > 20 or abs(b - avg) > 20)
            
            if is_dark and not is_colored:
                # Turn black text to white
                new_pix[x, y] = (255, 255, 255, 255)
            elif is_colored:
                # Keep colors
                new_pix[x, y] = (r, g, b, 255)
            else:
                # Internal white areas (background inside circles/text)
                # If they were part of the intended logo fill? 
                # The user wants "vectorized" look.
                # Usually we keep internal whites if they are fills.
                # For now, let's keep them white if they are white.
                if r > 200 and g > 200 and b > 200:
                    new_pix[x, y] = (255, 255, 255, 255)
                else:
                    # Keep as is but with full alpha
                    new_pix[x, y] = (r, g, b, 255)

    new_img.save(output_path, "PNG")
    print(f"Colored transparent logo saved to {output_path}")

if __name__ == "__main__":
    process_logo_colored("c:/Users/VN/WEB-AQUA/logo_original.png", "c:/Users/VN/WEB-AQUA/logo-color-transparente.png")
