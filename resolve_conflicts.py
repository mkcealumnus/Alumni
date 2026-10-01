import re

def resolve_css():
    with open('src/index.css', 'r', encoding='utf-8') as f:
        content = f.read()

    # We want to keep both HEAD and INCOMING for CSS.
    # Replace <<<<<<< HEAD\n with nothing
    # Replace =======\n with nothing
    # Replace >>>>>>> .*\n with nothing
    content = re.sub(r'<<<<<<< HEAD\n', '', content)
    content = re.sub(r'=======\n', '', content)
    content = re.sub(r'>>>>>>> .*\n', '', content)

    with open('src/index.css', 'w', encoding='utf-8') as f:
        f.write(content)


def resolve_html():
    with open('index.html', 'r', encoding='utf-8') as f:
        lines = f.readlines()

    out_lines = []
    in_head = False
    in_incoming = False
    
    for line in lines:
        if line.startswith('<<<<<<< HEAD'):
            in_head = True
            continue
        elif line.startswith('======='):
            in_head = False
            in_incoming = True
            continue
        elif line.startswith('>>>>>>>'):
            in_incoming = False
            continue

        if in_head:
            # Drop the NextStep title since incoming has a better one
            if '<title>NextStep</title>' in line:
                continue
            out_lines.append(line)
        elif in_incoming:
            # We don't want the incoming <body> tag and <div id="root"></div> 
            # because HEAD already has a much richer body. We just want the head stuff.
            if '<body' in line or '<div id="root"' in line or 'src="/src/main.jsx"' in line or '</body>' in line or '</html>' in line:
                continue
            out_lines.append(line)
        else:
            out_lines.append(line)

    with open('index.html', 'w', encoding='utf-8') as f:
        f.write("".join(out_lines))

resolve_css()
resolve_html()
print("Conflicts resolved.")
