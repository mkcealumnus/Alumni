def remove_lines(filepath, start, end):
    with open(filepath, 'r', encoding='utf-8') as f:
        lines = f.readlines()
    
    # Python is 0-indexed, line numbers are 1-indexed
    new_lines = lines[:start-1] + lines[end:]
    
    with open(filepath, 'w', encoding='utf-8') as f:
        f.writelines(new_lines)
    print(f"Removed lines {start} to {end} from {filepath}")

remove_lines('server/routes/student.js', 1682, 1851)
remove_lines('server/routes/admin.js', 911, 991)
