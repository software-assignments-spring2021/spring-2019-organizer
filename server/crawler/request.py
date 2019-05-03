import requests 
  
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
       