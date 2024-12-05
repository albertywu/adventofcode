with open('5.in') as f:
    rules, updates = f.read().split('\n\n')
    d = {}
    for rule in rules.split('\n'):
        a, b = map(int, rule.split('|'))
        if a not in d:
            d[a] = {b}
        else:
            d[a].add(b)

    result = 0
    for update in updates.split('\n'):
        pages = list(map(int, update.split(",")))
        valid = True

        for i, p in enumerate(pages[:-1]):  # no need to include the last page
            tail = pages[i+1:]
            if any(p in d.get(next, set()) for next in tail):
                valid = False
                break

        if valid:
            mid = len(pages) // 2
            result += pages[mid]

    print(result)