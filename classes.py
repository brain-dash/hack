from __future__ import annotations
import math
from math import sqrt, pow, degrees


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
            angles.append(vec.direction)
        return angles

    def __len__(self):
        return len(self._vectors)

    def __getitem__(self, key):
        return self._vectors[key]


class Vector:
    def __init__(self, point_s: Point, point_e: Point):
        self._start_point = point_s
        self._end_point = point_e
        self.x = self._end_point.x - self._start_point.x
        self.y = self._end_point.y - self._start_point.y
        self.length = self.calc_length()
        self.direction = self.calc_direction()

    def calc_length(self):
        return math.sqrt(math.pow(self.x, 2) + math.pow(self.y, 2))

    def calc_direction(self):
        if self.x == 0:
            return 90
        else:
            angle = math.degrees(math.atan(self.y / self.x))
            if self.y > 0:
                if self.x > 0:
                    return angle
                else:
                    return 180 - angle
            else:
                if self.x > 0:
                    return 360 - angle
                else:
                    return 180 + angle


    def start_x(self):
        return self._start_point.x

    def start_y(self):
        return self._start_point.y

    def end_x(self):
        return self._end_point.x

    def end_y(self):
        return self._end_point.y

    @classmethod
    def scalar(cls, v1: Vector, v2: Vector):
        return v1.x * v2.x + v1.y * v2.y

    @classmethod
    def angle(cls, v1: Vector, v2: Vector):
        angle = cls.scalar(v1, v2) / (v1.length * v2.length)
        angle = math.acos(angle)
        return math.degrees(angle)


class Point:

    def __init__(self, x, y):
        self._x = x
        self._y = y

    @property
    def x(self):
        return self._x

    @x.setter
    def name(self, value):
        self._x = value

    @property
    def y(self):
        return self._y

    @y.setter
    def birth_date(self, value):
        self._y = value




