const range = '193651-649729'
console.log(
  filterNumbers(
    parseRange(range)
  ).length
) // 1605

function filterNumbers(numbers) {
  return numbers
    .filter(hasConsecutive)
    .filter(monotonicallyIncreasing)
}

function hasConsecutive(number) {
  const nums = [...String(number)]
  let last = nums[0]
  for (let i = 1; i < nums.length; i++) {
    if (nums[i] === last) return true
    last = nums[i]
  }
  return false
}

function monotonicallyIncreasing(number) {
  const nums = [...String(number)].map(Number)
  let last = nums[0]
  for (let i = 1; i < nums.length; i++) {
    if (nums[i] < last) return false
    last = nums[i]
  }
  return true
}

function parseRange(range) {
  const [from, to] = range.split('-').map(Number)
  let result = []
  for (let i = from; i <= to; i++) {
    result.push(i)
  }
  return result
}
