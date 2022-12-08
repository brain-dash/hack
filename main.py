import sys
import pathlib
sys.path.append(str(pathlib.Path(__file__).parent.parent.parent))

from math import sin, cos, atan2, sqrt, acos, pi, hypot
import numpy as np
from dubins.dubins import plan_dubins_path, plan_path
from classes import Point, Path, Vector

show_animation = True



def main():
    print("Dubins path planner sample start!!")
    import matplotlib.pyplot as plt
    from utils.plot import plot_arrow

    yaws = [np.deg2rad(45), np.deg2rad(-45), np.deg2rad(45), np.deg2rad(-45)]

    curvature = 2.0

    points = [Point(1., 1.), Point(2., 3.), Point(-1., 1.), Point(1., 3.), Point(9., 7.), Point(7., 3.)]

    path_initial = Path(points)

    path_final = plan_path(path_initial, curvature)

    # path_final = []
    # path_final = Path()
    # for i in range(len(points) - 1):
    #     path_two_points, path_yaw, mode, lengths = plan_dubins_path(points[i].x,
    #                                                                points[i].y,
    #                                                                yaws[i],
    #                                                                points[i + 1].x,
    #                                                                points[i + 1].y,
    #                                                                yaws[i + 1],
    #                                                                curvature)
    #     path_final.extend(path_two_points)

    if show_animation:
        plt.plot(path_initial.x(), path_initial.y())
        plt.plot(path_final.x(), path_final.y())
        plt.scatter(path_initial.x(), path_initial.y(), color = 'red')
        plot_arrow(path_initial.start.x, path_initial.start.y, path_initial.begin_vec().direction)
        plot_arrow(path_initial.finish.x, path_initial.finish.y, path_initial.end_vec().direction)
        plt.grid(True)
        plt.axis("equal")
        plt.show()


if __name__ == '__main__':
    main()