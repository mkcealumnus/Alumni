import os

def replace_in_file(filepath):
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
            
        new_content = content.replace('Sowberry', 'NextStep').replace('sowberry', 'nextstep').replace('SOWBERRY', 'NEXTSTEP')
        
        if new_content != content:
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(new_content)
            print(f"Updated {filepath}")
    except Exception as e:
        print(f"Could not process {filepath}: {e}")

def walk_dir(directory):
    for root, dirs, files in os.walk(directory):
        if 'node_modules' in root or '.git' in root or 'dist' in root or '.gemini' in root:
            continue
        for file in files:
            if file.endswith(('.js', '.jsx', '.json', '.html', '.css', '.md', '.sql', '.txt', '.env')):
                replace_in_file(os.path.join(root, file))

if __name__ == '__main__':
    walk_dir('.')
