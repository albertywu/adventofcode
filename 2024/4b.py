with open('4.in') as f:
    grid = [list(line.strip()) for line in f]

# Check if an "X-MAS" pattern exists with center at (row, col)
def has_x(grid, row, col):
    # Check if diagonals are within bounds
    if row < 1 or row > len(grid) - 2 or col < 1 or col > len(grid[0]) - 2:
        return False

    # Diagonal positions
    top_left, bottom_right = grid[row-1][col-1], grid[row+1][col+1]
    bottom_left, top_right = grid[row+1][col-1], grid[row-1][col+1]

    # Check diagonals for "M-A-S" patterns
    return (
            (top_left == 'M' and bottom_right == 'S' or top_left == 'S' and bottom_right == 'M') and
            (bottom_left == 'M' and top_right == 'S' or bottom_left == 'S' and top_right == 'M')
    )


# Count X-MAS occurrences
count = 0
for row in range(len(grid)):
    for col in range(len(grid[row])):
        if grid[row][col] == 'A':  # Start from center letter
            if has_x(grid, row, col):
                count += 1

print(count)
