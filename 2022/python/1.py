
def get_calories() -> list:
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


def get_elf_calories() -> dict:
    elf_calories = {}
    for idx, cals in enumerate(get_calories()):
        elf_calories[idx] = sum(cals)
    return elf_calories


def get_most_calories() -> int:
    ec = get_elf_calories()
    most = -1
    for elf in ec:
        if ec[elf] > most:
            most = ec[elf]
    return most


print(get_most_calories())
