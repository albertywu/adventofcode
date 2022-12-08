def parse():
    return [list(map(int, [*line.strip()])) for line in open('8.in')]


def get_scene_score(grid, row, col) -> int:
    nRows = len(grid)
    nCols = len(grid[0])
    cell = grid[row][col]

    # get trees up
    treesUp = 0
    for r in range(row - 1, -1, -1):
        if r < 0:
            break
        treesUp = treesUp + 1
        if grid[r][col] >= cell:
            break

    # get trees down
    treesDown = 0
    for r in range(row + 1, nRows):
        if r > nRows - 1:
            break
        treesDown = treesDown + 1
        if grid[r][col] >= cell:
            break

    # get trees left
    treesLeft = 0
    for c in range(col - 1, -1, -1):
        if c < 0:
            break
        treesLeft = treesLeft + 1
        if grid[row][c] >= cell:
            break

    # get trees right
    treesRight = 0
    for c in range(col + 1, nCols):
        if c > nCols - 1:
            break
        treesRight = treesRight + 1
        if grid[row][c] >= cell:
            break

    return treesLeft * treesRight * treesUp * treesDown


def solve() -> int:
    g = parse()
    scene_scores = []
    for row in range(len(g)):
        for col in range(len(g[0])):
            scene_scores.append(get_scene_score(g, row, col))
    return max(scene_scores)


print(
    solve()
)
