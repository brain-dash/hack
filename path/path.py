from __future__ import annotations
import math
import numpy as np
from path.point import Point
from path.vector import Vector


class Path:
    def __init__(self, *args):
        if len(args) == 0:
            self._points = []
            self._vectors = []
        else:
            points_temp = args[0]
            self._points = points_temp
            self.start = points_temp[0]
            self.finish = points_temp[len(points_temp) - 1]
            if len(points_temp) > 1:
                self.create_vectors()

    def append(self, point: Point):
        self._points.append(point)
        self.create_vectors()

    def append(self, coords: list):
        self._points.append(Point(coords=coords))
        self.create_vectors()

    def extend(self, points: list[Point]):
        self._points.extend(points)
        self.create_vectors()

    def pop(self):
        self._points.pop()

    def x(self):
        path_x = []
        for i in range(len(self._points)):
            path_x.append(self._points[i].x)
        return path_x

    def y(self):
        path_y = []
        for i in range(len(self._points)):
            path_y.append(self._points[i].y)
        return path_y

    def create_vectors(self):
        if len(self._points) > 1:
            vectors = []
            for i in range(len(self._points) - 1):
                vectors.append(Vector(self._points[i], self._points[i + 1]))
            self._vectors = vectors

    def begin_vec(self):
        return self._vectors[0]

    def end_vec(self):
        return self._vectors[len(self._vectors) - 1]

    def get_angles(self):
        angles = []
        for vec in self._vectors:
            angles.append(np.rad2deg(vec.direction))
            # angles.append(vec.direction)
        return angles

    def __len__(self):
        return len(self._vectors)

    def __getitem__(self, key):
        return self._vectors[key]

    @property
    def points(self):
        return self._points

    @staticmethod
    def from_list(coords: list):
        points = []
        for i in range(len(coords)):
            points.append(Point(coords=coords[i], id=i))
        path = Path(points)
        return path

    def optimize_path(self, path: Path):
        from pathfinding.tsp import find_shortest_path
        permutation = find_shortest_path(path)
        self._points = Path.create_permutation(path, permutation)
        print(path.get_angles())
        self.create_vectors()
        print(path.get_angles())

    @staticmethod
    def create_permutation(path: Path, permutation: list):
        points_optimized = []

        for i in range(len(permutation)):
            points_optimized.append(path.points[permutation[i]])

        for el in path.points:
            print(el.x, end=", ")
        print()
        for el in points_optimized:
            print(el.x, end=", ")
        print()

        return points_optimized
