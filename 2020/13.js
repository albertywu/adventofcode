const {timestamp, busIds} = getTimestampAndBusIds()
const {
  earliestTimestamp,
  earliestBusId
} = getEarliest(timestamp, busIds)
console.log((earliestTimestamp - timestamp) * earliestBusId)

function nextTimestamp(fromTimestamp, busId) {
  return fromTimestamp - (fromTimestamp % busId) + busId
}

function getEarliest(fromTimestamp, busIds) {
  let earliestTimestamp = Infinity
  let earliestBusId = null
  for (const busId of busIds) {
    const next = nextTimestamp(fromTimestamp, busId)
    console.log(next, busId)
    if (next < earliestTimestamp) {
      earliestTimestamp = next
      earliestBusId = busId
    }
  }
  return {
    earliestTimestamp,
    earliestBusId
  }
}

function getTimestampAndBusIds() {
  const lines = `1000390
23,x,x,x,x,x,x,x,x,x,x,x,x,41,x,x,x,x,x,x,x,x,x,383,x,x,x,x,x,x,x,x,x,x,x,x,13,17,x,x,x,x,19,x,x,x,x,x,x,x,x,x,29,x,503,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,37`
.split("\n")
  const timestamp = Number(lines[0])
  const busIds = lines[1].split(",").filter(_ => _ !== 'x').map(_ => Number(_))
  return {
    timestamp, 
    busIds
  }
}