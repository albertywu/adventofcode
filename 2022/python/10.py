def solve():
    X = 1
    cycles = [None]
    with open('10.in') as f:
        for line in f:
            match line.strip().split(" "):
                case ["noop"]:
                    cycles.append((X, X))  # (during, after) cycle
                case ["addx", val]:
                    cycles.append((X, X))  # (during, after) cycle
                    prevX = X
                    X = X + int(val)
                    cycles.append((prevX, X))  # (during, after) cycle
    print(
        cycle_strength(cycles, 20) +
        cycle_strength(cycles, 60) +
        cycle_strength(cycles, 100) +
        cycle_strength(cycles, 140) +
        cycle_strength(cycles, 180) +
        cycle_strength(cycles, 220)
    )


def cycle_strength(cycles, n):
    return cycles[n][0] * n


def solveB():
    X = 1
    cycles = [None]
    with open('10.in') as f:
        for line in f:
            match line.strip().split(" "):
                case ["noop"]:
                    cycles.append((X, X))  # (during, after) cycle
                case ["addx", val]:
                    cycles.append((X, X))  # (during, after) cycle
                    prevX = X
                    X = X + int(val)
                    cycles.append((prevX, X))  # (during, after) cycle

    mask = set([X - 1, X, X + 1])
    idx = 0
    for beginX, endX in cycles[1:]:
        # draw pixel using mask
        if idx in mask:
            print("#", end="")
        else:
            print(".", end="")

        # update mask using endX
        mask = {endX - 1, endX, endX + 1}

        # update idx, and print newline if at end of line
        if idx == 39:
            print("\n", end="")
            idx = 0
        else:
            idx = idx + 1

solveB()
