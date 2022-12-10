with open("9.in") as f:
    inp = f.read().strip()


# a rope consists of a list of tuples.
# the first tuple is the head of the rope, and the last tuple is the tail of the rope
def update(rope, dx, dy):
    # update head
    rope[0] = (rope[0][0] + dx, rope[0][1] + dy)
    # update everything after head
    for idx in range(1, len(rope)):
        prev = rope[idx - 1]
        rope[idx] = update_tail(prev, rope[idx])
    return rope


def update_tail(head, tail):
    is_connected = abs(head[0] - tail[0]) < 2 and abs(head[1] - tail[1]) < 2
    if is_connected:
        return tail
    elif head[0] - tail[0] >= 2:
        return head[0] - 1, head[1]
    elif tail[0] - head[0] >= 2:
        return head[0] + 1, head[1]
    elif head[1] - tail[1] >= 2:
        return head[0], head[1] - 1
    elif tail[1] - head[1] >= 2:
        return head[0], head[1] + 1
    else:
        raise Exception("rope broke (this should nt happen)!")


def solve():
    rope_length = 10
    rope = []
    for i in range(0, rope_length):
        rope.append((0, 0))
    tail_visits = set()

    for line in inp.split("\n"):
        [d, cnt] = line.split(" ")
        cnt = int(cnt)
        dx, dy = 0, 0
        if d == "R":
            dx, dy = 1, 0
        elif d == "L":
            dx, dy = -1, 0
        elif d == "U":
            dx, dy = 0, 1
        elif d == "D":
            dx, dy = 0, -1
        for i in range(cnt):
            rope = update(rope, dx, dy)
            tail_visits.add(rope[len(rope) - 1])

    print(len(tail_visits))

solve()