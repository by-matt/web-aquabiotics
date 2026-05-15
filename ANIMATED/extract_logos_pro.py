import os
from PIL import Image, ImageChops

def trim(im):
    bg = Image.new(im.mode, im.size, (255, 255, 255, 255))
    diff = ImageChops.difference(im, bg)
    diff = ImageChops.add(diff, diff, 2.0, -100)
    bbox = diff.getbbox()
    if bbox:
        return im.crop(bbox)
    return im

def extract_logos(input_path, output_dir):
    img = Image.open(input_path).convert("RGBA")
    width, height = img.size
    
    # Simple horizontal split based on typical spacing
    # Ketrawa is left, UC is middle, Corfo is right
    # We can be smarter by finding gaps in the horizontal profile
    
    # 1. Remove background (turn white/near-white to transparent)
    datas = img.getdata()
    newData = []
    for item in datas:
        if item[0] > 240 and item[1] > 240 and item[2] > 240:
            newData.append((255, 255, 255, 0))
        else:
            newData.append(item)
    img.putdata(newData)
    
    # 2. Find bounding boxes of distinct components
    # For simplicity in this specific strip, we'll split at roughly 1/3 and 2/3
    # and then trim each segment.
    
    k_seg = img.crop((0, 0, width // 3, height))
    uc_seg = img.crop((width // 3, 0, 2 * width // 3, height))
    c_seg = img.crop((2 * width // 3, 0, width, height))
    
    logos = [
        ("logo_ketrawa_official.png", k_seg),
        ("logo_uc_official.png", uc_seg),
        ("logo_corfo_official.png", c_seg)
    ]
    
    for name, logo in logos:
        # Trim whitespace
        trimmed = trim(logo)
        trimmed.save(os.path.join(output_dir, name))
        print(f"Saved {name}")

if __name__ == "__main__":
    extract_logos("logos_originales_raw.png", ".")
