from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.chrome.options import Options
from selenium.common.exceptions import StaleElementReferenceException, NoSuchElementException
import time

url = 'http://newclasses.nyu.edu'
netid = "tz904"
password = "885600JJjj!"

driver = webdriver.Chrome()
driver.get(url)

netidBox = driver.find_element_by_id('netid')
passwordBox = driver.find_element_by_id('password')
submitBtn = driver.find_element_by_css_selector('button[name="_eventId_proceed"]')

netidBox.clear()
netidBox.send_keys(netid)
passwordBox.clear()
passwordBox.send_keys(password)
submitBtn.click()


shadowHost = driver.find_element_by_id('duo_iframe')


for i in range(400, 500, 10):
    for j in range(0, 140, 10):
        actionChain = webdriver.ActionChains(driver).move_to_element_with_offset(shadowHost, i, j).click()
        actionChain.perform()
        print(i, j)



def passDUO():
    try: 
        driver.find_element_by_id('duo_iframe')
        return False
    except StaleElementReferenceException:
        return True
    except NoSuchElementException:
        return True

# This code is refered to ###
def wait_for(condition_function):
    start_time = time.time()
    while time.time() < start_time + 15:
        if condition_function():
            return True
        else:
            time.sleep(0.5)
    raise Exception(
        'Timeout waiting for {}'.format(condition_function.__name__)
    )

if wait_for(passDUO):
    print(driver.page_source)


# find the link of class according to class names and the page content
def find_class_link(classname, page):
        links = []
        end_index = page.find(classname)
        start_index = end_index - 200
        page = page[start_index:end_index]
        try:
            while '<a class="link-container" href=' in page and len(links) < 10:
                start_link = page.find('<a class="link-container" href=') + 28
                start_url = page.find('"', start_link) + 1
                end_url = page.find('"', start_url) - 1
                url = page[start_url: end_url + 1]
                if 'http' not in url:
                    url = urljoin(classname, url)
                    print(url)
                links.append(url)
                page = page[(end_url + 1):]
            return links

        except:

            return "The name you searched does not exist in this page"


# count the number of assignment basing on the content of one class
def count_number_assignment(page):
    content = page.split()
    a = content.count('headers="status">')
    return a

# count the number of annoucement basing on the content of one class
def count_number_announcement(page):
    content = page.split()
    a = content.count('headers="subject"')
    return a

# count the number of annoucement basing on the content of one class
def count_number_quiz(page):
    content = page.split()
    a = content.count('class="validate">*</span></td>')
    return a

# count number for quiz, assignment, announcement of the class
def main(content,clasname):
        dic = {}
        dic_tag_link = {}
        tag = ["Assignment","Announcement","Quiz"]
        class_link = find_class_link(clasname,content)
        for i in range(len(tag)):
            dic_tag_link[tag[i]] = find_tag_link(tag[i],content)
        for j in dic_tag_link.keys():
            link = dic_tag_link[j]
            content_j = get_page_content(link)
            if j == "Assignment":
                num = count_number_assignment(content_j)
            elif j == "Announcement":
                num = count_number_announcement(content_j)
            elif j == "Quiz":
                num = count_number_quiz(content_j)
            dic[j] = num
        print(dic_tag_link)
        print(dic)

# get the source content basing on url
def get_page_content(url):
    url = driver.page_source

shadowHostnew = driver.find_element_by_css_selector('.link-container[title="Artificial Intelligence, Section 001"]')
print(shadowHostnew)
actionChain1 = webdriver.ActionChains(driver).move_to_element(shadowHostnew).click()
actionChain1.perform()


content = driver.page_source
classname = "Artificial Intelligence"
#classname = "AIT"
links = find_class_link(classname,content)
print(links)
main(content,classname)

driver.close()
driver.quit()
print('Finish')

# def findShadow(element):
#     script = 'return arguments[0].shadowRoot'
#     shadowRoot = driver.execute_script(script, element)
#     print('this is root', shadowRoot)
#     return shadowRoot

# print(shadowHost.location)
# actionChain = webdriver.ActionChains(driver).move_to_element_with_offset(shadowHost, 410, 100).click()
# actionChain.perform()

# shadowROOT = findShadow(shadowHost)
# print(shadowROOT)
# pushBtn = shadowROOT.find_element_by_css_selector('button[tabindex="2"]')
# pushBtn.click()