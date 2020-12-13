let paths = []
let adapters = input3()
adapters.sort((a, b) => a - b)

let target = adapters[adapters.length - 1] + 3
console.log(adapters, target)

function countAdapterArrangements(adapters, level, path = []) {
  for (const inc of [1, 2, 3]) {
    const nextLevel = level + inc
    // console.log(
    //   next === target ? '*' : '',
    //   'path', path, 'level', level, 'next', next, 'adapters', adapters
    // )
    if (nextLevel === target) {
      paths.push(path)
      return
    }
    const nextPath = [...path, nextLevel]
    if (adapters[1] === nextLevel) countAdapterArrangements(adapters.slice(1), nextLevel, nextPath)
    if (adapters[2] === nextLevel) countAdapterArrangements(adapters.slice(2), nextLevel, nextPath)
    if (adapters[3] === nextLevel) countAdapterArrangements(adapters.slice(3), nextLevel, nextPath)
  }
}

const result = countAdapterArrangements([0, ...adapters], 0)
console.log(paths.length)

function input3() {
  return `28
33
18
42
31
14
46
20
48
47
24
23
49
45
19
38
39
11
1
32
25
35
8
17
7
9
4
2
34
10
3`
.split("\n")
.map(_ => Number(_))
}

function input2() {
  return `16
10
15
5
1
11
7
19
6
12
4`
.split("\n")
.map(_ => Number(_))
}

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