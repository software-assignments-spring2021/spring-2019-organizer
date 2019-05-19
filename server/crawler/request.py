import requests 
from datetime import datetime
from threading import Timer
import crawlercombined
import sys

# getting sys stdin
args = sys.argv
arg1 = args[1]
arg2 = args[2]

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

def postClass():
        response = requests.post(createClassURL, classSchema)

def forever_one_second():
    x = datetime.today()
    y = x.replace(day=x.day, hour=x.hour, minute=x.minute, second=x.second+1, microsecond=x.microsecond)
    delta_t = y - x
    secs = delta_t.seconds + 1
    t = Timer(secs)
    t.start()

def forever_oneday_start():
    x = datetime.today()
    oneday = 86400
    crawlercombined.main(arg1, arg2)

    # for i in range(5):
    #     t = Timer(86400*i, lambda : crawlercombined.main(arg1, arg2))
    #     t.start()


forever_oneday_start()
