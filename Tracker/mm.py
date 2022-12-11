import cv2
import numpy as np
import cv2 as cv
'''
cap = cv2.VideoCapture("1.mp4")
_, frame = cap.read()
x, y, w, h = 400, 400, 100, 100 #300, 170, 45 ,45
track_window = (x, y, w, h)
roi = frame[y:y+h, x:x+w]
hsv_roi = cv2.cvtColor(roi, cv2.COLOR_BGR2HSV)
mask = cv2.inRange(hsv_roi, np.array((0, 60, 32)), np.array((180, 255, 255)))
roi_hist = cv2.calcHist([hsv_roi], [0], mask,[180], [0,180])
cv2.normalize(roi_hist,roi_hist,0,255, cv2.NORM_MINMAX)

term_crit = (cv2.TERM_CRITERIA_EPS | cv2.TERM_CRITERIA_COUNT, 10, 1)

while True:
    ret, frame = cap.read()
    if ret == True:
        hsv = cv2.cvtColor(frame, cv2.COLOR_BGR2HSV)
        dst = cv2.calcBackProject([hsv], [0], roi_hist, [0,180], 1)
        ret, track_windows = cv2.CamShift(dst, track_window, term_crit)
        x,y,w,h = track_window
        pts = cv2.boxPoints(ret)
        pts = np.int0(pts)
        img2 = cv2.polylines(frame, [pts], True, 255, 2)
        cv2.imshow('img2', img2)
        k = cv2.waitKey(30) & 0xff

import numpy as np
import cv2 as cv
import argparse

cap = cv.VideoCapture("1.mp4")

ret, frame = cap.read()
# setup initial location of window
x, y, w, h = 260, 170, 50, 50 # simply hardcoded the values
track_window = (x, y, w, h)
# set up the ROI for tracking
roi = frame[y:y+h, x:x+w]
hsv_roi =  cv.cvtColor(roi, cv.COLOR_BGR2HSV)
mask = cv.inRange(hsv_roi, np.array((0., 60.,32.)), np.array((180.,255.,255.)))
roi_hist = cv.calcHist([hsv_roi],[0],mask,[180],[0,180])
cv.normalize(roi_hist,roi_hist,0,255,cv.NORM_MINMAX)
# Setup the termination criteria, either 10 iteration or move by at least 1 pt
term_crit = ( cv.TERM_CRITERIA_EPS | cv.TERM_CRITERIA_COUNT, 10, 1 )
while(1):
    ret, frame = cap.read()
    if ret == True:
        hsv = cv.cvtColor(frame, cv.COLOR_BGR2HSV)
        dst = cv.calcBackProject([hsv],[0],roi_hist,[0,180],1)
        # apply camshift to get the new location
        ret, track_window = cv.CamShift(dst, track_window, term_crit)
        # Draw it on image
        pts = cv.boxPoints(ret)
        pts = np.int0(pts)
        img2 = cv.polylines(frame, (x, y), (x+w, y+h), 255, 2) #img2 = cv.rectangle(frame, (x, y), (x+w, y+h), 255, 2)
        cv.imshow('img2',img2)
        k = cv.waitKey(30) & 0xff
        if k == 27:
            break
    else:
        break
        
'''
'''
cap = cv2.VideoCapture("321.mp4")
feature_params = dict(maxCorners=100, minDistance=7, qualityLevel=0.3, blockSize=7)
flow_params = dict(winSize = (15,15), maxLevel = 2,
                   criteria = (cv2.TERM_CRITERIA_EPS | cv2.TERM_CRITERIA_COUNT, 10, 1))
color = np.random.randint(0, 255, (100, 3))
ret, old_frame = cap.read()
old_gray = cv2.cvtColor(old_frame, cv2.COLOR_BGR2GRAY)
p0 = cv2.goodFeaturesToTrack(old_gray, mask=None, **feature_params)
mask = np.zeros_like(old_frame)

while True:
    ret, frame = cap.read()
    frame_gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
    p1, st, err = cv2.calcOpticalFlowPyrLK(old_gray, frame_gray, p0, None, **flow_params)
    good_new = p1[st == 1]
    good_old = p0[st == 1]
    for i, (new, old) in enumerate(zip(good_new, good_old)):
        a, b = new.ravel()
        c, d = old.ravel()
        mask = cv2.line(mask, (int(a),int(b)),(int(c),int(d)), color[i].tolist(), 2)
        frame = cv2.circle(frame,(int(a),int(b)),5,color[i].tolist(),-1)

    image = cv2.add(frame, mask)
    cv2.imshow('frame', image)
    k = cv.waitKey(3000) & 0xff
    if k == 27:
        break
    else:
        break
    old_gray = frame_gray.copy()
    p0 = good_new.reshape(-1, 1, 2)


import numpy as np
import cv2

cap = cv2.VideoCapture("321.mp4")

# params for ShiTomasi corner detection
feature_params = dict( maxCorners = 100,
                       qualityLevel = 0.01,
                       minDistance = 30,
                       blockSize = 7 )

# Parameters for lucas kanade optical flow
lk_params = dict( winSize  = (15,15),
                  maxLevel = 2,
                  criteria = (cv2.TERM_CRITERIA_EPS | cv2.TERM_CRITERIA_COUNT, 10, 0.03))

# Create some random colors
color = np.random.randint(0,255,(100,3))

# Take first frame and find corners in it Возьмите первый кадр и найдите в нем углы
ret, old_frame = cap.read()
old_gray = cv2.cvtColor(old_frame, cv2.COLOR_BGR2GRAY)
p0 = cv2.goodFeaturesToTrack(old_gray, mask = None, **feature_params)

# Create a mask image for drawing purposes Создайте изображение маски для целей рисования
mask = np.zeros_like(old_frame)

while(1):
    
    ret,frame = cap.read()
    frame_gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)

    # calculate optical flow
    p1, st, err = cv2.calcOpticalFlowPyrLK(old_gray, frame_gray, p0, None, **lk_params)

    # Select good points
    good_new = p1[st==1]
    good_old = p0[st==1]

    # draw the tracks
    for i,(new,old) in enumerate(zip(good_new,good_old)):
        a,b = new.ravel()
        c,d = old.ravel()
        mask = cv2.line(mask, (int(a),int(b)),(int(c),int(d)), color[i].tolist(), 3)
        frame = cv2.circle(frame,(int(a),int(b)),1,color[i].tolist(),20)
    img = cv2.add(frame,mask)

    cv2.imshow('frame',img)
    k = cv2.waitKey(30) & 0xff
    if k == 27:
        break

    # Now update the previous frame and previous points
    old_gray = frame_gray.copy()
    p0 = good_new.reshape(-1,1,2)

cv2.destroyAllWindows()
cap.release()

'''

