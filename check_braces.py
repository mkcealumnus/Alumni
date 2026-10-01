def check_braces(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        lines = f.readlines()
        
    stack = []
    for i, line in enumerate(lines):
        for j, char in enumerate(line):
            if char == '{':
                stack.append(i + 1)
            elif char == '}':
                if stack:
                    stack.pop()
                else:
                    print(f"Extra closing brace at line {i + 1}")
                    
    if stack:
        print("Unclosed braces opened at lines:")
        for line_num in stack:
            print(f"Line {line_num}: {lines[line_num-1].strip()}")

check_braces('src/index.css')
