import torch
import os
from IPython.display import Image, clear_output

python detect.py --source '/content/test/KMO_123621_05067_1_t222_135712.jpg' --weights 'runs/train/exp/weights/best.pt' --conf-thres 0.3 --imgsz 1280