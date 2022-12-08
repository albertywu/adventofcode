def parse():
    return [list(map(int, [*line.strip()])) for line in open('8.in')]


def is_visible(grid, row, col) -> bool:
    nRows = len(grid)
    nCols = len(grid[0])
    isOnEdge = row == 0 or col == 0 or row == nRows - 1 or col == nCols - 1
    if isOnEdge: return True

    cell = grid[row][col]

    # check up
    isVisibleUp = True
    for r in range(row - 1, -1, -1):
        if grid[r][col] >= cell:
            isVisibleUp = False
            break

    # check down
    isVisibleDown = True
    for r in range(row + 1, nRows):
        if grid[r][col] >= cell:
            isVisibleDown = False
            break

    # check left
    isVisibleLeft = True
    for c in range(col - 1, -1, -1):
        if grid[row][c] >= cell:
            isVisibleLeft = False
            break

    # check right
    isVisibleRight = True
    for c in range(col + 1, nCols):
        if grid[row][c] >= cell:
            isVisibleRight = False
            break

    return isVisibleUp or isVisibleRight or isVisibleDown or isVisibleLeft


def solve() -> int:
    g = parse()
    num_visible = 0
    for row in range(len(g)):
        for col in range(len(g[0])):
            if is_visible(g, row, col):
                num_visible = num_visible + 1
    return num_visible


print(
    solve()
)
