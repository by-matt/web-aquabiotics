from PIL import Image

def remove_white_bg(input_path, output_path, tolerance=220):
    try:
        img = Image.open(input_path).convert("RGBA")
        datas = img.getdata()
        
        newData = []
        for item in datas:
            # item is (R, G, B, A)
            if item[0] > tolerance and item[1] > tolerance and item[2] > tolerance:
                # White or near white -> transparent
                newData.append((255, 255, 255, 0))
            else:
                newData.append(item)
                
        img.putdata(newData)
        img.save(output_path, "PNG")
        print(f"Successfully processed {input_path}")
    except Exception as e:
        print(f"Error processing {input_path}: {e}")

# Process the logo in the src folder
remove_white_bg(r"c:\Users\VN\WEB-AQUA\DYNAMIC\aquabiotics-sur\src\assets\logo.png", r"c:\Users\VN\WEB-AQUA\DYNAMIC\aquabiotics-sur\src\assets\logos_sinfondo.png")
