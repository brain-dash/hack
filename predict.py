import copy

from path.path import Path
from path.point import Point
from pathfinding.dubins2 import plan_path_sec
from copy import deepcopy

def predict(points, radius=0.01, tsp=True, wetzel=True):
    # curvature = 600.
    # radius = 0.005

    if isinstance(points[0], Point):
        path = Path(points)
    elif isinstance(points, list):
        path = Path.from_list(coords=points)
    else:
        raise TypeError("Path can be initialized from list[Point] or list[list]")

    path_final = copy.deepcopy(path)
    path_final.optimize(path_final, radius=radius, tsp=tsp, wetzel=wetzel, n=2)

    path_final.remove_straight_lines()

    path_final = plan_path_sec(path_final)

if __name__ == '__main__':

    test_coords1 = [[55.763290828800116, 37.5909048461914],
                    [55.769484573498744, 37.59536804199218],
                    [55.77180697300689, 37.601547851562486],
                    [55.772581075298376, 37.608929290771464],
                    [55.77296812065462, 37.625408782958964],
                    [55.772097263175425, 37.631073608398424],
                    [55.76803300324382, 37.649956359863275],
                    [55.7656135988627, 37.65218795776366],
                    [55.7545792033592, 37.65253128051755],
                    [55.75206214770929, 37.65304626464842],
                    [55.743832173569864, 37.64858306884763],
                    [55.755063233822455, 37.61184753417968],
                    [55.77519355655238, 37.68669189453122],
                    [55.78525480417483, 37.63519348144529],
                    [55.760871128879174, 37.602406158447245],
                    [55.75699929535349, 37.721195831298814],
                    [55.73259786601311, 37.63673843383786],
                    [55.74412267292747, 37.594338073730455],
                    [55.761742238221835, 37.59056152343748],
                    [55.783900557411606, 37.59794296264646],
                    [55.7733551621512, 37.67862380981443],
                    [55.7521873085031, 37.616165931893846],
                    [55.757898835331346, 37.61050110645441],
                    [55.74744319859523, 37.608269508554],
                    [55.73219231337294, 37.60286565566359],
                    [55.70845375895499, 37.62312169814407],
                    [55.730933080633214, 37.65007253432571],
                    [55.76453092343249, 37.6603722169429],
                    [55.75320579095923, 37.67462011123003],
                    [55.763272738479166, 37.68285985732376],
                    [55.757465202629234, 37.59016271376907],
                    [55.76598262463785, 37.58123632216752]]

    predict(test_coords1)