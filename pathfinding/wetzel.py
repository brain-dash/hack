# Python3 program to find the minimum enclosing
# circle for N integer points in a 2-D plane
from random import randint, shuffle
from path.circle import Circle


# Returns the MEC using Welzl's algorithm
# Takes a set of input points P and a set R
# points on the circle boundary.
# n represents the number of points in P
# that are not yet processed.
def welzl_helper(P, R, n):
    # Base case when all points processed or |R| = 3
    if (n == 0 or len(R) == 3):
        return Circle.min_circle_trivial(R)

    # Pick a random point randomly
    idx = randint(0, n - 1)
    p = P[idx]

    # Put the picked point at the end of P
    # since it's more efficient than
    # deleting from the middle of the vector
    P[idx], P[n - 1] = P[n - 1], P[idx]

    # Get the MEC circle d from the
    # set of points P - :p
    d = welzl_helper(P, R.copy(), n - 1)

    # If d contains p, return d
    if (Circle.is_inside(d, p)):
        return d

    # Otherwise, must be on the boundary of the MEC
    R.append(p)

    # Return the MEC for P - :p and R U :p
    return welzl_helper(P, R.copy(), n - 1)


def welzl(P):
    P_copy = P.copy()
    shuffle(P_copy)
    return welzl_helper(P_copy, [], len(P_copy))









