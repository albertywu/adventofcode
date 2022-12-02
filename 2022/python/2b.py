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


def win(opponent):
    if opponent == 65:  # rock
        return 66  # paper
    elif opponent == 66:  # paper
        return 67  # scissors
    else:  # scissors
        return 65  # rock


def lose(opponent):
    if opponent == 65:  # rock
        return 67  # scissors
    elif opponent == 66:  # paper
        return 65  # rock
    else:  # scissors
        return 66  # paper


def draw(opponent):
    return opponent


required_move = {
    88: lose,
    89: draw,
    90: win,
}


def compute_move_score(move: Tuple[int, int]) -> int:
    opponent, outcome = move
    move = required_move[outcome](opponent)  # lose, draw, win
    shape_score = shape_scores[move]
    round_score = 0
    if opponent == move:
        round_score = 3
    elif move_beats[move] == opponent:
        round_score = 6
    return shape_score + round_score



def compute_score(moves: List[Tuple[int, int]]) -> int:
    total = 0
    for move in moves:
        total += compute_move_score(move)
    return total


print(compute_score(get_moves()))