class Point:

    def __init__(self, **kwargs):
        if kwargs.get('id'):
            self.id = kwargs.get('id')
        else:
            self.id = 0

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