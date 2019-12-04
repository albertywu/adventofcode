// https://adventofcode.com/2019
// Day 2

const input = [
  1,0,0,3,1,1,2,3,1,3,4,3,1,5,0,3,2,1,9,19,1,19,5,23,2,23,13,27,1,10,27,31,2,31,6,35,1,5,35,39,1,39,10,43,2,9,43,47,1,47,5,51,2,51,9,55,1,13,55,59,1,13,59,63,1,6,63,67,2,13,67,71,1,10,71,75,2,13,75,79,1,5,79,83,2,83,9,87,2,87,13,91,1,91,5,95,2,9,95,99,1,99,5,103,1,2,103,107,1,10,107,0,99,2,14,0,0
]

input[1] = 12
input[2] = 2

function process(input, returnIdx=0) {
  let idx = 0
  while (input[idx] !== 99) {
    // increment idx, following algorithm
    // 1 => add numbers at i + 1, i + 2 and store in i + 3
    // 2 => mult numbers at i + 1, i + 2 and store in i + 3
    // 99 => halt
    if (input[idx] === 1) {
      input[input[idx + 3]] = input[input[idx + 1]] + input[input[idx + 2]]
    } else if (input[idx] === 2) {
      input[input[idx + 3]] = input[input[idx + 1]] * input[input[idx + 2]]
    }
    idx += 4
  }
  return input[returnIdx]
}

console.log(
  process(input) // 3895705
)