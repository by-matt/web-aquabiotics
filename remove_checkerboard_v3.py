from PIL import Image, ImageDraw, ImageFilter
from collections import Counter

def remove_checkerboard_v3(input_path, output_path):
    img = Image.open(input_path).convert("RGBA")
    width, height = img.size
    pix = img.load()
    
    # 1. Sample corners to find background colors (the checkerboard)
    edge_samples = []
    for x in range(32):
        for y in range(32):
            edge_samples.append(pix[x, y])
            edge_samples.append(pix[width-1-x, y])
            edge_samples.append(pix[x, height-1-y])
            edge_samples.append(pix[width-1-x, height-1-y])
            
    # Count occurrences
    color_counts = Counter(edge_samples)
    # Get top 3 colors (usually white and gray, plus maybe some anti-aliasing)
    top_colors = [c for c, count in color_counts.most_common(10)]
    print(f"Top edge colors: {top_colors}")

    def color_dist(c1, c2):
        return sum((a - b) ** 2 for a, b in zip(c1[:3], c2[:3])) ** 0.5

    # 2. Create mask of all pixels that match ANY of these edge colors with tolerance
    mask = Image.new("L", (width, height), 0)
    for y in range(height):
        for x in range(width):
            p = pix[x, y]
            # Match if close to any of the top colors
            is_match = False
            for tc in top_colors:
                if color_dist(p, tc) < 20: # Slightly higher tolerance
                    is_match = True
                    break
            
            # Also catch anything desaturated and bright
            avg = (p[0] + p[1] + p[2]) / 3
            is_desat = max(abs(p[0]-avg), abs(p[1]-avg), abs(p[2]-avg)) < 15
            if is_desat and avg > 210:
                is_match = True
                
            if is_match:
                mask.putpixel((x, y), 255)
    
    # 3. Flood fill from the outer edges to separate actual background from internal fills
    # Mark real background as 128
    seeds = []
    for x in range(width): seeds.extend([(x, 0), (x, height-1)])
    for y in range(height): seeds.extend([(0, y), (width-1, y)])
    
    for seed in seeds:
        if mask.getpixel(seed) == 255:
            ImageDraw.floodfill(mask, seed, 128)
            
    # 4. Handle internal holes in letters (A, Q, B, O, R)
    # These are small islands of "desaturated/bright" pixels
    for y in range(height):
        for x in range(width):
            if mask.getpixel((x, y)) == 255:
                # If it's in a letter area (top 1/3 or bottom 1/5)
                if (y < height * 0.35) or (y > height * 0.82):
                    ImageDraw.floodfill(mask, (x, y), 128)

    # 5. Create final clean image
    # Use the mask to set alpha
    new_img = Image.new("RGBA", (width, height), (0, 0, 0, 0))
    new_pix = new_img.load()
    
    for y in range(height):
        for x in range(width):
            m = mask.getpixel((x, y))
            if m == 128:
                # Background -> Transparent
                continue
            else:
                # Logo content -> Keep original colors
                # Ensure it's opaque for the visible part
                p = pix[x, y]
                new_pix[x, y] = (p[0], p[1], p[2], 255)
                
    new_img.save(output_path, "PNG")
    print(f"Final logo v3 saved to {output_path}")

if __name__ == "__main__":
    input_img = "C:/Users/VN/.gemini/antigravity/brain/e7070946-8d70-4069-95fa-594e165af530/media__1772072415034.png"
    output_img = "c:/Users/VN/WEB-AQUA/logo_final_perfect_v3.png"
    remove_checkerboard_v3(input_img, output_img)
