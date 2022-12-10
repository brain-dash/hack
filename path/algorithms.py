from path.point import Point
from path.vector import Vector
from path.path import Path
import math


def find_closest_points(path: Path, radius, n):

    result = []
    points = list(path.points)

    i = 0
    while len(points) > 0:
        if i >= len(points) - 1:
            i = 0

        distance = []
        for j in range(len(points)):
            distance.append(Point.dist(points[i], points[j]))
            if len(points) <= 1:
                break

        closest_points = []
        indexes = []
        number = n

        if n > len(points):
            number = len(points)
        for k in range(number):
            index = distance.index(min(distance))
            if distance[index] > radius:
                distance[index] = math.inf
            else:
                indexes.append(index)
                closest_points.append(points[index])
                distance[index] = math.inf
        result.append(closest_points)
        indexes.sort(reverse=True)

        for m in range(len(indexes)):
            del points[indexes[m]]
        i += 1
    return result


def turn_radius1(speed,  g):
    return math.pow(speed, 2) / g


def generate_curvature(path: Path, speed, g):
    # g *= 9.8
    turn_radius = math.pow(speed, 2) / g
    curvature_list = []
    for i in range(len(path)):
        curvature_list.append(turn_radius)

    return curvature_list





