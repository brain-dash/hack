import copy
import sys
import pathlib

sys.path.append(str(pathlib.Path(__file__).parent.parent.parent))
from pathfinding.dubins1 import plan_path
from pathfinding.dubins2 import plan_path_sec
from pathfinding.wetzel import *

import numpy as np
from path.point import Point
from path.path import Path

import matplotlib.pyplot as plt
from utils.plot import plot_arrow, plot_curvature
from copy import deepcopy

show_animation = True
def vector_info(vector):
    print("Start:",  vector.start.x, vector.start.y)
    print("End:",  vector.end.x, vector.end.y)
    print("Length:", vector.length)
    print("Coords:",  vector.x, " ", vector.y)
    print("Direction rad:",  vector.direction)
    print("Direction deg:",  np.rad2deg(vector.direction))


def test_intersection():
    figure, axes = plt.subplots()

    radius = 1
    c1 = Circle(Point(x=0, y=0.5), radius)
    c2 = Circle(Point(x=0, y=-1), radius)

    p1, p2 = c1.intersection(c2)
    print(p1)
    print(p2)

    plt.scatter(p1.x, p1.y, marker='x')
    plt.scatter(p2.x, p2.y, marker='x')
    circle1 = plt.Circle((c1.center.x, c1.center.y), radius, fill=False, linestyle='dashed')
    circle2 = plt.Circle((c2.center.x, c2.center.y), radius, fill=False, linestyle='dashed')

    axes.set_aspect(1)
    axes.add_artist(circle1)
    axes.add_artist(circle2)

    plt.grid(True)
    plt.axis("equal")
    plt.show()


def test_circles():
    figure, axes = plt.subplots()
    test_coords = [[44.95298262463785, 37.27123632216752],
                    [44.95402724519435, 37.28805286767577],
                    [44.95502724519435, 37.29505286767577],
                    [44.95830446995309, 37.30522380426023]]



    radius = 0.005
    path_initial = Path.from_list(coords=test_coords)
    plt.scatter(path_initial.x(), path_initial.y(), marker='x', color='green')
    # path_initial.optimize(path_initial, radius=radius, n=2, wetzel=False, coordinates=False)
    # path_initial.remove_straight_lines(iterations=3)
    path_final = plan_path_sec(path_initial)

    c1 = Circle(Point(x=path_initial[1].start.x, y=path_initial[1].start.y), radius)
    c2 = Circle(Point(x=path_initial[2].start.x, y=path_initial[2].start.y), radius)
    p1, p2 = c1.intersection(c2)
    print(p1)
    print(p2)
    plt.scatter(p1.x, p1.y, color='red', marker='x')
    plt.scatter(p2.x, p2.y, color='red', marker='x')

    if show_animation:
        plt.plot(path_initial.x(), path_initial.y(), linewidth=1)
        plt.plot(path_final.x(), path_final.y())
        plt.scatter(path_initial.x(), path_initial.y(), color='red')

        for i in range(len(path_initial)):
            circle = plt.Circle((path_initial[i].start.x, path_initial[i].start.y),
                                radius, fill=False, linestyle='dashed')
            axes.set_aspect(1)
            axes.autoscale()
            axes.add_artist(circle)



        plt.grid(True)
        plt.axis("equal")
        plt.show()


def wetzel_test():
    import matplotlib.pyplot as plt
    INF = 1e18

    mec = welzl([Point(x=0, y=0),
                 Point(x=0, y=1),
                 Point(x=1, y=0)])
    print("Center = {", mec.center.x, ",", mec.center.y, "} Radius =", mec.radius)

    mec2 = welzl([Point(x=5, y=-2),
                  Point(x=-3, y=-2),
                  Point(x=-2, y=5),
                  Point(x=1, y=6),
                  Point(x=0, y=2)])

    points =[[5, -2],
            [-3, -2],
            [-2, 5],
            [1, 6],
            [0, 2]]
    centers = np.array(points)

    figure, axes = plt.subplots()
    circle = plt.Circle((mec2.center.x, mec2.center.y), mec2.radius, fill=False)
    plt.scatter(mec2.center.x, mec2.center.y, marker='x')
    axes.set_aspect(1)
    axes.add_artist(circle)
    plt.title('Circle')

    for i in range(len(centers)):
        plt.scatter(centers[i, 0], centers[i, 1], color='k', marker='o', s=50)
    plt.xlim([-30, 30])
    plt.ylim([-30, 30])
    plt.show()
    print("Center = {", mec2.center.x, ",", mec2.center.y, "} Radius =", mec2.radius)

