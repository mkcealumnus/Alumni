import os

filepath = 'src/App.jsx'
with open(filepath, 'r', encoding='utf-8') as f:
    lines = f.readlines()

head_lines = []
incoming_lines = []

in_head = False
in_incoming = False

for i, line in enumerate(lines):
    if line.startswith('<<<<<<<'):
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
        head_lines.append(line)
    elif in_incoming:
        incoming_lines.append(line)
    else:
        head_lines.append(line)

# Now incoming_lines has the new LaunchPage component
# Let's fix the imports in incoming_lines
launch_page_content = "".join(incoming_lines)
launch_page_content = launch_page_content.replace('export default function App()', 'export default function LaunchPage()')
launch_page_content = launch_page_content.replace("./components/", "../components/")

with open('src/pages/LaunchPage.jsx', 'w', encoding='utf-8') as f:
    f.write(launch_page_content)

# Now fix App.jsx
app_content = "".join(head_lines)
app_content = app_content.replace("import Home from '@/pages/Home'", "import LaunchPage from '@/pages/LaunchPage'")
app_content = app_content.replace('<Route path="/" element={<Home />} />', '<Route path="/" element={<LaunchPage />} />')

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(app_content)

print("Resolved App.jsx and created LaunchPage.jsx")
