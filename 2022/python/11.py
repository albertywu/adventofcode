import inspect as i


def parse(f):
    with open(f) as f:
        monkeys = {}
        current_monkey = None
        for line in f:
            line = line.rstrip()
            if line.startswith("Monkey"):
                monkey = {}
                _id = int(line[7])
                monkeys[_id] = monkey
                current_monkey = monkey
            elif line.startswith("  Starting"):
                monkey = current_monkey
                items = [int(s) for s in line.split(": ")[1].split(", ")]
                monkey["items"] = items
            elif line.startswith("  Operation"):
                monkey = current_monkey
                fstring = line.split("  Operation: new = ")[1]
                func = eval(f"lambda old: {fstring}")
                monkey["op"] = func
            elif line.startswith("  Test:"):
                monkey = current_monkey
                divBy = int(line.split("  Test: divisible by ")[1])
                monkey["divBy"] = divBy
            elif line.startswith("    If true: throw to monkey "):
                monkey = current_monkey
                divByTrue = int(line.split("    If true: throw to monkey ")[1])
                monkey["divByTrue"] = divByTrue
            elif line.startswith("    If false: throw to monkey "):
                monkey = current_monkey
                divByFalse = int(line.split("    If false: throw to monkey ")[1])
                monkey["divByFalse"] = divByFalse
        return monkeys


inspections = {}


# play a round, and mutates monkeys
def play_round(monkeys):
    for m in range(len(monkeys)):
        monkey = monkeys[m]
        items = monkey["items"]
        i = 0
        while len(items) > 0:
            inspections[m] = inspections.get(m, 0) + 1
            items[i] = monkey["op"](items[i])
            items[i] = items[i] // 3
            if items[i] % monkey["divBy"] == 0:
                # throw item to monkey
                monkeys[monkey["divByTrue"]]["items"].append(items[i])
                # remove item from items[i]
                del items[i]
            else:
                # throw item to monkey
                monkeys[monkey["divByFalse"]]["items"].append(items[i])
                # remove item from items[i]
                del items[i]


def monkey_business(inspections):
    vals = list(inspections.values())
    vals.sort()
    return vals[-1] * vals[-2]


def solveSample():
    monkeys = parse("11.in")
    for _ in range(1):
        play_round(monkeys)
    print(monkey_business(inspections))


solveSample()
