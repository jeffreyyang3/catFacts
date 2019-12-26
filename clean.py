import re
import json
import psycopg2
filepath = 'facts.txt'
out = []
with open(filepath) as fp:
    line = fp.readline()
    while line:
        if not re.match(r'^\s*$', line):
            out.append(line.rstrip())
        line = fp.readline()

try:
    connection = psycopg2.connect(
        user="me",
        password="cool",
        host="localhost",
        port=5432,
        database="api"
    )

    values = ""
    for fact in out:
        if len(fact) > 100:
            continue
        values += "('{}'),".format(fact)
    values = values[:-1] + ";"

    cursor = connection.cursor()
    query = "insert into facts (fact) values " + values

    print(query)
    cursor.execute(query)
    connection.commit()

except (Exception, psycopg2.Error) as error:
    print("error connection to psql :", error)
finally:
    if(connection):
        cursor.close()
        connection.close()
        print("Connection closed")


# for fact in out:
#     print(fact)


# with open('facts.json', 'w') as outfile:
#     json.dump(out, outfile)
