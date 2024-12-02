from typing import List


def is_safe(levels: List[int]) -> bool:
    # Check if levels are strictly increasing or decreasing and differ by 1-3
    for i in range(1, len(levels)):
        if abs(levels[i] - levels[i - 1]) < 1 or abs(levels[i] - levels[i - 1]) > 3:
            return False
    return all(levels[i] >= levels[i - 1] for i in range(1, len(levels))) or \
        all(levels[i] <= levels[i - 1] for i in range(1, len(levels)))


def is_safe_with_removal(levels: List[int]) -> bool:
    # Check if the report is already safe
    if is_safe(levels):
        return True

    # Check if removing a single level makes it safe
    for i in range(len(levels)):
        modified_levels = levels[:i] + levels[i+1:]
        if is_safe(modified_levels):
            return True

    return False


# Main script to process input
with open('2.in') as f:
    num_safe_reports = 0
    for report in f:
        levels = list(map(int, report.split()))
        if is_safe_with_removal(levels):
            num_safe_reports += 1

    print(num_safe_reports)
