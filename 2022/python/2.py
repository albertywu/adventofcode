from typing import List, Tuple


shape_scores = {
    65: 1,
    66: 2,
    67: 3,
    88: 1,
    89: 2,
    90: 3,
}


move_beats = {
   65: 67,  # rock beats scissors
   66: 65,  # paper beats rock
   67: 66,  # scissor beats paper
}


def get_moves() -> list:
    with open('2.in') as f:
        moves = []
        lines = f.read().strip().split("\n")
        for line in lines:
            a, b = line.strip().split(" ")
            moves.append(
                (ord(a[0]), ord(b[0]))
            )
        return moves


def compute_move_score(move: Tuple[int, int]) -> int:
    opponent, mine = move
    shape_score = shape_scores[mine]
    offset = ord('X') - ord('A')
    mine = mine - offset
    round_score = 0
    if opponent == mine:
        round_score = 3
    elif move_beats[mine] == opponent:
        round_score = 6
    return shape_score + round_score


def compute_score(moves: List[Tuple[int, int]]) -> int:
    total = 0
    for move in moves:
        total += compute_move_score(move)
    return total


print(compute_score(get_moves()))