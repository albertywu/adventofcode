const range = '193651-649729'
console.log(
  hasExactPair(112233)
) // truee
console.log(
  hasExactPair(123444)
) // false
console.log(
  hasExactPair(111122)
) // true
console.log(
  filterNumbers(
    parseRange(range)
  ).length
) // 1605

function filterNumbers(numbers) {
  return numbers
    .filter(hasExactPair)
    .filter(monotonicallyIncreasing)
}

function hasExactPair(number) {
  const nums = [...String(number)]
  let [last, length] = [nums[0], 1]
  for (let i = 1; i < nums.length; i++) {
    if (nums[i] === last) {
      length++
      if (nums[i] !== nums[i + 1] && length === 2) return true
    } else {
      length = 1
    }    
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
