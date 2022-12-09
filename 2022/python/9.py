with open("9.in") as f:
    inp = f.read().strip()


def update(head, tail, dx, dy):
    head = (head[0] + dx, head[1] + dy)
    tail = update_tail(head, tail)
    return head, tail


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
    head = (0, 0)
    tail = (0, 0)
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
            head, tail = update(head, tail, dx, dy)
            print(head, tail)
            tail_visits.add(tail)

    print(tail_visits)
    print(len(tail_visits))

solve()