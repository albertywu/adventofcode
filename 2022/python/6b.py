with open('6.in') as f:
    letters = list(f.read().strip())
    for idx, c in enumerate(letters):
        if len(set(letters[idx: idx + 14])) == 14:
            print(idx + 14)
            break
