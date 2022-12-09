from __future__ import annotations
from path.point import Point
import math
import numpy as np

class Vector:
    def __init__(self, point_s: Point, point_e: Point):
        self._start_point = point_s
        self._end_point = point_e
        self.x, self.y = Vector.coordinates(self._start_point, self._end_point)
        self.length = Vector.calc_length(self._start_point, self._end_point)
        self.direction = self.calc_direction()

    def calc_direction(self):
        if self.y >= 0:
            if self.x == 0:
                return np.deg2rad(90)
            direction = math.degrees(math.atan(self.y / self.x))
            if self.x > 0:
                return np.deg2rad(direction)
            else:
                # return np.deg2rad(direction)
                return np.deg2rad(direction - 180)
        else:
            if self.x == 0:
                return np.deg2rad(-90)
            direction = math.degrees(math.atan(self.y / self.x))
            if self.x > 0:
                return np.deg2rad(360 - direction)
            else:
                return np.deg2rad(180 + direction)

    # def calc_direction(self):
    #     if self.x != 0:
    #         return np.deg2rad(90)
    #     else:
    #         angle = math.degrees(math.atan(self.y / self.x))
    #         if self.y > 0:
    #             if self.x > 0:
    #                 return np.deg2rad(angle)
    #             else:
    #                 return np.deg2rad(180 - angle)
    #         else:
    #             if self.x > 0:
    #                 return np.deg2rad(360 - angle)
    #             else:
    #                 return np.deg2rad(180 + angle)
    @property
    def start(self):
        return self._start_point

    @property
    def end(self):
        return self._end_point

    @classmethod
    def scalar(cls, v1: Vector, v2: Vector):
        return v1.x * v2.x + v1.y * v2.y

    @classmethod
    def angle(cls, v1: Vector, v2: Vector):
        angle = cls.scalar(v1, v2) / (v1.length * v2.length)
        angle = math.acos(angle)
        return math.degrees(angle)

    @classmethod
    def calc_length(cls, start: Point, end: Point):
        x, y = Vector.coordinates(start, end)
        return math.sqrt(math.pow(x, 2) + math.pow(y, 2))

    @classmethod
    def coordinates(cls, start: Point, end: Point):
        x = end.x - start.x
        y = end.y - start.y
        return x, y
