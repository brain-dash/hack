
from __future__ import annotations
from math import sqrt
class Point:

    def __init__(self, **kwargs):
        if kwargs.get('coords'):
            self._x, self._y = self.from_list(kwargs.get('coords'))
        else:
            self._x = kwargs.get('x')
            self._y = kwargs.get('y')

    @staticmethod
    def from_list(coords: list):
        if len(coords) < 2:
            return None, None
        else:
            return coords[0], coords[1]

    @staticmethod
    def dist(p1: Point, p2: Point):
        return sqrt(pow(p1.x - p2.x, 2) + pow(p1.y - p2.y, 2))

    def list(self):
        return [self._x, self._y]

    @property
    def x(self):
        return self._x

    @x.setter
    def x(self, value):
        self._x = value

    @property
    def y(self):
        return self._y

    @y.setter
    def y(self, value):
        self._y = value