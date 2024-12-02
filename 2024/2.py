from typing import List


def is_safe(levels: List[int]) -> bool:
    is_increasing = True
    is_decreasing = True
    for i in range(1, len(levels)):
        if levels[i] > levels[i - 1]:
            is_decreasing = False
        if levels[i] < levels[i - 1]:
            is_increasing = False
        distance = abs(levels[i] - levels[i - 1])
        if distance < 1 or distance > 3:
            return False
        if is_decreasing is False and is_increasing is False:
            return False
    return True


with open('2.in') as f:
    num_safe_reports = 0
    for report in f:
        levels = list(map(int, report.split()))
        if is_safe(levels):
            num_safe_reports += 1
    print(num_safe_reports)
