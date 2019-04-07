from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.chrome.options import Options
from selenium.common.exceptions import StaleElementReferenceException, NoSuchElementException
import time
import datetime
from info import netid, password

url = 'http://newclasses.nyu.edu'
month_table = {'Jan': 1, 'Feb': 2, 'Mar': 3, 'Apr': 4, 'May': 5, 'Jun': 6, 'Jul': 7, 'Aug': 8, 'Sep': 9, 'Oct': 10, 'Nov': 11, 'Dec': 12}


def login(n, p):
    netidBox = driver.find_element_by_id('netid')
    passwordBox = driver.find_element_by_id('password')
    submitBtn = driver.find_element_by_css_selector('button[name="_eventId_proceed"]')
    netidBox.clear()
    netidBox.send_keys(n)
    passwordBox.clear()
    passwordBox.send_keys(p)
    submitBtn.click()


def click_Push():
    shadowHost = driver.find_element_by_id('duo_iframe')
    for i in range(400, 500, 10):
        for j in range(0, 140, 10):
            actionChain = webdriver.ActionChains(driver).move_to_element_with_offset(shadowHost, i, j).click()
            actionChain.perform()

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

def get_classes(page):
    classes = driver.find_elements_by_css_selector('a.link-container')
    i = 1
    while i < len(classes):
        cur_ele = classes[i]
        print('classes', cur_ele.find_element_by_css_selector('span').text)
        cur_ele.click() 
        classpage = driver.page_source
        get_assigments(classpage)
        newclasses = driver.find_elements_by_css_selector('a.link-container')
        # update class element
        i += 1
        if (i <= len(classes) - 1):
            classes[i] = newclasses[i]


def get_assigments(page):
    assignment_tab = driver.find_element_by_css_selector('a[title="Assignments "]')
    assignment_tab.click()
    assignments_page = driver.page_source
    assignments_rows = driver.find_elements_by_css_selector('table[summary="List of assignments."] tr')[1:]
    for r in assignments_rows:
        select_assignments(r)
    

def select_assignments(r):
    assignments_columns = r.find_elements_by_css_selector('td')
    status = assignments_columns[2].text
    due_date_string = assignments_columns[4].text
    if (due_date_string != ''):
        due_date = time_transform(assignments_columns[4].text)
        if (status == 'Not Started' and due_date > datetime.datetime.now()):
            # attachmant = assignments_columns[0]
            # open_date = assignments_columns[3]
            title = assignments_columns[1].find_element_by_css_selector('a[name="asnActionLink"]').text
            print(title, due_date)


def time_transform(time):
    timelist = time.split(' ')
    year = int(timelist[2])
    month = month_table[timelist[0]]
    day = int(timelist[1][:-1])
    hourminute = timelist[3].strip().split(':')
    if (hourminute[0] == ''):
        hour = 0
    else:
        hour = int(hourminute[0])
    
    if (hourminute[1] == ''):
        minute = 0
    else:
        minute = int(hourminute[1])
    return datetime.datetime(year, month, day, hour, minute)



driver = webdriver.Chrome()
driver.get(url)
login(netid, password)
click_Push()
if wait_for(passDUO):
    # originalsource = driver.page_source
    homepage = driver.page_source
    get_classes(homepage)
    driver.close()
    driver.quit()




# # find the link of class according to class names and the page content
# def find_class_names(page):
#     names = []
#     try:
#         while '<a class="link-container" href=' in page and len(names) < 10:
#             start_link = page.find('<a class="link-container" href=') + 28
#             start_url = page.find('"', start_link) + 1
#             end_url = page.find('"', start_url) - 1
#             starttitle = page.find('"',end_url) + 1
#             starttitle = page.find('"',starttitle) + 1
#             endtitle = page.find('"',starttitle) - 1
#             name = page[starttitle: endtitle + 1]
#             names.append(name)
#             page = page[endtitle::]
#         return names

#     except:

#         return "The name you searched does not exist in this page"
# namelst = find_class_names(originalsource)

# def chooselink(namelst):
#     print(namelst)
#     classtouse = input("choose the class name from list ")
#     shadowHostnew = driver.find_element_by_css_selector('.link-container[title="'+ classtouse +'"]')
#     actionChain1 = webdriver.ActionChains(driver).move_to_element(shadowHostnew).click()
#     actionChain1.perform()

