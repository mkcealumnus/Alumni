import re
import sys

def remove_sections(filepath, sections_to_remove):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    lines = content.split('\n')
    new_lines = []
    skip = False
    
    for line in lines:
        if line.strip().startswith('// ───'):
            header_text = line.replace('─', '').replace('//', '').strip()
            skip = False
            for sec in sections_to_remove:
                if sec.lower() in header_text.lower():
                    skip = True
                    break
        
        if not skip:
            new_lines.append(line)
            
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write('\n'.join(new_lines))
    print(f"Cleaned {filepath}")

public_sections = ['PUBLIC COURSES']

remove_sections('server/routes/public.js', public_sections)
