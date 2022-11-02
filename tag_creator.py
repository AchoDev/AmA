import json, random
list = []

for i in range(30):
    list.append({
        "name": f"page{i}",
        "type": "page"
    })

# print(json.dumps(list, sort_keys=True, indent=4))

# print(jsonInput)

with open("tags.json", "r") as f:
    content = f.read()
    
content = json.loads(content)

def ten_digit_generator():
    number = ""

    for _ in range(10):
        number += str(random.randint(0, 9))

    return number

for tag in content:
    tag["id"] = ten_digit_generator()


print(json.dumps(content, sort_keys=True, indent=4))
