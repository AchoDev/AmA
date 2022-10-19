import json
list = []

for i in range(30):
    list.append({
        "name": f"page{i}",
        "type": "page"
    })

print(json.dumps(list, sort_keys=True, indent=4))