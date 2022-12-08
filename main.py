import sys
import pathlib
sys.path.append(str(pathlib.Path(__file__).parent.parent.parent))

from math import sin, cos, atan2, sqrt, acos, pi, hypot
import numpy as np
from dubins.dubins import plan_dubins_path
from classes import Point

show_animation = True



def main():
    print("Dubins path planner sample start!!")
    import matplotlib.pyplot as plt
    from utils.plot import plot_arrow



    start_x = 1.0  # [m]
    start_y = 1.0  # [m]
    start_yaw = np.deg2rad(15.0)  # [rad]

    end_x = -3.0  # [m]
    end_y = -3.0  # [m]
    end_yaw = np.deg2rad(-45.0)  # [rad]

    curvature = 2.0

    points = [Point(1., 2.), Point(3., 4.), Point(-1., -2.)]

    path_final_x = []
    path_final_y = []

    for i in range(len(points) - 1):
        path_x, path_y, path_yaw, mode, lengths = plan_dubins_path(points[i].x,
                                                                   points[i].y,
                                                                   start_yaw,
                                                                   points[i + 1].x,
                                                                   points[i + 1].y,
                                                                   end_yaw,
                                                                   curvature)
        path_final_x.extend(path_x)
        path_final_y.extend(path_y)


    # path_x, path_y, path_yaw, mode, lengths = plan_dubins_path(start_x,
    #                                                            start_y,
    #                                                            start_yaw,
    #                                                            end_x,
    #                                                            end_y,
    #                                                            end_yaw,
    #                                                            curvature)

    if show_animation:
        plt.plot(path_final_x, path_final_y, label="".join(mode))
        plot_arrow(start_x, start_y, start_yaw)
        plot_arrow(end_x, end_y, end_yaw)
        plt.legend()
        plt.grid(True)
        plt.axis("equal")
        plt.show()


if __name__ == '__main__':
    main()