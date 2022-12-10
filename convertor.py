import json
from pprint import pprint

data = '''{
        "uav_id":"123",
        "isgg":false,
        "route_name":"123",
        "route":[
            [[44.95455650142703,37.291705470825164],false],
            [[44.96104672981214,37.29719863488768],false],
            [[44.952271033814505,37.30350719049069],false],
            [[44.949772151035155,37.29861484124754],false],
            [[44.950625440396735,37.29659782006834],false]]} '''
data = json.loads(data)
coord = [x[0] for x in data['route']]
pprint(coord)

