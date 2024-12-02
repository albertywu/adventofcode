left = []
right = []
with open('1.in') as f:
    for line in f:
        l, r = line.split()
        left.append(int(l))
        right.append(int(r))
    left.sort()
    right.sort()
    distance = 0
    for (left, right) in zip(left, right):
        distance += abs(left - right)
    print(distance)
