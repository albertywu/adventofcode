

def get_calories():
    with open('1.in') as f:
        raw = f.read().strip().split("\n")
        cals = [[]]
        for line in raw:
            if line == "":
                cals.append([])
                continue
            last = cals[len(cals) - 1]
            last.append(int(line))
        return cals


def get_elf_calories():
    elf_calories = []
    for idx, cals in enumerate(get_calories()):
        elf_calories.append([idx, sum(cals)])
    return elf_calories


def get_top_three_elf_calories():
    ec = get_elf_calories()
    ec.sort(key=lambda x: x[1], reverse=True)
    return ec[0][1] + ec[1][1] + ec[2][1]


print(get_top_three_elf_calories())

