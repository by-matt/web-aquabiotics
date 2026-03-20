from PIL import Image, ImageDraw

def process_logo_selective_transparency(input_path, output_path):
    # Load the image
    img = Image.open(input_path).convert("RGBA")
    width, height = img.size
    
    # Create a backup to read original colors
    orig_pix = img.load()
    
    # We'll work on a copy
    new_img = Image.new("RGBA", (width, height), (0, 0, 0, 0))
    new_pix = new_img.load()
    
    # Step 1: Detect background connected to edges.
    # We use a thresholded mask for flood filling.
    mask = Image.new("L", (width, height), 0)
    for y in range(height):
        for x in range(width):
            r, g, b, a = orig_pix[x, y]
            # White-ish areas
            if r > 240 and g > 240 and b > 240:
                mask.putpixel((x, y), 255)
    
    # Flood fill outer background
    ImageDraw.floodfill(mask, (0, 0), 128)
    ImageDraw.floodfill(mask, (width-1, 0), 128)
    ImageDraw.floodfill(mask, (0, height-1), 128)
    ImageDraw.floodfill(mask, (width-1, height-1), 128)
    
    # Step 2: Detect holes in letters.
    # These are white areas (255 in mask) that were NOT filled by outer background (128).
    # But we want to avoid the waves. 
    # Waves are big, holes are small. 
    # Let's flood fill ALL white areas and check their size/location.
    
    final_mask = mask.copy()
    
    # Identify all remaining white blobs (potential holes or waves)
    for y in range(height):
        for x in range(width):
            if final_mask.getpixel((x, y)) == 255:
                # Found a white blob. Check if it's a hole or a wave.
                # Letter holes are typically higher up or far down. 
                # Waves are central.
                # However, a color-based approach or coordinate-based approach is safer.
                
                # Let's see if we can find coordinates for A, Q, B, O, R.
                # Or just use size: letter holes are small (< 500 pixels usually).
                # Waves are much larger.
                
                # Flood fill this blob with a temporary color to measure it
                temp_mask = Image.new("L", (width, height), 0)
                ImageDraw.floodfill(final_mask, (x, y), 64) # Mark as "processing"
                
                # (Re-executing floodfill to count pixels is expensive in PIL without numpy, 
                # but we can just use a coordinate-based check for the "A, Q, B, O, R" regions)
                
                # Actually, the user specifically named A, Q, B, O, R.
                # In Aquabiotics Sur:
                # AQUABIOTICS (top)
                # SUR (bottom)
                
                # Let's check the y coordinate. Top letters are roughly in the top 30% of height.
                # Bottom letters SUR are in the bottom 20%.
                # Waves are in the middle (30% to 80%).
                
                is_hole = False
                if y < height * 0.35: # AQUABIOTICS section
                    is_hole = True
                elif y > height * 0.8: # SUR section
                    is_hole = True
                
                if is_hole:
                    # It's a hole in a letter. Make it transparent.
                    # We can mark it in the final mask as "background"
                    # But we need to fill the WHOLE blob we just found.
                    # We'll use 128 to mean "transparent" in the final result.
                    ImageDraw.floodfill(final_mask, (x, y), 128)
                else:
                    # It's likely a wave (delimited by black). Keep it white (255).
                    ImageDraw.floodfill(final_mask, (x, y), 255) # Keep as white

    # Step 3: Compose the final image
    for y in range(height):
        for x in range(width):
            r, g, b, a = orig_pix[x, y]
            m = final_mask.getpixel((x, y))
            
            if m == 128:
                # Transparent (Outer BG or Letter Holes)
                new_pix[x, y] = (0, 0, 0, 0)
            else:
                # Keep original color/opacity
                new_pix[x, y] = (r, g, b, a)

    new_img.save(output_path, "PNG")
    print(f"Refined transparent logo saved to {output_path}")

if __name__ == "__main__":
    process_logo_selective_transparency("c:/Users/VN/WEB-AQUA/logo_original.png", "c:/Users/VN/WEB-AQUA/logo-original-transparente.png")
