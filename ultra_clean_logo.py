from PIL import Image, ImageDraw

def ultra_clean_logo(input_path, output_path):
    img = Image.open(input_path).convert("RGBA")
    width, height = img.size
    pix = img.load()
    
    # 1. Mask anything that looks even slightly green
    mask = Image.new("L", (width, height), 0)
    for y in range(height):
        for x in range(width):
            r, g, b, a = pix[x, y]
            # More aggressive green detection: g is significantly higher than r and b
            # Or it's very bright green
            if (g > r + 10 and g > b + 10 and g > 80) or (g > 200 and r < 200):
                mask.putpixel((x, y), 255)
    
    # 2. Mark all green as "background" (128) regardless of connection
    # But only in areas where we don't expect the teal wave
    # Teal wave is roughly Y in [600, 800] for a 1024 height image.
    # Let's map it: waves are between 40% and 82% height.
    for y in range(height):
        for x in range(width):
            if mask.getpixel((x, y)) == 255:
                # Is it a letter area?
                is_letter_area = (y < height * 0.40) or (y > height * 0.82)
                # Or is it near the far edges? (background)
                is_far_edge = (x < width * 0.1) or (x > width * 0.9)
                
                if is_letter_area or is_far_edge:
                    mask.putpixel((x, y), 128)
                else:
                    # It's in the wave area. 
                    # If it's the bright neon green, we still want to remove it 
                    # because the waves are Teal/White/Blue/Purple.
                    # Neon green is roughly (171, 253, 28)
                    r, g, b, a = pix[x, y]
                    if g > 220 and r > 100 and b < 100:
                        mask.putpixel((x, y), 128)
                    else:
                        # Keep it (might be the teal wave)
                        mask.putpixel((x, y), 0)

    # 3. Final Compose
    new_img = Image.new("RGBA", (width, height), (0, 0, 0, 0))
    new_pix = new_img.load()
    
    for y in range(height):
        for x in range(width):
            m = mask.getpixel((x, y))
            if m == 128:
                continue
            
            r, g, b, a = pix[x, y]
            # Check for halo in this final step too
            if (g > r + 5 and g > b + 5):
                 # Highly likely a green halo pixel.
                 # If it's not a brand color (like the teal wave), make it transparent
                 # Teal wave check: g~171, r~66, b~153 (approx)
                 is_teal_wave = (r > 40 and r < 100 and g > 150 and g < 190 and b > 140 and b < 180)
                 if not is_teal_wave:
                      # It's an edge artifact. Check if it's black-ish.
                      if r < 50 and b < 50:
                           # Clean it to black
                           new_pix[x, y] = (0, 0, 0, 255)
                      else:
                           # Just trim it
                           continue
            
            new_pix[x, y] = (r, g, b, 255)
            
    new_img.save(output_path, "PNG")
    print(f"Ultra clean logo saved to {output_path}")

if __name__ == "__main__":
    input_img = "C:/Users/VN/.gemini/antigravity/brain/e7070946-8d70-4069-95fa-594e165af530/media__1772073582788.jpg"
    output_img = "c:/Users/VN/WEB-AQUA/logo_ultra_clean.png"
    ultra_clean_logo(input_img, output_img)
