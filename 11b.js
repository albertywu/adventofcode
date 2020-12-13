const answer = simulate(getSeats())
console.log(answer)

// main loop
// assumes that seatings eventually stabilize (run x will have same seatings as run x - 1)
function simulate(seats) {
  const observedSeatings = new Set() // Set<string>
  let nextSeatings = seats
  while (true) {
    nextSeatings = run(nextSeatings)
    const serializedNextSeatings = serialize(nextSeatings)
    if (observedSeatings.has(serializedNextSeatings)) return numOccupied(nextSeatings)
    observedSeatings.add(serializedNextSeatings)
  }
}

// seats: Array<Array<string>>
// return: Number
function numOccupied(seats) {
  let count = 0
  for (let row = 0; row < seats.length; row++) {
    for (let col = 0; col < seats[0].length; col++) {
      if (seats[row][col] === '#') count++
    }
  }
  return count
}

function copy(array2D) {
  const result = []
  for (let row = 0; row < array2D.length; row++) {
    result.push([...array2D[row]])
  }
  return result
}

// seats: Array<Array<string>>
// return: Array<Array<string>>
function run(seats) {
  const result = copy(seats)
  for (let row = 0; row < result.length; row++) {
    for (let col = 0; col < result[0].length; col++) {
      const visibleSeats = getVisible(seats, row, col)
      const isSeatEmpty = seats[row][col] === 'L'
      const isSeatOccupied = seats[row][col] === '#'
      const isNoOccupiedVisible = !visibleSeats.includes('#')
      const isFiveOrMoreVisibleOccupied = visibleSeats
        .filter(seat => seat === '#')
        .length >= 5
      if (isSeatEmpty && isNoOccupiedVisible) result[row][col] = '#'
      else if (isSeatOccupied && isFiveOrMoreVisibleOccupied) result[row][col] = 'L'
    }
  }
  return result
}

// seats: Array<Array<string>>
// return: string
function serialize(seats) {
  let result = ''
  for (let row = 0; row < seats.length; row++) {
    for (let col = 0; col < seats[0].length; col++) {
      result += seats[row][col]
    }
  }
  return result
}

function getVisible(grid, row, col) {
  const result = []
  for (let r of [-1, 0, 1]) {
    for (let c of [-1, 0, 1]) {
      if (r === 0 && c === 0) continue
      let nextCol = col + c
      let nextRow = row + r
      while (true) {
        if (grid[nextRow] == null) break
        if (grid[nextRow][nextCol] == null) break
        if (
          grid[nextRow][nextCol] === '#' ||
          grid[nextRow][nextCol] === 'L'
        ) {
          result.push(
            grid[nextRow][nextCol]
          )
          break
        }
        nextCol += c
        nextRow += r
      }
    }
  }
  return result
}

function getSeatsExample() {
  return `#.##.##.##
#######.##
#.#.#..#..
####.##.##
#.##.##.##
#.#####.##
..#.#.....
##########
#.######.#
#.#####.##`
.split("\n")
.map(line => line.split(''))
}

