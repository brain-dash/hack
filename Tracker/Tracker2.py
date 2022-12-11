import numpy as np
import cv2

cap = cv2.VideoCapture("323.mp4")
w = int(cap.get(cv2.CAP_PROP_FRAME_WIDTH))
h = int(cap.get(cv2.CAP_PROP_FRAME_HEIGHT))
writer = cv2.VideoWriter('writer2.avi', cv2.VideoWriter_fourcc(*'XVID'), 20.0, (w, h))

# params for ShiTomasi corner detection
feature_params = dict(maxCorners=5000,
                      qualityLevel=0.0001,
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
fps = 0
good_new = np.zeros((1, 2))
good_new1 = np.zeros((1, 2))
while (fps < 10000):
    #print(len(p0))
    ret, frame = cap.read()
    if fps % 2 == 0:
        if t < 60: #t < 100: #or fps % 30000 == 0 or fps != 0:
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
        t = 0
        summa = 0
        for i, (new, old) in enumerate(zip(good_new, good_old)):
        #print(good_new)
            a, b = new.ravel()
            c, d = old.ravel()
            deltaX = abs(a-c)
            deltaY = abs(b-d)
            delta = (deltaX**2+deltaY**2)**0.5
            summa += delta
            if flag == True:
                dddd = summa / i
            if delta < dddd*0.195 or delta > dddd*6.5:
                frame = cv2.circle(frame, (int(a), int(b)), 3, color, 2)
                t = t + 1
        flag = False
        img = cv2.add(frame, mask)
        cv2.imshow('frame', img)
        k = cv2.waitKey(30) & 0xff
        if k == 27:
            break
    # Now update the previous frame and previous points
        old_gray = frame_gray.copy()
        p0 = good_new.reshape(-1, 1, 2)
        writer.write(frame)
    fps += 1
cap.release()
writer.release()
cv2.destroyAllWindows()
'''

import cv2
import numpy as np

# Create an object to read camera video
cap = cv2.VideoCapture('12.mp4')

# Check if camera opened successfully
if (cap.isOpened() == False):
    print("Camera is unable to open.")

# Set resolutions of frame.
# convert from float to integer.
frame_width = int(cap.get(3))
frame_height = int(cap.get(4))

# Create VideoWriter object.
# and store the output in 'captured_video.avi' file.

video_cod = cv2.VideoWriter_fourcc(*'XVID')
video_output = cv2.VideoWriter('captured_video.avi',
                               video_cod,
                               10,
                               (frame_width, frame_height))

while (True):
    ret, frame = cap.read()

    if ret == True:

        # Write the frame into the file 'captured_video.avi'
        video_output.write(frame)

        # Display the frame, saved in the file
        cv2.imshow('frame', frame)

        # Press x on keyboard to stop recording
        if cv2.waitKey(1) & 0xFF == ord('x'):
            break

    # Break the loop
    else:
        break

    # release video capture
# and video write objects
cap.release()
video_output.release()

# Closes all the frames
cv2.destroyAllWindows()

print("The video was successfully saved")
'''
