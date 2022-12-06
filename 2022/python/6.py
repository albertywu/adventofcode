with open('6.in') as f:
    letters = list(f.read().strip())
    for idx, c in enumerate(letters):
        if idx == len(letters) - 3:
            break
        if len(set(letters[idx: idx + 4])) == 4:
            print(idx + 4)
            break
