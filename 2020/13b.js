/*
7: [true, false, false, false, false, false, false, true, false, ...]
13: [true, false, false, false, false, false, false, false, false, ...]
...
*/

// const {ids, offsets} = getBusIds()
// console.log(ids, offsets)
const {ids, offsets} = getBusIds()
console.log(ids, offsets)
const result = findFirstTimestamp(ids, offsets)
console.log(result)

function findFirstTimestamp(busIds, offsets) {
  const departures = getDepartures(busIds)
  for (let i = busIds[0]; i < 1000000; i += busIds[0]) {
    let isMatch = true
    for (let j = 0; j < busIds.length; j++) {
      if (!departures[j][i + offset[j]]) isMatch = false
    } 
    if (isMatch) return i
  }
}

function getDepartures(busIds) {
  busIds.sort((a, b) => a - b)
  const result = []
  for (const id of busIds) {
    console.log(id)
    process.exit(0)
    const busSchedule = []
    for (let i = 0; i < 500000; i++) {
      busSchedule.push(i % id === 0)
    }
    result.push(busSchedule)
  }
  return result
}

function getBusIds() {
  const lines = `1000390
23,x,x,x,x,x,x,x,x,x,x,x,x,41,x,x,x,x,x,x,x,x,x,383,x,x,x,x,x,x,x,x,x,x,x,x,13,17,x,x,x,x,19,x,x,x,x,x,x,x,x,x,29,x,503,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,37`
.split("\n")
  const ids = lines[1].split(",").filter(_ => _ !== 'x').map(_ => Number(_))
  ids.sort((a, b) => a - b)

  const offsets = []
  let runningSum = 0
  const chars = lines[1].split(",")
  for (let idx = 0; idx < chars.length; idx++) {
    const c = chars[idx]
    if (c !== 'x') {
      offsets.push(runningSum)
      runningSum = 1
    }
    else runningSum += 1
  }

  return {
    ids,
    offsets
  }
}