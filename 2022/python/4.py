
def parse():
    with open('4.in') as f:
        result = []
        for line in f.read().strip().split("\n"):
            left, right = line.split(",")
            leftA, leftB = left.split("-")
            rightA, rightB = right.split("-")
            leftSet = set(range(int(leftA), int(leftB) + 1))
            rightSet = set(range(int(rightA), int(rightB) + 1))
            result.append((leftSet, rightSet))
        return result


def solve():
    total = 0
    for a, b in parse():
        if a.issubset(b) or b.issubset(a):
            total = total + 1
    print(total)

solve()