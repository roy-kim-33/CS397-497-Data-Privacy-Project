import pandas as pd
from pprint import pprint
df = pd.read_csv('sheet.csv')

counter = {}
for i in range(len(df)):
    if df.loc[i].domain in counter:
        counter[df.loc[i]['domain']] += int(df.loc[i]['count'])
    else:
        counter[df.loc[i]['domain']] = int(df.loc[i]['count'])
# pprint(counter)
pprint(sorted(counter.items(), key=lambda x: x[1]))
print(sum(counter.values()))
# print(type(df.loc[0]['count']))
# print(df.iloc[0])
# print(len(df))