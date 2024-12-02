left = []
right = []
with open('1.in') as f:
    for line in f:
        l, r = line.split()
        left.append(int(l))
        right.append(int(r))
    # create dict mapping its in right to its frequency
    freq = {}
    for n in right:
        if n not in freq:
            freq[n] = 1
        else:
            freq[n] = freq[n] + 1

    total = 0
    for n in left:
        total = total + n * freq.get(n, 0)

    print(total)