def main():
    print("Dubins path planner sample start!!")

    test_coords1 = [[55.763290828800116, 37.5909048461914],
                   [55.769484573498744, 37.59536804199218],
                   [55.77180697300689, 37.601547851562486],
                   [55.772581075298376, 37.608929290771464],
                   [55.77296812065462, 37.625408782958964],
                   [55.772097263175425, 37.631073608398424],
                   [55.76803300324382, 37.649956359863275],
                   [55.7656135988627, 37.65218795776366],
                   [55.7545792033592, 37.65253128051755],
                   [55.75206214770929, 37.65304626464842],
                   [55.743832173569864, 37.64858306884763],
                   [55.755063233822455, 37.61184753417968],
                   [55.77519355655238, 37.68669189453122],
                   [55.78525480417483, 37.63519348144529],
                   [55.760871128879174, 37.602406158447245],
                   [55.75699929535349, 37.721195831298814],
                   [55.73259786601311, 37.63673843383786],
                   [55.74412267292747, 37.594338073730455],
                   [55.761742238221835, 37.59056152343748],
                   [55.783900557411606, 37.59794296264646],
                   [55.7733551621512, 37.67862380981443],
                   [55.7521873085031, 37.616165931893846],
                   [55.757898835331346, 37.61050110645441],
                   [55.74744319859523, 37.608269508554],
                   [55.73219231337294, 37.60286565566359],
                   [55.70845375895499, 37.62312169814407],
                   [55.730933080633214, 37.65007253432571],
                   [55.76453092343249, 37.6603722169429],
                   [55.75320579095923, 37.67462011123003],
                   [55.763272738479166, 37.68285985732376],
                   [55.757465202629234, 37.59016271376907],
                   [55.76598262463785, 37.58123632216752]]

    # for i in range(len(test_coords1)):
    #     for j in range(len(test_coords1[0])):
    #         test_coords1[i][j] = 10000 * test_coords1[i][j]

    test_coords2 = [[44.95298262463785, 37.27123632216752],
                   [44.95402724519435, 37.28805286767577],
                   [44.95502724519435, 37.29505286767577],
                   [44.95830446995309, 37.30522380426023]]

    # coord = [x[0] for x in data] #parsing json

    points = [[1., 1.],
              [3., 3.],
              [5., 1.],
              [7., 3.],
              [4., 3.],
              [2., 7.],
              [1., 3.],
              [-1., 1.],
              [3., 4.],
              [7., 2.],
              [4., 1.],
              [5., 7.],
              [4., 10.],
              [6., 3.],
              [3., 9.],
              [5., 9.]]

    for i in range(len(points)):
        for j in range(len(points[0])):
            points[i][j] = 100 * points[i][j]


    curvature = 0.02
    radius = 0.01

    figure, axes = plt.subplots()

    path_initial = Path.from_list(coords=test_coords1)
    # path_final2 = copy.deepcopy(path_initial)
    # plt.scatter(path_initial.x(), path_initial.y(), marker='x', color='green')
    path_initial.optimize(path_initial, radius=radius, n=2, wetzel=True, coordinates=False)
    path_initial.remove_straight_lines(iterations=3)
    # path_final1 = plan_path(path_initial, curvature)

    path_final2 = plan_path_sec(path_initial)

    if show_animation:
        plt.plot(path_initial.x(), path_initial.y(), linewidth=1)
        # plt.plot(path_final1.x(), path_final1.y(), linewidth=1)
        plt.plot(path_final2.x(), path_final2.y())
        plt.scatter(path_initial.x(), path_initial.y(), color='red')

        for i in range(len(path_initial)):
            circle = plt.Circle((path_initial[i].start.x, path_initial[i].start.y),
                                radius, fill=False, linestyle='dashed')
            axes.set_aspect(1)
            axes.add_artist(circle)
        # print(path_initial[i].start.x, " ", path_initial[i].start.y, " ", path_initial[i].direction)
        #     plot_arrow(path_initial[i].start.x, path_initial[i].start.y, path_initial[i].direction,
        #                arrow_length=0.001, head_width=0.001)
        # plot_arrow(path_initial.finish.x, path_initial.finish.y, path_initial.end_vec().direction,
        #            arrow_length=0.0005, head_width=0.0000001)
        plt.grid(True)
        plt.axis("equal")
        plt.show()


if __name__ == '__main__':

    test_intersection()
    # test_circles()
    # main()
    # wetzel_test()