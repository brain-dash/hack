import cv2
import numpy as np

cap = cv2.VideoCapture('video.webm')
MIN_MATCH_COUNT = 10
img = cv2.imread('frag.png', cv2.IMREAD_GRAYSCALE)  # queryImage
sift = cv2.SIFT_create()
FLANN_INDEX_KDTREE = 1
index_params = dict(algorithm=FLANN_INDEX_KDTREE, trees=5)
search_params = dict(checks=50)
flann = cv2.FlannBasedMatcher(index_params, search_params)
cnt = 0
while True:
    ret, frame = cap.read()
    if ret and cnt % 10 == 0:
        frame = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
        kp1, des1 = sift.detectAndCompute(img, None)
        kp2, des2 = sift.detectAndCompute(frame, None)
        matches = flann.knnMatch(des1, des2, k=2)

        good = []
        for m, n in matches:
            if m.distance < 0.5 * n.distance:
                good.append(m)

        if len(good) > MIN_MATCH_COUNT:
            src_pts = np.float32([kp1[m.queryIdx].pt for m in good]).reshape(-1, 1, 2)
            dst_pts = np.float32([kp2[m.trainIdx].pt for m in good]).reshape(-1, 1, 2)
            M, mask = cv2.findHomography(src_pts, dst_pts, cv2.RANSAC, 5.0)
            matchesMask = mask.ravel().tolist()
            h, w = img.shape
            pts = np.float32([[0, 0], [0, h - 1], [w - 1, h - 1], [w - 1, 0]]).reshape(-1, 1, 2)
            dst = cv2.perspectiveTransform(pts, M)
            img2 = cv2.polylines(frame, [np.int32(dst)], True, 255, 3, cv2.LINE_AA)
        else:
            matchesMask = None

        draw_params = dict(matchColor=(0, 255, 0),
                           singlePointColor=(255, 0, 0),
                           matchesMask=matchesMask,
                           flags=cv2.DrawMatchesFlags_NOT_DRAW_SINGLE_POINTS)

        img3 = cv2.drawMatches(img, kp1, frame, kp2, good, None, **draw_params)
        cv2.imshow(f'{len(matches)}', cv2.resize(img3, (640, 480)))
        cv2.waitKey(1)
    else:
        cv2.imshow(f'image', cv2.resize(frame, (640, 480)))
    cnt += 1

cap.release()
