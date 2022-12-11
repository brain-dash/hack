from random import randint, shuffle
from path.circle import Circle

def welzl_helper(P, R, n):
    if (n == 0 or len(R) == 3):
        return Circle.min_circle_trivial(R)

    idx = randint(0, n - 1)
    p = P[idx]
    P[idx], P[n - 1] = P[n - 1], P[idx]
    d = welzl_helper(P, R.copy(), n - 1)
    if (Circle.is_inside(d, p)):
        return d
    R.append(p)
    return welzl_helper(P, R.copy(), n - 1)


def welzl(P):
    P_copy = P.copy()
    shuffle(P_copy)
    return welzl_helper(P_copy, [], len(P_copy))









