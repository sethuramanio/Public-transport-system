import RPi.GPIO as IO
from picamera import PiCamera
import time
from datetime import datetime
from time import sleep
import picamera
import os
import tinys3
import yaml
import pytz
import boto3
dynamodb=boto3.resource('dynamodb')
IO.setwarnings(False)
IO.setmode(IO.BCM)

IO.setup(14,IO.IN) #GPIO 14 -> IR sensor as input
IO.setup(15,IO.IN) #Switch
tz = pytz.timezone('Asia/Kolkata')
with open("config.yml", 'r') as ymlfile:
    cfg = yaml.load(ymlfile)

# photo props
image_width = cfg['image_settings']['horizontal_res']
image_height = cfg['image_settings']['vertical_res']
file_extension = cfg['image_settings']['file_extension']
file_name = cfg['image_settings']['file_name']
photo_interval = cfg['image_settings']['photo_interval'] # Interval between photo (in seconds)
image_folder = cfg['image_settings']['folder_name']

# camera setup
camera = picamera.PiCamera()
camera.resolution = (image_width, image_height)
camera.awb_mode = cfg['image_settings']['awb_mode']

# verify image folder exists and create if it does not
if not os.path.exists(image_folder):
    os.makedirs(image_folder)

def clickpic():
	now = datetime.now()
	now = now.replace(tzinfo = tz)
	now = now.astimezone(tz)

	# assuming now contains a timezone aware datetime

	your_now = now.astimezone(tz)
	your_now=str(your_now)
	print(your_now)
	your_now = your_now[0:10]+your_now[11:19]
	your_now = your_now.replace(":","")
	print(your_now)
	print("Clicked")
    # Build filename string
	filepath = image_folder + '/' + your_now + file_extension
	if cfg['debug'] == True:
		print '[debug] Taking photo and saving to path ' + filepath
	camera.capture(filepath)
	if cfg['debug'] == True:
		print '[debug] Uploading ' + filepath + ' to s3'
	conn = tinys3.Connection(cfg['s3']['access_key_id'], cfg['s3']['secret_access_key'])
	f = open(filepath, 'rb')
	conn.upload(filepath, f, cfg['s3']['bucket_name'],headers={'x-amz-meta-cache-control': 'max-age=60'})
	if os.path.exists(filepath):
		os.remove(filepath)	
	print("uploaded")
	dynamodbTable=dynamodb.Table('photostorage')
    	dynamodbTable.put_item(
		Item={
		'dateandtime': your_now,
		'url':"https://s3.amazonaws.com/busphoto/images/"+your_now+".jpg"
		}
	)
clickpic()
