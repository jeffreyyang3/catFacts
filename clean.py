import re
import json
filepath = 'facts.txt'
out = []
with open(filepath) as fp:
    line = fp.readline()
    while line:
        if not re.match(r'^\s*$', line):
            out.append(line.rstrip())
        line = fp.readline()

for fact in out:
    print(fact)

asdf = json.dumps(out)
print(asdf)
