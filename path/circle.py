from __future__ import annotations

import math

from path.point import Point
class Circle:
    INF = 1e18
    def __init__(self, center=Point(x=0, y=0), radius=0) -> None:
        self.center = center
        self.radius = radius

    def __str__(self):
        return f"Center={self.center.x}, {self.center.y}, radius={self.radius}"

    def intersection(self, c: Circle):
        dist = Point.dist(self.center, c.center)

        dx = c.center.x - self.center.x
        dy = c.center.y - self.center.y

        if dist > self.radius + c.radius:
            return None
        elif dist == 0 and self.radius == c.radius:
            return None
        elif dist < math.fabs(c.radius - self.radius):
            return None
        else:
            ch_dist = (self.radius ** 2 - c.radius ** 2 + dist ** 2) / (2 * dist)
            hch_d = math.sqrt(self.radius**2 - ch_dist**2)
            ch_mid_x = self.center.x + (ch_dist * dx) / dist
            ch_mid_y = self.center.y + (ch_dist * dy) / dist

            return Point(coords=[ch_mid_x + (hch_d * dy), ch_mid_y - (hch_d * dx)]), \
                   Point(coords=[ch_mid_x - (hch_d * dy), ch_mid_y + (hch_d * dx)])


    @staticmethod
    def is_inside(circle, point):
        return Point.dist(circle.center, point) <= circle.radius

    @staticmethod
    def get_circle_center(bx, by, cx, cy):
        B = bx * bx + by * by
        C = cx * cx + cy * cy
        D = bx * cy - by * cx
        return Point(x=(cy * B - by * C) / (2 * D),
                     y=(bx * C - cx * B) / (2 * D))

    # Function to return the smallest circle
    # that intersects 2 points
    @staticmethod
    def circle_from1(A, B):
        # Set the center to be the midpoint of A and B
        C = Point(x=(A.x + B.x) / 2.0, y=(A.y + B.y) / 2.0)
        # Set the radius to be half the distance AB
        return Circle(C, Point.dist(A, B) / 2.0)

    # Function to return a unique circle that
    # intersects three points
    @staticmethod
    def circle_from2(A, B, C):
        I = Circle.get_circle_center(B.x - A.x, B.y - A.y,
                              C.x - A.x, C.y - A.y)

        I.x += A.x
        I.y += A.y
        return Circle(I, Point.dist(I, A))

    # Function to check whether a circle
    # encloses the given points
    @staticmethod
    def is_valid_circle(c, P):
        # Iterating through all the points
        # to check  whether the points
        # lie inside the circle or not
        for p in P:
            if (not Circle.is_inside(c, p)):
                return False
        return True

    # Function to return the minimum enclosing
    # circle for N <= 3
    @staticmethod
    def min_circle_trivial(P):
        assert (len(P) <= 3)
        if not P:
            return Circle()

        elif (len(P) == 1):
            return Circle(P[0], 0)

        elif (len(P) == 2):
            return Circle.circle_from1(P[0], P[1])

        # To check if MEC can be determined
        # by 2 points only
        for i in range(3):
            for j in range(i + 1, 3):

                c = Circle.circle_from1(P[i], P[j])
                if (Circle.is_valid_circle(c, P)):
                    return c

        return Circle.circle_from2(P[0], P[1], P[2])