import numpy as np
import cv2

cap = cv2.VideoCapture("12345.mp4")

# params for ShiTomasi corner detection
feature_params = dict(maxCorners=80,
                      qualityLevel=0.008,
                      minDistance=10,
                      blockSize=7)

# Parameters for lucas kanade optical flow
lk_params = dict(winSize=(10, 10),
                 maxLevel=2,
                 criteria=(cv2.TERM_CRITERIA_EPS | cv2.TERM_CRITERIA_COUNT, 10, 0.03))

# Create some random colors
color = (0, 255, 0) #np.random.randint(0, 255, (100, 3))

# Take first frame and find corners in it Возьмите первый кадр и найдите в нем углы
ret, old_frame = cap.read()
old_gray = cv2.cvtColor(old_frame, cv2.COLOR_BGR2GRAY)
p0 = cv2.goodFeaturesToTrack(old_gray, mask=None, **feature_params)
# Create a mask image for drawing purposes Создайте изображение маски для целей рисования
mask = np.zeros_like(old_frame)
t = 20
flag = True
ddd = 0
fps = 0
good_new = np.zeros((1, 2))
good_new1 = np.zeros((1, 2))
while (1):
    #print(len(p0))
    ret, frame = cap.read()
    if fps % 2 == 0:
        if t < 3: #or fps % 30000 == 0 or fps != 0:
            print('------------------------------------------')
            good_new1 = good_new
            old_gray = cv2.cvtColor(old_frame, cv2.COLOR_BGR2GRAY)
            p0 = cv2.goodFeaturesToTrack(old_gray, mask=None, **feature_params)
    # Create a mask image for drawing purposes Создайте изображение маски для целей рисования
            mask = np.zeros_like(old_frame)
            flag = True


        frame_gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)

    # calculate optical flow
        p1, st, err = cv2.calcOpticalFlowPyrLK(old_gray, frame_gray, p0, None, **lk_params)

    # Select good points

        good_new = p1[st == 1]
        good_old = p0[st == 1]
        if len(good_new1) > 1:
            np.append(good_new, good_new1, 0)
    # draw the tracks
    # цикл по точкам
        t = 0
        ddd = 0
    # good_new1 = good_new
    #good_new1 = np.zeros((2, 2))
    #print(good_new1)
    #print( f"goodnew = {len(good_new)}")
        for i, (new, old) in enumerate(zip(good_new, good_old)):
        #print(good_new)
            a, b = new.ravel()
            c, d = old.ravel()
        #('i',i, 'a',a)
        #for i in range(len(good_new)):
            d1 = abs(a-c)
            d2 = abs(b-d)
            dd = (d1**2+d2**2)**0.5
            ddd += dd
            if flag == True:
                dddd = ddd / i
        #print('st', ddd/i)

            #print(d1, d2)
        #mask = cv2.line(mask, (int(a), int(b)), (int(c), int(d)), color[i].tolist(), 3)
            if dd < dddd*0.055 or dd > dddd*25.5:   # dd < 3 : dd < dddd*0.2 or dd > dddd*5.5:
                print(i, dd)
                frame = cv2.circle(frame, (int(a), int(b)), 1, color, 3)
                cv2.putText(frame, str(i), (int(a), int(b)), cv2.FONT_HERSHEY_SIMPLEX,
                        0.4, color, 1)
                t = t + 1
            #print(good_new[i])
            #np.append(good_new1, good_new[i], axis=0)
            #else:
            # print(good_new)
         #   np.append(good_new1, good_new[i], axis=0)
                #if i < len(good_new):
                  #  good_new = np.delete(good_new, i, 0)
        #good_new = good_new1
            # good_new1 = np.delete(good_new1, np.where(good_new1 == good_new1[i]))
        print('ddddddddddddd', dddd)
        flag = False
    # good_new = good_new1
    #print( f"goodnew after = {len(good_new)}")
   # print(t)
        img = cv2.add(frame, mask)

        cv2.imshow('frame', img)
        k = cv2.waitKey(60) & 0xff
        if k == 27:
            break
    # Now update the previous frame and previous points
        old_gray = frame_gray.copy()
        p0 = good_new.reshape(-1, 1, 2)
    fps += 1

cv2.destroyAllWindows()
cap.release()