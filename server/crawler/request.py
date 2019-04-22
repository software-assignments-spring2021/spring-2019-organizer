import requests 
  
# sending header to backend api
r = requests.get('http://localhost:3000',
    headers = {'User-agent': 'Chrome'})
print(r.headers['content-type'])
print(r.text)
data = r.json()
print(data)
print(data['user-agent'])

# some code reference to https://code.tutsplus.com/tutorials/using-the-requests-module-in-python--cms-28204
# getting geo location for fun purpose
API_ENDPOINT = "http://localhost:3000"
  
API_KEY = "XXXXXXXXXXXXXXXXX"
  
source_code = 0

data = {'api_dev_key':API_KEY, 
        'api_option':'paste', 
        'api_paste_code':source_code, 
        'api_paste_format':'python'} 
  
r = requests.post(url = API_ENDPOINT, data = data) 
  
pastebin_url = r.text 

URL = "http://maps.googleapis.com/maps/api/geocode/json"
  
location = "new york university"
  
PARAMS = {'address':location} 
  
# sending get request and saving the response as response object 
r = requests.get(url = URL, params = PARAMS) 
  
# extracting data in json format 
data = r.json() 
  
  
# extracting latitude, longitude and formatted address  
# of the first matching location 
latitude = data['results'][0]['geometry']['location']['lat'] 
longitude = data['results'][0]['geometry']['location']['lng'] 
formatted_address = data['results'][0]['formatted_address'] 
  
# printing the output 
print("Latitude:%s\nLongitude:%s\nFormatted Address:%s"
      %(latitude, longitude,formatted_address)) 