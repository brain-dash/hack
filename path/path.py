from __future__ import annotations
import math
import numpy as np
from path.point import Point
from path.vector import Vector
from path.circle import Circle


class Path:
    def __init__(self, *args):
        if len(args) == 0:
            self._points = []
            self._vectors = []
        else:
            points_temp = args[0]
            self._points = points_temp
            self.update_start()
            self.update_finish()
            if len(points_temp) > 1:
                self.create_vectors()

    def append(self, point: Point):
        self._points.append(point)
        self.update_finish()
        self.create_vectors()

    def append(self, coords: list):
        self._points.append(Point(coords=coords))
        self.update_finish()
        self.create_vectors()

    def extend(self, points: list[Point]):
        self._points.extend(points)
        self.update_finish()
        self.create_vectors()

    def pop(self):
        self._points.pop()

    def update_start(self):
        self.start = self._points[0]
        self.start.type = 'start'
    def update_finish(self):
        self.finish = self._points[len(self._points) - 1]
        self.finish.type = 'finish'

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

    def get_coords_list(self):
        coords_list = []
        for i in range(len(self._points)):
            coords_list.append(self._points[i].list())
        return coords_list

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

    def optimize_tsp(self, path: Path, coordinates=True, openpath=False):
        from pathfinding.tsp import find_shortest_path
        permutation = find_shortest_path(path, coordinates, openpath)
        self.create_permutation(permutation)

    def optimize_wetzel(self, path: Path, radius, n):
        from path.algorithms import find_closest_points
        from pathfinding.wetzel import welzl
        points_groups = find_closest_points(path, radius, n)

        new_points: list[Point] = []
        for group in points_groups:
            circle: Circle = welzl(group)
            new_points.append(Point(x=circle.center.x,
                                    y=circle.center.y))

        self._points = new_points

    def optimize(self, path: Path, radius=0, n=3, tsp=True, wetzel=True, coordinates=True, openpath=False):
        if wetzel:
            self.optimize_wetzel(path, radius, n)
        if tsp:
            self.optimize_tsp(path, coordinates, openpath)
        self.create_vectors()


    def create_permutation(self, permutation: list):
        points_optimized = []
        finish = Point()
        for i in range(len(permutation)):
            point = self._points[permutation[i]]
            if point.type == 'start':
                points_optimized.insert(0, point)
            elif point.type == 'finish':
                finish = point
            else:
                points_optimized.append(point)
        # points_optimized.append(finish)
        self._points = points_optimized
        self.create_vectors()

    def remove_straight_lines(self, iterations=1):
        for j in range(iterations):
            for i in range(len(self._vectors) - 1):
                if i >= len(self._vectors) - 1:
                    break
                angle_between = Vector.angle(self._vectors[i], self._vectors[i + 1])
                if 0 <= angle_between <= 15:
                    del self._points[i + 1]
                self.create_vectors()

    def remove_overlaping(self, radius, iterations=1):
        for j in range(iterations):
            new_points = []
            for i in range(len(self._points) - 1):
                if i >= len(self._points) - 1:
                    break
                c1 = Circle(self._points[i], radius)
                c2 = Circle(self._points[i + 1], radius)
                p1, p2, is_found = c1.intersection(c2)

                if is_found:
                    self._points[i] = p1
                    del self._points[i + 1]
                    # self._points.append(p1)
        self.create_vectors()




