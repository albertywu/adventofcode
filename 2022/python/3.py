from typing import List


def parse() -> List[List[chr]]:
    with open('3.in') as f:
        lines = f.read().strip().split("\n")
        result = []
        for line in lines:
            row = [[], []]
            chars = list(line.strip())
            idx = 0
            for char in chars:
                if idx < len(chars) / 2:
                    row[0].append(char)
                else:
                    row[1].append(char)
                idx = idx + 1
            result.append(row)
        return result


def get_duplicate_char(row: List[List[chr]]) -> chr:
    left, right = row
    seenLeft = set()
    seenRight = set()
    for c in left:
        seenLeft.add(c)
    for c in right:
        seenRight.add(c)
    return (seenLeft.intersection(seenRight)).pop()


def priority(letter: chr) -> int:
    if ord(letter) in range(ord('a'), ord('z') + 1):
        return ord(letter) - 96
    elif ord(letter) in range(ord('A'), ord('Z') + 1):
        return ord(letter) - 38


def solution():
    total = 0
    for row in parse():
        total = total + priority(get_duplicate_char(row))
    print(total)


solution()