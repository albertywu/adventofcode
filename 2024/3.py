import re

with open('3.in') as f:
    content = f.read()
    regex = r"mul\((\d{1,3}),(\d{1,3})\)"
    matches = re.findall(regex, content)
    total = 0
    for a, b in matches:
        total += int(a) * int(b)
    print(total)