import numpy as np
from python_tsp.distances import great_circle_distance_matrix
from python_tsp.exact import solve_tsp_dynamic_programming

from path.vector import Vector
from path.path import Path


def find_shortest_path(path: Path):
    distance_m = distance_matrix(path)
    distance_arr = np.array(distance_m)
    # distance_arr[:, 0] = 0 #open path tsp

    # print(distance_arr)
    permutation, distance = solve_tsp_dynamic_programming(distance_arr)
    return permutation


def distance_matrix(path: Path):
    n = len(path.points)
    distance_m = [[0]*n for i in range(n)]
    for i in range(n):
        for j in range(n):
            distance_m[i][j] = Vector.calc_length(path.points[i], path.points[j])
    return distance_m


