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


