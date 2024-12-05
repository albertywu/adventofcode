with open('4.in') as f:
    grid = [list(line.strip()) for line in f]

def try_dir(grid, row, col, direction, word):
    r, c = row, col
    for i in range(len(word)):
        r += direction[0]
        c += direction[1]
        if r < 0 or r >= len(grid) or c < 0 or c >= len(grid[0]) or grid[r][c] != word[i]:
            return False
    return True

# Define the word and directions
word = "XMAS"
directions = [(1, 0), (1, 1), (0, 1), (-1, 1), (-1, 0), (-1, -1), (0, -1), (1, -1)]

# Count occurrences
count = 0
for row in range(len(grid)):
    for col in range(len(grid[row])):
        if grid[row][col] == word[0]:  # Start from first letter
            for direction in directions:
                if try_dir(grid, row, col, direction, word[1:]):  # Match the rest of the word
                    count += 1

print(count)
