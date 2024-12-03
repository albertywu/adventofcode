import re

def calculate_enabled_multiplications(content):
    # Regex to find instructions
    instruction_regex = r"(do\(\)|don't\(\)|mul\((\d{1,3}),(\d{1,3})\))"

    # Initialize
    enabled = True  # At the beginning, `mul()` instructions are enabled
    total = 0

    # Find all instructions
    instructions = re.findall(instruction_regex, content)

    for instruction, a, b in instructions:
        if instruction == "do()":
            enabled = True  # Enable future `mul()` instructions
        elif instruction == "don't()":
            enabled = False  # Disable future `mul()` instructions
        elif instruction.startswith("mul(") and enabled:
            total += int(a) * int(b)  # Multiply and add to total if enabled

    return total


# Read input
with open("3.in") as f:
    content = f.read()

# Calculate total
result = calculate_enabled_multiplications(content)
print(result)