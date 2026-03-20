from PIL import Image, ImageDraw, ImageFilter

def remove_green_background_refined(input_path, output_path):
    img = Image.open(input_path).convert("RGBA")
    width, height = img.size
    pix = img.load()
    
    # Target green: (171, 253, 28)
    def is_target_green(r, g, b):
        # Green is dominant and very high
        return g > 150 and g > r + 30 and g > b + 30
    
    mask = Image.new("L", (width, height), 0)
    for y in range(height):
        for x in range(width):
            r, g, b, a = pix[x, y]
            if is_target_green(r, g, b):
                mask.putpixel((x, y), 255)
    
    # Flood fill outer background
    seeds = []
    for x in range(width): seeds.extend([(x, 0), (x, height-1)])
    for y in range(height): seeds.extend([(0, y), (width-1, y)])
    for seed in seeds:
        if mask.getpixel(seed) == 255:
            ImageDraw.floodfill(mask, seed, 128)
            
    # Remove internal green holes in letters
    for y in range(height):
        for x in range(width):
            if mask.getpixel((x, y)) == 255:
                if (y < height * 0.35) or (y > height * 0.83):
                    ImageDraw.floodfill(mask, (x, y), 128)
                    
    # Refinement: Handle the halo
    # We'll create a new image and only keep pixels that AREN'T 128 in the mask
    # and also attempt to de-green the edges.
    new_img = Image.new("RGBA", (width, height), (0, 0, 0, 0))
    new_pix = new_img.load()
    
    for y in range(height):
        for x in range(width):
            m = mask.getpixel((x, y))
            if m == 128:
                continue
            
            r, g, b, a = pix[x, y]
            
            # If it's on the edge of transparency, it might have a green tint
            # Let's check neighbors in the mask
            is_edge = False
            for dx, dy in [(-1,0),(1,0),(0,-1),(0,1)]:
                nx, ny = x+dx, y+dy
                if 0 <= nx < width and 0 <= ny < height:
                    if mask.getpixel((nx, ny)) == 128:
                        is_edge = True
                        break
            
            if is_edge:
                # If it's still "too green", make it transparent or reduce green
                if g > r and g > b:
                    # It's likely a halo pixel. 
                    # If it's very close to white/black, we can try to save it, 
                    # but usually it's better to just trim it or desaturate.
                    # Trimming:
                    if g > 100: # Significant green tint
                         continue
            
            new_pix[x, y] = (r, g, b, 255)
                
    new_img.save(output_path, "PNG")
    print(f"Refined logo saved to {output_path}")

if __name__ == "__main__":
    input_img = "C:/Users/VN/.gemini/antigravity/brain/e7070946-8d70-4069-95fa-594e165af530/media__1772073582788.jpg"
    output_img = "c:/Users/VN/WEB-AQUA/logo_final_no_halo.png"
    remove_green_background_refined(input_img, output_img)
