from path.path import Path
from path.point import Point
from pathfinding.dubins import plan_path_sec
import copy
from copy import deepcopy

def predict(points, vel, radius=0.005, tsp=True, wetzel=True, overlapping=True):
    if isinstance(points[0], Point):
        path = Path(points)
    elif isinstance(points, list):
        path = Path.from_list(coords=points)
    else:
        raise TypeError("Path can be initialized from list[Point] or list[list]")

    path_final = copy.deepcopy(path)
    path_final.optimize(path_final, radius=radius, tsp=tsp, wetzel=wetzel, n=2)

    if overlapping:
        path_final.remove_overlapping(radius)
        path_final.remove_straight_lines()

    path_final = plan_path_sec(path_final, vel)
    return path_final.get_coords_list()