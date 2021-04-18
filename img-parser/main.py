import cv2 as cv
import pytesseract
import sys

# Adding custom options
custom_config = r'--oem 3 --psm 6'
x = y = 0
h = 40
w = 1080

file_path = sys.argv[1] if len(sys.argv) > 1 else 'data.txt'
video_path = sys.argv[2] if len(sys.argv) > 2 else 'test_video.mp4'

with open(file_path, 'w') as result_file:
  vidcap = cv.VideoCapture(video_path)
  success, image = vidcap.read()
  count = 0

  print(f'[{count}] Read a new frame: ', success)
  res = pytesseract.image_to_string(image, config=custom_config)
  result_file.write(res + '\n')

  while success:
    success, image = vidcap.read()
    cropped_img = image[y:y+h, x:x+w]
    count += 1

    print(f'[{count}] Read a new frame: ', success)
    res = pytesseract.image_to_string(cropped_img, config=custom_config)
    result_file.write(res + '\n')
