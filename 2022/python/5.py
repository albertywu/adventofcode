import re


def move(stacks, count, source_stack_index, destination_stack_index):
    source_stack = stacks[source_stack_index]
    destination_stack = stacks[destination_stack_index]
    for n in range(count):
        destination_stack.append(source_stack.pop())
    return stacks


def printStack(stacks):
    tops = [stack[-1] for stack in stacks[1:]]
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
            count, source_stack_index, destination_stack_index = m.groups()
            count = int(count)
            source_stack_index = int(source_stack_index)
            destination_stack_index = int(destination_stack_index)
            move(stacks, count, source_stack_index, destination_stack_index)
    printStack(stacks)


solve()

