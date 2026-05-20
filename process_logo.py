from PIL import Image, ImageDraw

def process_logo(input_path, output_path):
    # Load the image
    img = Image.open(input_path).convert("RGBA")
    width, height = img.size
    data = img.getdata()

    # Define thresholds
    # We want to identify the "background" (connected to edges)
    # And then treat internal pixels.
    
    # Create a mask for the background using flood fill
    # We'll use a copy to find the background
    background_mask = Image.new("L", (width, height), 0)
    # Assume corners are background
    temp_img = img.convert("L")
    # Invert so white background is 255
    # But wait, flood fill on the original is better.
    # Let's just do a simple flood fill on a thresholded version.
    
    # Threshold to find "white-ish" areas
    mask_data = []
    for item in data:
        # If very white, it could be background or fill
        if item[0] > 240 and item[1] > 240 and item[2] > 240:
            mask_data.append(255)
        else:
            mask_data.append(0)
    
    mask_img = Image.new("L", (width, height))
    mask_img.putdata(mask_data)
    
    # Flood fill from (0,0) to find the outer background
    ImageDraw.floodfill(mask_img, (0, 0), 128)
    ImageDraw.floodfill(mask_img, (width-1, 0), 128)
    ImageDraw.floodfill(mask_img, (0, height-1), 128)
    ImageDraw.floodfill(mask_img, (width-1, height-1), 128)
    
    # pixels with 128 are background
    mask_data_final = list(mask_img.getdata())
    
    new_data = []
    for i in range(len(data)):
        item = data[i]
        is_background = (mask_data_final[i] == 128)
        
        # If it's the outer background, make it transparent
        if is_background:
            new_data.append((0, 0, 0, 0))
            continue
            
        # For internal pixels:
        # Check if it's "colored" (red, green, blue)
        # We can do this by checking saturation or distance from grayscale
        r, g, b, a = item
        avg = (r + g + b) / 3
        # Simple "distance from grayscale" check
        is_colored = (abs(r - avg) > 20 or abs(g - avg) > 20 or abs(b - avg) > 20)
        
        if is_colored:
            # Check if it's the red arc, green wave, or blue waves
            # The user wants "letters, dots, and two middle waves" to be white.
            # These are currently white or black outlines.
            # The colored parts should be removed.
            new_data.append((0, 0, 0, 0))
        else:
            # It's grayscale (white, black, or gray)
            # Make it full white if it's part of the logo
            if a > 0:
                new_data.append((255, 255, 255, 255))
            else:
                new_data.append((0, 0, 0, 0))

    img.putdata(new_data)
    img.save(output_path, "PNG")
    print(f"Processed logo saved to {output_path}")

if __name__ == "__main__":
    process_logo("c:/Users/VN/WEB-AQUA/logo_original.png", "c:/Users/VN/WEB-AQUA/logo-relleno.png")
