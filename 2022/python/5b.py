import re


def move(stacks, count, fromIdx, toIdx):
    source = stacks[fromIdx]
    dest = stacks[toIdx]
    to_move = []
    for n in range(count):
        to_move.append(source.pop())
    to_move.reverse()
    for x in to_move:
        dest.append(x)
    return stacks


def printStack(stacks):
    tops = []
    for i in range(1, len(stacks)):
        tops.append(stacks[i][-1])
    print("".join(tops))


def solve():
    stacks = [
        [],
        ['B', 'V', 'S', 'N', 'T', 'C', 'H', 'Q'],
        ['W', 'D', 'B', 'G'],
        ['F', 'W', 'R', 'T', 'S', 'Q', 'B'],
        ['L', 'G', 'W', 'S', 'Z', 'J', 'D', 'N'],
        ['M', 'P', 'D', 'V', 'F'],
        ['F', 'W', 'J'],
        ['L', 'N', 'Q', 'B', 'J', 'V'],
        ['G', 'T', 'R', 'C', 'J', 'Q', 'S', 'N'],
        ['J', 'S', 'Q', 'C', 'W', 'D', 'M'],
    ]
    p = re.compile('move ([0-9]+) from ([0-9]+) to ([0-9]+)')
    with open('5.in') as f:
        for line in f.read().strip().split("\n"):
            m = p.match(line.strip())
            count = int(m.group(1))
            fromIdx = int(m.group(2))
            toIdx = int(m.group(3))
            move(stacks, count, fromIdx, toIdx)
    printStack(stacks)


solve()

