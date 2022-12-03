from typing import List


def parse() -> List[List[chr]]:
    with open('3.in') as f:
        lines = f.read().strip().split("\n")
        result = []
        idx = 0
        group = []
        for line in lines:
            group.append(list(line.strip()))
            idx = idx + 1
            if idx % 3 == 0:
                result.append(group.copy())
                group = []
        return result


def get_common_char(row: List[List[chr]]) -> chr:
    one, two, three = row
    seenA = set()
    seenB = set()
    seenC = set()
    for c in one:
        seenA.add(c)
    for c in two:
        seenB.add(c)
    for c in three:
        seenC.add(c)
    return (seenA.intersection(seenB).intersection(seenC)).pop()


def priority(letter: chr) -> int:
    if ord(letter) in range(ord('a'), ord('z') + 1):
        return ord(letter) - 96
    elif ord(letter) in range(ord('A'), ord('Z') + 1):
        return ord(letter) - 38


def solution():
    total = 0
    for group in parse():
        total = total + priority(get_common_char(group))
    print(total)

solution()