// tracks histogram of differences
let diffs = {}
let level = 0
let adapters = input()
adapters.sort((a, b) => a - b)
const deviceJoltage = Math.max(...adapters) + 3

function processAdapters() {
  while (adapters.length > 0) {
    const head = adapters[0] // pick smallest
    const diff = head - level
    diffs[diff] = (diffs[diff] || 0) + 1
    level += diff
    adapters = adapters.slice(1)
  }
}

processAdapters(input(), 0, deviceJoltage)
diffs[3] = (diffs[3] || 0) + 1
console.log(diffs[1] * diffs[3])

function input() {
  return `71
30
134
33
51
115
122
38
61
103
21
12
44
129
29
89
54
83
96
91
133
102
99
52
144
82
22
68
7
15
93
125
14
92
1
146
67
132
114
59
72
107
34
119
136
60
20
53
8
46
55
26
126
77
65
78
13
108
142
27
75
110
90
35
143
86
116
79
48
113
101
2
123
58
19
76
16
66
135
64
28
9
6
100
124
47
109
23
139
145
5
45
106
41`
.split("\n")
.map(_ => Number(_))
}