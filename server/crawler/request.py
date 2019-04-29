import requests 
  
createTaskURL = 'localhost:3000/task'
createClassURL = 'localhost:3000/class'

taskSchema = {
    name: '',
    duetime: '',
    opentime: '',
    starttime: '',
    finishtime: '',
    tag: [],
    state: '',
    class: '', 
    description: '',
    difficulty: 0,
    predictiontime: 0,
#     subTask: [],
    actualtime: 0    
}

classSchema = {       
    name: '',
    user: '', 
    task: [],
    deviation: 
}

def postTask():
        response = requests.post(createTaskURL, taskSchema)
        print(response.json())

def postClass():
        response = requests.post(createClassURL, classSchema)
        print(response.json())
       