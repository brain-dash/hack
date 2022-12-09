from path.point import Point
from path.path import Path
import math


def find_closest_points(path: Path, n=3):

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
            indexes.append(index)
            closest_points.append(points[index])
            distance[index] = math.inf
        result.append(closest_points)
        indexes.sort(reverse=True)

        for m in range(len(indexes)):
            del points[indexes[m]]
        i += 1
    return result

