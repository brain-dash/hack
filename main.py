import sys
import pathlib
sys.path.append(str(pathlib.Path(__file__).parent.parent.parent))
from path.path import Path
from pathfinding.dubins import plan_path
show_animation = True



def main():
    print("Dubins path planner sample start!!")
    import matplotlib.pyplot as plt
    from utils.plot import plot_arrow

    test_coords = [[55.74846080864999, 37.59981391186994], [55.76346531164121, 37.60899779553693],
     [55.76206191036014, 37.64753577466289], [55.747202102968316, 37.64787909741681],
     [55.75310798404602, 37.62573477978985], [55.764723490354115, 37.63139960522931],
     [55.76085204095608, 37.59268996472638], [55.745943356504235, 37.6168083881883],
     [55.745362382842515, 37.6519131397752], [55.737324689166485, 37.63225791211407],
     [55.738583714852815, 37.6079678272752], [55.74415199314427, 37.593805763676585],
     [55.75291436283772, 37.590200874760555], [55.7443456580299, 37.57835623975079],
     [55.73853529154216, 37.58839843030256]]

    # path_test = Path.from_list(coords=test_coords)

    curvature = 3.0

    points = [[1., 1.],
              [3., 3.],
              [1., 3.],
              [5., 6.],
              [9., 7.],
              [7., 3.],
              [3., 2.]]


    path_initial = Path.from_list(coords=points)
    print(path_initial.get_angles())
    # path_initial.optimize_path(path_initial)
    print(path_initial[2].x, " ", path_initial[2].y)


    path_final = plan_path(path_initial, curvature)



    if show_animation:
        plt.plot(path_initial.x(), path_initial.y())
        plt.plot(path_final.x(), path_final.y())
        plt.scatter(path_initial.x(), path_initial.y(), color='red')

        for i in range(len(path_initial)):
            # print(path_initial[i].start.x, " ", path_initial[i].start.y, " ", path_initial[i].direction)
            plot_arrow(path_initial[i].start.x, path_initial[i].start.y, path_initial[i].direction)
        # plot_arrow(path_initial.finish.x, path_initial.finish.y, path_initial.end_vec().direction)
        plt.grid(True)
        plt.axis("equal")
        plt.show()


if __name__ == '__main__':

    main()