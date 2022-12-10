import cv2
import os
import numpy as np

MIN_MATCH_COUNT = 10
FLANN_INDEX_KDTREE = 1

bigMap = cv2.imread('bigMap.png', cv2.IMREAD_GRAYSCALE)  # trainImage
sift = cv2.SIFT_create()

kp2, bigMapDes = sift.detectAndCompute(bigMap, None)

index_params = dict(algorithm=FLANN_INDEX_KDTREE, trees=5)
search_params = dict(checks=50)

flann = cv2.FlannBasedMatcher(index_params, search_params)

root, dirs, files = next(os.walk("frags"))
files.sort()
for filename in files:
    UAVimg = cv2.imread(f"frags/{filename}", cv2.IMREAD_GRAYSCALE)  # queryImage
    kp1, imgDes = sift.detectAndCompute(UAVimg, None)

    matches = flann.knnMatch(imgDes, bigMapDes, k=2)
    good = [m for m, n in matches if m.distance < 0.3 * n.distance]

    if len(good) > MIN_MATCH_COUNT:
        src_pts = np.float32([kp1[m.queryIdx].pt for m in good]).reshape(-1, 1, 2)
        dst_pts = np.float32([kp2[m.trainIdx].pt for m in good]).reshape(-1, 1, 2)
        M, mask = cv2.findHomography(src_pts, dst_pts, cv2.RANSAC, 5.0)
        matchesMask = mask.ravel().tolist()
        h, w = UAVimg.shape
        pts = np.float32([[0, 0], [0, h - 1], [w - 1, h - 1], [w - 1, 0]]
                         ).reshape(-1, 1, 2)
        dst = cv2.perspectiveTransform(pts, M)
        bigMap = cv2.polylines(bigMap, [np.int32(dst)], True, 255, 3, cv2.LINE_AA)
    else:
        print("Not enough matches are found - {}/{}".format(len(good), MIN_MATCH_COUNT))
        matchesMask = None

    draw_params = dict(matchColor=(0, 255, 0),
                       singlePointColor=(255, 0, 0),
                       matchesMask=matchesMask,
                       flags=cv2.DrawMatchesFlags_NOT_DRAW_SINGLE_POINTS)

    res = cv2.drawMatches(UAVimg, kp1, bigMap, kp2, good, None, **draw_params)

    cv2.imshow("UAV", res)
    cv2.waitKey()