# chooselink(namelst)
# # now we are on the class page
# newpage = driver.page_source
# print(len('Mrphs-toolsNav__menuitem--link'));
# def find_tag_names(page):
#     names = []
#     try:
#         while 'Mrphs-toolsNav__menuitem--link' in page:
#             start_link = page.find('Mrphs-toolsNav__menuitem--link ') + 30
#             start_url = page.find('"', start_link) + 1
#             end_url = page.find('"', start_url) - 1
#             starttitle = page.find('"',end_url) + 1
#             starttitle = page.find('"',starttitle) + 1
#             starttitle = page.find('"', starttitle) + 1
#             endtitle = page.find('"',starttitle) - 1
#             name = page[starttitle: endtitle + 1]
#             names.append(name)
#             page = page[endtitle::]
#         return names

#     except:

#         return "The name you searched does not exist in this page"
# taglst = find_tag_names(newpage)
# for i in range(len(taglst)):
#     if taglst[i] == 'Tests &amp; Quizzes ':
#         taglst[i] = "Tests & Quizzes "
# def choosetag(taglst):
#     print(taglst)
#     tagtouse = input("choose the tag name from list ")
#     shadowHostnew = driver.find_element_by_css_selector('.Mrphs-toolsNav__menuitem--link[title="'+ tagtouse +'"]')
#     actionChain1 = webdriver.ActionChains(driver).move_to_element(shadowHostnew).click()
#     actionChain1.perform()

# choosetag(taglst)
# print(driver.page_source)



# def find_all_quizs(page):
#     quizs = []
#     quizs.append(['Title', 'Time limit', 'Due Date'])
#     try:
#         while 'SUBMITTED ASSESMENTS' in page:
#             currentquiz = []
#             start_link = page.find("assessmentDueDateHeader") + 30
#             start_url = page.find('return false', start_link) + 1
#             start_name = page.find('>', start_url) + 1
#             end_name = page.find('<', start_name) - 1
#             title = page[start_name: end_name + 1]
#             # find the time
#             start_time = page.find('<span class="currentSort">',end_name) + 24
#             #print(page[start_time:start_time+26])
#             start_time = page.find('>',start_time) + 1
#             end_time = page.find('<',start_time) - 1
#             time = page[start_time:end_time + 1]
#             # find the due day
#             start_due = page.find('<td>',end_time) + 4
#             end_due = page.find('</td>',start_due) - 1
#             due = page[start_due:end_due+1]
#             currentquiz.append(title)
#             currentquiz.append(time)
#             currentquiz.append(due)
#             quizs.append(currentquiz)
#             page = page[end_due::]
#             return quizs
#     except:

#         return "The name you searched does not exist in this page"

# # newpage = driver.page_source
# # quizlst = find_all_quizs(newpage)
# # for i in quizlst:
# #         print(i)


# def find_assignments(page):
#     print(page)
# # find_assignments(newpage)




'''
# get the source content basing on url
def get_page_content(url):
    url = driver.page_source

# choose the classes
def findclassestag():
    lstofclasses = driver.find_elements_by_css_selector('.link-container')
    print(lstofclasses)
#findclassestag()

# change the things inside title to your classname(need to be exactly the name)

# choose the classes
def findclassestag():
    lstofclasses = driver.find_elements_by_css_selector('.link-container')
    print(lstofclasses)

'''
'''
# these following is to click through all the courses in your website
shadowHostnews = driver.find_elements_by_css_selector('a.link-container')
print(shadowHostnews)
for i in range(len(shadowHostnews)):
    shadowHostnews2 = driver.find_elements_by_css_selector('a.link-container')
    actionChain1 = webdriver.ActionChains(driver).move_to_element(shadowHostnews2[i]).click()
    actionChain1.perform()
'''

#content = driver.page_source
#classname = "Artificial Intelligence"
#classname = "AIT"
#links = find_class_link(classname,content)
#print(links)
#main(content,classname)]

#driver.close()
#driver.quit()
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
'''
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
shadowHostnew = driver.find_element_by_css_selector('.link-container[title="Artificial Intelligence, Section 001"]')
actionChain1 = webdriver.ActionChains(driver).move_to_element(shadowHostnew).click()
actionChain1.perform()
assignments = driver.find_elements_by_css_selector('a.Mrphs-toolsNav__menuitem--link ')
for j in range(len(assignments)):
    if j != 8:
        assignmentsnew = driver.find_elements_by_css_selector('a.Mrphs-toolsNav__menuitem--link ')
        actionChain2 = webdriver.ActionChains(driver).move_to_element(assignmentsnew[j]).click()
        actionChain2.perform()
        '''