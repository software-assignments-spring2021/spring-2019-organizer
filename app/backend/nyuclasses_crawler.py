from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.chrome.options import Options
from selenium.common.exceptions import StaleElementReferenceException, NoSuchElementException
import time

# User infomation
url = 'http://newclasses.nyu.edu'
netid = ""
password = ""

# Initialize the chrome web driver
driver = webdriver.Chrome()
driver.get(url)

# Getting the input box from login page
netidBox = driver.find_element_by_id('netid')
passwordBox = driver.find_element_by_id('password')
submitBtn = driver.find_element_by_css_selector('button[name="_eventId_proceed"]')

# Input the information and perform click
netidBox.clear()
netidBox.send_keys(netid)
passwordBox.clear()
passwordBox.send_keys(password)
submitBtn.click()

shadowHost = driver.find_element_by_id('duo_iframe')

# Using selenium position click to click the push button in DUO frame
for i in range(400, 500, 10):
    for j in range(0, 140, 10):
        actionChain = webdriver.ActionChains(driver).move_to_element_with_offset(shadowHost, i, j).click()
        actionChain.perform()
        print(i, j)

# Identify if the system has passed DUO authenitcation page
def passDUO():
    try: 
        driver.find_element_by_id('duo_iframe')
        return False
    except StaleElementReferenceException:
        return True
    except NoSuchElementException:
        return True

# Wait for the user to approve DUO notification and page loading
def wait_for(conditionFunc):
    start = time.time()
    threshold = 15
    while time.time() < start + threshold:
        if conditionFunc():
            return True
        else:
            time.sleep(0.5)
    raise Exception('Timeout out')


if wait_for(passDUO):
    print(driver.page_source)




# Closing the chrome testing window 
driver.close()
driver.quit()