// parses input
// return: Array<Array<string>>
function getSeats() {
  return `LLLL.LLLLL.LLLLLLLLLLLLLLLL.L.LLLLLL.LLLL..L.LLLLLLLL.LLLLLL.LLLL..LLLLLLLLLLLLLLLLLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLLLLLLLLLLLLL.LLL.LLLLLLLLL.L..LLLLLLLL.LLLLLL.LLLLLLLLLLLLLLLLLLLLLL.LLLLLLLLLLLLLL
LLLLLLLLLL.LLLLLLLLLLL.LLLL.LLLLLLLL.LLLLLLLLLLLLLLLLLLLLLLL.LLLLL.LL.LLLL.LL.LLLLLLLLLLLLLLLLLLLL
LLL.LLLLLLLLLLL.LLLL.LLLLLLLLLL.LL.L.LLLLLLL.LLLLLLLL.LLLLLL.LLLLL.LLLLLLL.LLLLLLLL.LLLLL.LLLLLLLL
LLLLLLLLLL.LLLLLLLLLLLLLLLL.LLLL.LLL.LLLL.LLLLLLLLLLL.LLLLLLLLLLLL.LLLLLLL.LLLLLLLL.LLLLLLLLLLLLLL
LLLLLLLLLL.LLLLLLLLL.LLLLLLLLLLLLLLL.LLLLLLLLLLLLLLLLLLLLLLL.LLLLLLLLL.LLLLLLLLLLLL.LLLLLLLLLLLLLL
...L..LL.LL.LLL....L......L..L.....L.....L....L.LL.....LL..L.L...LL.L...LL..L.L...L.LL...L..LL..L.
LLLLLLLLLLLLLLLLLL.L.LLLLLL.LLLLLLLL.LLLLL.L.LLLLLLLLLLLLLLL.LLLLL.LLLLLLLLLL.LLLLL.LLLLLLLL.LLLLL
LLLLLLLLL.LLLLLLLLLL.LLLLLLLLLLLLLLL.LLLLLLL.LLLLLLLLLLLLLLL.LLLLL.LLLLLLL.LLLLLLLL.LLLLLLLLLLLLL.
LLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLL.LLLLLLLLLLLLLLLL.LLLLLLLLLLLL.LLLLLLL.LLLLLLLL.LLLLLLLLLLLLLL
LLLLLLLLLLLLLLLLLLLLLLLLLLL.L.LLLL.L.LLLLL.L.LLLLLLLL.LLLLLLLLLLLL.LLLLLLL.LLLLLLLL.LLLLL.LLLLLLLL
LLLLLLL..L.LLLLLLLL..LLL.LL.LLLLLL.L.LLLLLLL.LLLLLLLL.LLLLLL.LLLLL.LL.LLLL.LLLLLLLL.LLLL.LLLLLLLLL
...L..L.L.L......L....L.L..L...L.L..L.L...LL.LL....L...L........L.L.LLL....L..L..L...L.L..L..LL...
LLLLLLLLLL.LLLLLLLLLLLLLLLL.L.LLLLLL.LLLLLLL.LLLLLLLLLLLLLLL.LLLLL.LLLLLLLLLLLL.L.LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLLLLLL.LLLL.L.LLLLLLLLLLLLLLL..LLLLLLLL.LLLLLL.LLLLL.LLLLLLLLLLLLLLLL.LLLLLLLLLLLLLL
LLL.LLL.LL.LLLLLLLLL.LLLLL..LLLLLLLL.LLLLLLLLLLLLLLL..LLLLLLLLLLLL.LLLLLLL.LLLLLLLL.LLL.LLLLLLLLLL
.LLLLLLLLL.LL.LLLLLL.LLL.LLLLLLLLLLLLLLLLLLL.LLLLLLLLLLLLLLL.LLLLL.LLLLLLL.LLLLLLLL.LL.LLLLLLLLLLL
LLLLL.LLLLLLLLLLLLLL.LLLLLL.LLLLLLLL.LLLLLLLLLLLLLLLLLLLLLLL.LLLLL.LLLLLLL.LLLLLLLLLLLLLLLLLLLLLLL
.LLLLLLLLLLLLLLLLLLL.L.LLLL.LLLLLLLL.LLLLLLLLLLLLLLLLLLL..LL.LLLLLLLLLLLLL.LLLLLLLLLLLLLLLLLLLLLLL
L....LL.....L......LLL......L.LLL..L....L.L....L....LL.L.LL.LL........LL....L.L.L..LLLL.......L...
LLLLLLL.LLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLL.LLLLLLLLLLLLL.LLLLL.LLL.LLL.LLLLLLLL.LLLLLLLLLLLLLL
.LL..LL.LL.LLLLLLLLL.LL.LLLLLLLLLLLL.LLLLLLL.LLLLL.LLLLLLLLL.LLLLLLL.LLLLLLLLLLLLLLLLLLLLLLLLLLLLL
LLL.LLLLLLLLLLLLLLLL.LLLLLLLLLLLLLLLLLLLLLLL.LLLLL.LL.LLLLLL.LLLLL.LLLLLLL.L.LL.LLLLLLLLLLLLLLLLLL
LLLLLLLLLL..LLLLLLLL.LLLL.L.LLL.LLLLLLLLLLLL.LLLLLLLL.LLLLLL.LLLL..LLLLLLLLLL..LLLL.LLLLLLLLLLLLLL
LLL.LLLLLL.LLLLLLLLL.LLLLLL.LLLLLLL..LLLLLLL..LLLLLLL.LLLLLL.LLLLL.LLLLLLL.LLLLLLLLLLLLLLLLLLLLLLL
.LLLLLLLLLLLLLLLLLLL.LLLLLL.LL.LLLLL.LLLLLLLLLLLLLLLL.LLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLLLLLL.LL.LLL.LLLLLLLL.LLLLLLL.LLLLLLLL..LLL.L.LLLLL.LLLLLLL.LLLLLL...LLLLLLLLLLLLLL
LLL.LLLLLL.LLLLLLLLLLLLLLLL.LLLLLLLL.LLLLLLLLLLLLLLLLLLLLLLL.LLLLL.LLLLLLL.LLLLLLLL.LLLLLLLLL.LLLL
LLLL.LLLLL...LLLLLLLLLLL.LL.LLLLLLLL.LLLLLLL.LLLLLLLLLLLLLL..LLLLL.LLLLLLL..LLLLLLL.LLLLLLLLLLLLLL
..L...LLL........LL....L.....L.....L..L..L.....L.L.LL...L......LLLLL.L.L...........L.LL.....LL...L
LLLLLLLLLLLLLLLLLLLL.LLLLLL.LLLLLLLLLLLLLLLL.LLLLLLLL.LLLLLLLLLLLL.LLLLLLL.LLLLLLLL.LLLLLLLLLLLLLL
LLLLLLLLLL.L.LLL.LLL.LLLLLL.LLLLLLLL.LLLLL.LLLLLLLLLL.LLLLLLLLLLLL.LLLLLLLLLLLLLLLL.LLLLLLL.LLLLLL
LLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLL.LLLLLLL.LLLLLLLL.LLLLLL.LLLLL.LLLLLLL.LLLLLLLL.LLLLLLLLLL.LLL
LLLLLLLLLLLLLLLL.LLLLLLLLLL.LLLLLLLLLLLLL.LL.LL.LLLLLLLLLLLL.LLLLL.LLLLLLLLLLLL.LL.LLL.LLLLLLLLLLL
LLLLLLLLLL.LLLLLLLLLLLLLLLL.LLLLLLL...LLLLLLLLLLLLLLL.LLLLLL.LLLLL.LLLLLLL.LLLLLLLL.LLLLLLLLLLL.LL
LLLLLLL.LL.LLLLLLLLL.LLLLLLLLLLLLLLL.LLLLLLL..LLLLLLL.LLLLLL.LLLLL.LLLLLLL.LLLLLLLL.LLLLLLLLLLLLLL
....L..L.L.LL..LLL..L....LL...L.L..LL.L......L...LLL.L.L.L.....L.......L......LL.....L..L.L..LL...
LLLLLLLLLL.LLLLLLLLL.LLLLLL.LLLLLLLL.LLLLLL.LLLLLLLLLLLLLLLLLLLLLL.LLLLLLL.LLLLLLL.LLLLLLLLLLLLL.L
LLLLLLLLLL.LLLLLLLLL.LLLL.L.LLL.LLLL.LLLLLLL.LLLLLLLLLLLLLLL.LLLLL.LLLLLLLLLLLLLLLL.LLLLLLLLLLLLLL
LLLLLLLLLLLLL.LLLLLL.LLLLLLLLLLLLLL...LLLLLL.LLLLLLLLLLLLLLLLLLLLL.LLLLLLLLLLLLLLLL.LLLLLLLLLLLLLL
LLLLLLLLLL.LLLLLLLLLLLL.LLLLLLLLL..LLLLLLLLLLLLLLLLLL.LLLLLLL.LLLL.LLLLLLL.LLLLLLLL.LLL.LLLLLLLLLL
LLLLLLLLLL.L.LLLLLLL.LLLLLLLLLLLLLLLLLLLLLLL.LLLL.LLL.LLLLLL.LLLLLLLLLLLLLLLLLLLLLL.LLL.LLLLLLLLLL
LL.LLLLLLL.LLLLLLLLL.LLLLLL.LLLLLLLL.LLLLLLLL.LLLLLLL.LLL.LL.LLLLL.LLLLLLL.LLLLLLLL.LLLLLLLLLLLLLL
..LL.LLL...LLL.....L.L.L......L......L........L.LL......LLL..LL..L..L.LLL..LL..LL.L.....L.LL....L.
LLLLLLLLLL.LL.LLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLL.LLLLLLLLLLLLLLLLLLLL.LLLLLLLL..LLLL.LLLLLLLL
LLLLLLLLLL.LLLLLLLLLLLLLLLL.LLLLLLLL.LLLLLLLLLLLLL.LL.LLLLLL.L.LLLLLLLLL.L.LLLLL.LL.L.LLLLLLLLLLLL
LLLLLLLLLL.LLLLLLLLL.LLLLLLLL.LLLLLL.LLLLLLLLLLLLLLLL.LLLLLL.LLLLL.LLLLLLL.LLLLLLLL.LLLLLLLLLLLLLL
LLLLLLLLL.LLLLLLLLLLLLLLLLL.LLLLLLLLLLLLLLLL.LLLLLLLLLLLLL.LLLLLLL.LLLLLLL.LL.LLLLL.LLLLLLLLLLL.LL
LLLLLLLLLLLLLLLLLLLL.LLLLLLLL.LLLLLLLLLLLLLLLLLLL.LLLLLLLLLL.LLLLL.LLL.LLL.LLLLL.LL.LLLLLLLLLLLLLL
L..L..LL..LLL...L......L.....L...LL..L..L.....L.L...LL......L.L.LLL.L..L....L....L...L.L........LL
LLLLLLLLLL.LLLLLLLLLLLLLLLLLLLL.LLLL.LLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLL.LLLLLLL..LLLLLLLLLLLLLL
LLLLLL.LLL.LLLLLLLLL.LLLLLLLLLLLLLLL.L.LL.LLLLLLLLLLLLLLLLLL.LLLLLLLLLLLLLLLLLLLLLL.LLLLL.LLLLLLLL
L.LLLLLLLL.LLLLLLLLLLLLLLLL.LLLLLLLL.LLLLLLLLLLLLLLLL.LLLL.L.LLLLL.LLLLLLLLLLLLLLLL.LLLLLLLLLLLLLL
LLLLLLLLLL.LLL.LL.LL.LLLLLLLLL.LL.LL.LLLLLLLLLLLLLLLL.LLLLLLLLLLLLLLLLLLLL.LLLLL.LL.LLLLLLLLLLLLLL
LL.LLLLLLLLLLLLLL.LL.LLLLLLLLLLLLLL..LLLLLLLLLL.LLL.L..LLLLL.LLLLL..LLLLLL.LLLLLLLLLLLLLLLLLLLLLLL
LLLLLLLLLLLLLL.LLLLLLLLLLLL.LLLLLLLL.LLL.LLLLLLLLLLLL.LLLLLL.LLLLL.LLLLLLL..LLLLLLL.LLLLLLLLLLLLLL
LLLLLLLLLL.LLL.LLLLL.LL.LLLLLLLLLLLL.LLLLLLL.LLLLLLLL.LLLLLL.LLLLL.LLLLLLL.LLL.LL.L.LLLLLLL.LLL.L.
LLLLLLLLLLLLLLLLLLLL.LLLL.LLLLLLLLLL.LLL.LLL.LLLLLLLL.LLLLLL.LLLLLLLLLLLLLLLLL.L.LL.LLLLLLLLLL.LLL
..L....L....L....L........L...L....L..LL.L.L..L.LLLL.L.LLL...L...L..LL..L...L....L....L.......L.L.
LLLLLLLLLL..LLL.LLLLLLLLLLL.LLLLLLLL.LLL.LLL..LLLLLLL.LLLLLL.LLLLL.LLLLLLLLLLLLLLL..LL..LLLLLLLLLL
LLLLLLLLLL.LLLLLLLLL.LLLLLLLLLLLLLLL.LLLLLLL.LL.LLLLL.LLLLLL.LLLLLLLLLLLL..LLLLLLLLLLLLLLLLLLLLLLL
LLLLLLLLL.LLLLLLLLLLLLLLLLL..LLLLLLL.LLLLLLLLLLLLLLLL.LLLLLL.LLLLL.LLLLLLLLLLLLLLLL.LLLL.LLLLLLLLL
LLLLLLLLLL.LLLLLLLLL.LLLLLL..LLLLLLL..LLLLLL.LL.LLLLLLLLLLLL.LLLLL.LLLLLLL.LLLLLLLLLLLLLLLLLLLLL.L
L.LLLLLLLL.LLLLLLLLL.LL.LLL.LLLLLLLLLLLLLLL..LLLLLLLLLLLLLLL.LLLLL.LLLLLLL.LLLLLLLL.LLLLLLLLLLLLLL
LLLLLLLLLL..LLL.LLLLLLLLLLLLLLLLLLLL.LLLLLL.LLLLLLLLL.LLLLL..LLLLL.LLLLLLL.LLLLLLLLLLLLLLLLLLLLLLL
L.....L..LLL.....LL.L..L..LL....LLLLL.LL..L.......L...LL.....LL...L...........L.....L.L..L.....L.L
LLLLLLLLLL.LLL.LLLLL.LLLLLL.LLLLLLLL.LLLLLLL.LLLLLLLLL.LLLL..LLL.LLLLLLLLL.LLLLLLLLLLLLL.LLLLLLLLL
LLLLLLLLLL..LLLLL.LL.LLLLLL.LLLLLLLLLLLLLLLL.LLLLLLLL.LLLLLL.LLLLLLLLLLLLL.LLLLLLLL.LLLLLLLLLLLLLL
LLLLLLLLLL.LLLLLLLLL.LLLLLL.LLLLLLLL.LLLLLLL.LLLLLLLL.LLLL.L.LLL.LLLLLLLLL.LLLLLLLL.LLLLLLLLLLLLLL
LLLLLLLLLL.LLLLLLLLLLLLLLLL.LLLLLLLL.LLLLLLL.LLLLLLLL.LLLLLL.LLLLL.LLLLLLL.LLLL.LL.LLLLLLLLLLLLLLL
LLLLL.LLLL.LLLLLLL.LLLLLLLL.LLLLLLLL.LLLLLLLLLLLLLLL.LLLLLLL.LLLL..LLLLLLL.LLLLLLLL.LLLLLLLLLLLLLL
LLLLLLLLLLLLLLLLLLLL..LLLLL.LLLLLLLLLLLLLLLLLLLLLLLLL.LLLLLL.LLLLL.LLLLLL..LLLLLLLL.LLLLLLLLLLLLLL
........LLLLLL.LL.L..L...L...LLL....L.......LLLL..L.LL.L..L.L.LLL...L...L.......L..L.....L.L.L..LL
LLLLLLLLLL.LLLLLLLLLLLLLLLL.LLLLLLLLLLLLLLLLLLLLLLLLL.LL.LLL..LLLL.LLLLLLL.LLLLLLLLLLLLLLLLLLLLLLL
LLLLLLLLLL.LLLLLLLLL.LLLLLL.LLLLLLLLLLLLLLL..LLLLLLLL.LLLLLLLLLLLLLLLLLLLLLLLLLLLLL.LLL.LLLLLLLLLL
L.LLLLL.LLLLLLLLLLLL.LLLLLL.LLLLLLLLLLL.LLLL.LLL.LLLLLLLLLLL.LLLLLLLLLLLLL.LLLLLLLL.LLLLL.LLLLLLLL
LLLLLL.LLL.LLLLLLLLLLLLL.LLLLLLLLLLL.LLLLLLL.LLLLLLLL.LLLLLLLLLLLL.LLL.L.L.LLLLLLLL.LLLLLLLLLLLLLL
LLL.LLLLLL.LLLLLLLLLLLLLLLL.LLLLLLLL.LLLLLLLLLLLLLLLL.LLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLLLLLLL.LLLLL.LLLLLLL.LLLLL.LL.LLLLLLLLLLLLLLLLLLLLL.LLLLLLL..LLLLLLL.LLLLLLLLLLLLLL
..LL..L....L.......L....L....LL...L.L..L.........LL..L..LL.L....LLL.L.LLL...L.....LL.....LL.LL....
LLLLLLLLLL.LLLLLL.LL.LLLLLLLL..LLLLL.LLLLLLLLLLLLLLLL.LLLLLL.L.LLLLLLLLLLL.LLLLLLLL.LLLLLLLLLL.LLL
L.LLLLLLLLLLLL.LLLLLLLLLLLL.LLLLLLLLLLLLLLLL.LLLLL.LL.LLLLLL.LLLLL.LLLLLLL.LLLLL.LLLLLLLLLL.LLLLLL
LLLLLLLLLL.LLLLLLLLL.LLL.LL.LLLLLLLL.L.LLLLLLLLLLLLLLLLLLLLL.L.LLL.LLLLLLL.LLLLLLLL.LLLLLLLLLLLLL.
LLLLLLLLLLLLLLLLLL.LLLLLLLL.LLLLLLLLLLLLLLLL.LLLLLLL.LLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLL.LLLLLLLLL
LLLLL.LLLL.LLLLLLLLL.LLLLLL.LLLL.LLL..LLLLLL.LLLLLLLLLLLLLLL.LLLLL.LLLLLLLLLL.LLLLL.LLLLLLLLLLLLLL
LLLLLLLLLLLLLLLLLLLL.LLLLLL.LLLLLLLLLLLLLL.LLLLLLLLLL.LLLLLL.LLLLL.LLLLLLL.LLLLLLLL.LLLLLLLLL.LLLL
LLLLLLLLLLLLLLLLLLLLLLLLL.LLLLLLLLLL.L.LLLLLLLLLLLLLL.LLLLLL.LLLLL.LLLLLLLLLLLLLLLL.LL.LLLLLLLLLLL
.L.L....L........L....LL...L...L...L..L.............LL.LL..L.L.L...LL.......LLL.......LLL.L.L.L..L
LLLLLLLLLL.LLLLLLLLLLLLLLLL.LLLLL.LL.LLLLLLLLLLLLLL.L.LLLLL..LLLLL.LLLLLLL.LLLLLLLL.LLLL.LLLLLLLLL
LLLLLLLLLLLLLLLLLLLL.LLLLLLLLLLLLLLL.LLLLLLLLLLLLLLLLL.LLLLLLLLLLLLL.LLLLL.LLLLLLLL.LLLLLL.LLLLLLL
LLLLLLLLLL..LLLLLLLL.LLLLLL..LLLLLLL.LLLLLLLLLLLLLLLL.LLLLLL.LLLLL.LLLLLLL.LLLLLLLLL.LLLLLLLLLLLLL
LLLLLLLLLL.L.LLLLLLL.LLLLLLLLLLLLLL.LLLLLLLL.LLL.LLLL.LLLLLLLLL.LLLLLLLLLLLLLLLLLLL.LLLLL.LLLLLLLL
LLLLL.LLLLLLLLLLLLLL.LLLLLL.LLLLLLLL.LLLLLLLLLLLLLL.L.LLLLLL.LLLLL.LLLLLLL.LLLLLLLL.L.LLLLLLLLLLLL`
.split("\n")
.map(line => line.split(''))
}