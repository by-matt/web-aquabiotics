import sys
try:
    import PyPDF2
except ImportError:
    import subprocess
    subprocess.check_call([sys.executable, "-m", "pip", "install", "PyPDF2"])
    import PyPDF2

def extract_text(pdf_path, text_path):
    try:
        with open(pdf_path, 'rb') as file:
            reader = PyPDF2.PdfReader(file)
            text = ""
            for i, page in enumerate(reader.pages):
                text += f"--- PAGE {i+1} ---\n"
                extracted = page.extract_text()
                if extracted:
                    text += extracted + "\n"
                
        with open(text_path, 'w', encoding='utf-8') as out:
            out.write(text)
        print("Extraction complete.")
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    extract_text(r"c:\Users\VN\WEB-AQUA\mercado-bioproductos.pdf", r"c:\Users\VN\WEB-AQUA\mercado_extract.txt")
