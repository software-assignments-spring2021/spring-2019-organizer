import requests 
from datetime import datetime
from threading import Timer
import crawlercombined



def forever_one_second():
    x = datetime.today()
    y = x.replace(day=x.day, hour=x.hour, minute=x.minute, second=x.second+1, microsecond=x.microsecond)
    delta_t = y - x

    secs = delta_t.seconds + 1

    def hello_world():
        print("hello world")

    t = Timer(secs, hello_world)
    t.start()

def forever_oneday_start():
    x = datetime.today()
    oneday = 86400
    def hello_world():
        print("hello world")
    for i in range(1,10000):
            t = Timer(86400*i, crawlercombined.main)
            t.start()


forever_oneday_start()
createTaskURL = 'localhost:3000/task'
createClassURL = 'localhost:3000/class'

taskSchema = {
    "user": "",
    "name": "",
    "duetime": "",
    "opentime": "",
    "starttime": "",
    "finishtime": "",
    "tag": [],
    "state": "",
    "class": "", 
    "description": "",
    "difficulty": 0,
    "predictiontime": 0,
    "actualtime": 0    
}

classSchema = {       
    "name": "",
    "user": "", 
    "task": [],
    "deviation": 0
}

def postTask():
        response = requests.post(createTaskURL, taskSchema)
        print(response.json())

def postClass():
        response = requests.post(createClassURL, classSchema)
        print(response.json())