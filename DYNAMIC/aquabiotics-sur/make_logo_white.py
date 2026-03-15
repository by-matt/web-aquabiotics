from PIL import Image

def make_logo_white(input_path, output_path):
    try:
        img = Image.open(input_path).convert("RGBA")
        datas = img.getdata()
        
        newData = []
        for item in datas:
            # item is (R, G, B, A)
            if item[3] > 0: # If not fully transparent
                # Turn RGB to white, keep the original alpha transparency
                newData.append((255, 255, 255, item[3]))
            else:
                newData.append(item)
                
        img.putdata(newData)
        img.save(output_path, "PNG")
        print(f"Successfully created white logo at {output_path}")
    except Exception as e:
        print(f"Error processing {input_path}: {e}")

# Process the transparent logo to make it all white
make_logo_white(r"c:\Users\VN\WEB-AQUA\DYNAMIC\aquabiotics-sur\src\assets\logos_sinfondo.png", r"c:\Users\VN\WEB-AQUA\DYNAMIC\aquabiotics-sur\src\assets\logos_blanco.png")
