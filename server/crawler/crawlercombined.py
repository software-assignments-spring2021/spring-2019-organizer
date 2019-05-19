from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.chrome.options import Options
from selenium.common.exceptions import StaleElementReferenceException, NoSuchElementException
import time
import datetime
import requests

url = 'http://newclasses.nyu.edu'
month_table = {'Jan': 1, 'Feb': 2, 'Mar': 3, 'Apr': 4, 'May': 5, 'Jun': 6, 'Jul': 7, 'Aug': 8, 'Sep': 9, 'Oct': 10, 'Nov': 11, 'Dec': 12}

# n represents netid
# p represents password
# The outcome is the fill in the log-in page automatically and click to go to the duo verfication page
def login(n, p,driver):
    netidBox = driver.find_element_by_id('netid')
    passwordBox = driver.find_element_by_id('password')
    submitBtn = driver.find_element_by_css_selector('button[name="_eventId_proceed"]')
    netidBox.clear()
    netidBox.send_keys(n)
    passwordBox.clear()
    passwordBox.send_keys(p)
    submitBtn.click()

# This function is to check if we can find the duo location
def passDUO(driver):
    try:
        driver.find_element_by_id('duo_iframe')
        return False
    except StaleElementReferenceException:
        return True
    except NoSuchElementException:
        return True

# This function to force quit if we wait for too long
def wait_for(condition_function,driver):
    start_time = time.time()
    while time.time() < start_time + 30:
        if condition_function(driver):
            return True
        else:
            time.sleep(0.5)
    raise Exception(
        'Timeout waiting for {}'.format(condition_function.__name__)
    )


# The input is the start page after we login
# The output is the list of all the classes we have on nyu class
def find_class_names(page):
    names = []
    try:
        while '<a class="link-container" href=' in page and len(names) < 10:
            start_link = page.find('<a class="link-container" href=') + 28
            start_url = page.find('"', start_link) + 1
            end_url = page.find('"', start_url) - 1
            starttitle = page.find('"',end_url) + 1
            starttitle = page.find('"',starttitle) + 1
            endtitle = page.find('"',starttitle) - 1
            name = page[starttitle: endtitle + 1]
            names.append(name)
            page = page[endtitle::]
        return names

    except:

        return "The name you searched does not exist in this page"


# The input is the list of all the classes names
# The output is to choosoe one class and click into
# One version is to let user choose a class name
# Another version is to give the function a chosen name by adding a new parameter
def chooselink(namelst):
    classtouse = input("choose the class name from list ")
    shadowHostnew = driver.find_element_by_css_selector('.link-container[title="'+ classtouse +'"]')
    actionChain1 = webdriver.ActionChains(driver).move_to_element(shadowHostnew).click()
    actionChain1.perform()

# The input is the page of one class
# The output is the list of all the tags of this class like Quizzes, Assignments and Announcements etc.
def find_tag_names(page):
    names = []
    try:
        while 'Mrphs-toolsNav__menuitem--link' in page:
            start_link = page.find('Mrphs-toolsNav__menuitem--link ') + 30
            start_url = page.find('"', start_link) + 1
            end_url = page.find('"', start_url) - 1
            starttitle = page.find('"',end_url) + 1
            starttitle = page.find('"',starttitle) + 1
            starttitle = page.find('"', starttitle) + 1
            endtitle = page.find('"',starttitle) - 1
            name = page[starttitle: endtitle + 1]
            names.append(name)
            page = page[endtitle::]
        return names

    except:

        return "The name you searched does not exist in this page"


# The input is the list of all the tags of this class
# The output is to choose one tag and click into it
# One version is to let user choose a tag name
# Another version is to give the function a chosen tag name by adding a new parameter
def choosetag(taglst,driver):
    tagtouse = input("choose the tag name from list ")
    shadowHostnew = driver.find_element_by_css_selector('.Mrphs-toolsNav__menuitem--link[title="'+ tagtouse +'"]')
    actionChain1 = webdriver.ActionChains(driver).move_to_element(shadowHostnew).click()
    actionChain1.perform()


# The input is the quiz page of a class
# The output is the detail of all the unfinished quizzes like Title, Time limit and Due Date
def find_all_quizs(page):
    quizs = []
    quizs.append(['Title', 'Time limit', 'Due Date'])
    try:
        while 'SUBMITTED ASSESMENTS' in page:
            currentquiz = []
            start_link = page.find("assessmentDueDateHeader") + 30
            start_url = page.find('return false', start_link) + 1
            start_name = page.find('>', start_url) + 1
            end_name = page.find('<', start_name) - 1
            title = page[start_name: end_name + 1]
            # find the time
            start_time = page.find('<span class="currentSort">',end_name) + 24
            start_time = page.find('>',start_time) + 1
            end_time = page.find('<',start_time) - 1
            time = page[start_time:end_time + 1]
            # find the due day
            start_due = page.find('<td>',end_time) + 4
            end_due = page.find('</td>',start_due) - 1
            due = page[start_due:end_due+1]
            currentquiz.append(title)
            currentquiz.append(time)
            currentquiz.append(due)
            if (len(due) > 2 and (due[-2:] == 'AM' or due[-2:] == 'PM')):
                quizs.append(currentquiz)
            page = page[end_due::]

        return quizs
    except:
        return ["The name you searched does not exist in this page"]


# The input is the assignment page of one class
# The output is the list of all the unfinished assignments we have with the help of select_assignments
def get_assigments(page,driver):
    assignment_tab = driver.find_element_by_css_selector('a[title="Assignments "]')
    assignment_tab.click()
    assignments_page = driver.page_source
    assignments_rows = driver.find_elements_by_css_selector('table[summary="List of assignments."] tr')[1:]
    newcount = 0
    assignment_list = []
    for r in assignments_rows:
        newcount += save_select_assignments(r)[0]
        assignment_list.append(save_select_assignments(r)[1])
    if newcount == 0:
        print("No Assignments")



# The input is one assignment page of one class
# The ouput is the details of this assignment like title, due date
def select_assignments(r):
    assignments_columns = r.find_elements_by_css_selector('td')
    status = assignments_columns[2].text
    due_date_string = assignments_columns[4].text
    count = 0
    if (due_date_string != ''):
        due_date = time_transform(assignments_columns[4].text)
        if (status == 'Not Started' and due_date > datetime.datetime.now()):
            title = assignments_columns[1].find_element_by_css_selector('a[name="asnActionLink"]').text
            count += 1
    return count

# The input is one assignment page of one class
# The ouput is the details of this assignment like title, due date
def save_select_assignments(r):
    assignments_columns = r.find_elements_by_css_selector('td')
    status = assignments_columns[2].text
    due_date_string = assignments_columns[4].text
    count = 0
    title = "nothing"
    due_date = "noday"
    if (due_date_string != ''):
        due_date = time_transform(assignments_columns[4].text)
        if (status == 'Not Started' and due_date > datetime.datetime.now()):
            title = assignments_columns[1].find_element_by_css_selector('a[name="asnActionLink"]').text
            count += 1
    return [count,[title,due_date]]




# real version
# The input is the assignment page of one class
# The output is the list of all the unfinished assignments we have with the help of select_assignments
def save_get_assigments(page,driver):
    assignment_tab = driver.find_element_by_css_selector('a[title="Assignments "]')
    assignment_tab.click()
    assignments_page = driver.page_source
    assignments_rows = driver.find_elements_by_css_selector('table[summary="List of assignments."] tr')[1:]
    newcount = 0
    all_assignments = []
    for r in assignments_rows:
        if save_select_assignments(r)[1][0] != "nothing":
            newcount += save_select_assignments(r)[0]
            all_assignments.append(save_select_assignments(r)[1])
    if newcount == 0:
        print("No Assignments")
    return all_assignments

#
# The input is the string of the time
# The output is the formalized time
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


# This is the auto version of showing all the unfinished quizzes
# The input is the start page after we log in
# The output is all the unfinished quizzes we have and its details
def show_all_lists_of_quizs(originalsource,driver):
    namelst = find_class_names(originalsource,driver)
    namelst.pop(0)
    for classname in namelst:
        shadowHostnew = driver.find_element_by_css_selector('.link-container[title="'+ classname +'"]')
        actionChain1 = webdriver.ActionChains(driver).move_to_element(shadowHostnew).click()
        actionChain1.perform()
        try:
            shadowHostnew = driver.find_element_by_css_selector('.Mrphs-toolsNav__menuitem--link[title="Tests & Quizzes "]')
            actionChain1 = webdriver.ActionChains(driver).move_to_element(shadowHostnew).click()
            actionChain1.perform()
            newpage = driver.page_source
            quizlst = find_all_quizs(newpage)
            quizlst.pop(0)
            if quizlst[0][0] == "View Only Recorded Scores":
                print("no available quizzes")
            else:
                for i in quizlst:
                    print(i)
        except:
            print("no quizzes for this class")

# This is the auto version of showing all the unfinished assignments
# The input is the start page after we log in
# The output is all the unfinished assignments we have and its details
def get_classes(page,driver):
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

# This is the auto version of showing all the unfinished assignments and quizzes
# The input is the start page after we log in
# The output is all the unfinished assignments and quizzes  we have and its details
def show_all_quizs_assignments(originalsource):
    namelst = find_class_names(originalsource)
    namelst.pop(0)
    for classname in namelst:
        print("Quiz")
        shadowHostnew = driver.find_element_by_css_selector('.link-container[title="'+ classname +'"]')
        actionChain1 = webdriver.ActionChains(driver).move_to_element(shadowHostnew).click()
        actionChain1.perform()
        try:
            shadowHostnew = driver.find_element_by_css_selector('.Mrphs-toolsNav__menuitem--link[title="Tests & Quizzes "]')
            actionChain1 = webdriver.ActionChains(driver).move_to_element(shadowHostnew).click()
            actionChain1.perform()
            newpage = driver.page_source
            quizlst = find_all_quizs(newpage)
            quizlst.pop(0)
            if quizlst[0][0] == "View Only Recorded Scores":
                print("no available quizzes")
            else:
                print(["Title", "Time limit", "Due Date"])
                for i in quizlst:
                    print(i)
        except:
            print("no quizzes for this class")


def show_all_quizs_assignments_v2(originalsource):
    namelst = find_class_names(originalsource)
    namelst.pop(0)
    for classname in namelst:
        print(classname)
        try:
            shadowHostnew = driver.find_element_by_css_selector('.link-container[title="'+ classname +'"]')
            actionChain1 = webdriver.ActionChains(driver).move_to_element(shadowHostnew).click()
            actionChain1.perform()
            print("Assignments")
            classpage = driver.page_source
            get_assigments(classpage)
            print("Quiz")
        except:
            print("No assignments for this class")

        try:
            shadowHostnew = driver.find_element_by_css_selector('.Mrphs-toolsNav__menuitem--link[title="Tests & Quizzes "]')
            actionChain1 = webdriver.ActionChains(driver).move_to_element(shadowHostnew).click()
            actionChain1.perform()
            newpage = driver.page_source
            quizlst = find_all_quizs(newpage)
            quizlst.pop(0)
            if quizlst[0][0] == "View Only Recorded Scores":
                print("no available quizzes")
            else:
                print(["Title", "Time limit", "Due Date"])
                for i in quizlst:
                    print(i)
        except:
            print("no quizzes for this class")


def save_all_quizs_assignments(originalsource,driver):
    namelst = find_class_names(originalsource)
    namelst.pop(0)
    classlist = {}
    for classname in namelst:
        classlist[classname] = {}
        cur_class = []
        cur_class.append(classname)
        quiz = []
        assignment = []
        try:
            shadowHostnew = driver.find_element_by_css_selector('.link-container[title="' + classname + '"]')
            actionChain1 = webdriver.ActionChains(driver).move_to_element(shadowHostnew).click()
            actionChain1.perform()
            classpage = driver.page_source
            assignment = save_get_assigments(classpage,driver)
        except:
            print("meet error in assignments")
            assignment.append(["No assignments"])

        try:
            shadowHostnew = driver.find_element_by_css_selector(
                '.Mrphs-toolsNav__menuitem--link[title="Tests & Quizzes "]')
            actionChain1 = webdriver.ActionChains(driver).move_to_element(shadowHostnew).click()
            actionChain1.perform()
            newpage = driver.page_source
            quizlst = find_all_quizs(newpage)
            quizlst.pop(0)
            if quizlst[0][0] == "View Only Recorded Scores":
                quiz.append(["no available quizzes"])
            else:
                for i in quizlst:
                    quiz.append(i)
        except:
            quiz.append(["No quizs"])
        classlist[classname] = quiz + assignment
    return classlist

def transfer_time(dic):
    for clss in dic:
        # for sec in dic[clss]:
            for info_index in range(len(dic[clss])):
                if len(dic[clss][info_index]) > 1:
                    time = dic[clss][info_index][-1]
                    if type(time) == type("ddfdf"):
                       timelist = time.split()
                       if timelist[0] != "n/a" and len(timelist) > 1:
                          newtime = []
                          newtime.append(dic[clss][info_index][0])
                          if timelist[2] == "PM":
                              newhour = timelist[1][0] + timelist[1][1]
                              newhour = int(newhour)
                              newhour += 12
                              newhour = str(newhour)
                              newexacthour = newhour
                              for i in range(len(timelist[1])-2):
                                  newexacthour += timelist[1][i+2]
                              newtime.append(timelist[0] + "T" + newexacthour)
                          else:
                              newtime.append(timelist[0] + "T" + timelist[1])
                          dic[clss][info_index] = newtime
                    else:
                        timelist = time.strftime('%Y/%m/%d/%I/%M')
                        timelist = timelist.split('/')
                        newtime = []
                        newtime.append(dic[clss][info_index][0])
                        newtime.append(timelist[0] + "-" + timelist[1] + "-" + timelist[2] + "T" +timelist[3] +":"+ timelist[4] + ":00")
                        dic[clss][info_index] = newtime
    return dic

def postTask(createTaskURL, taskSchema):
    response = requests.post(createTaskURL, taskSchema)


def postClass(createClassURL, classnew):
    response = requests.post(createClassURL, classnew)
    return response.json()['_id']

global dic_class
global dic_task
dic_class = {}
dic_task = []
def main(n, p):
    createTaskURL = 'http://localhost:5000/task'
    createClassURL = 'http://localhost:5000/class'
    netid = n
    password = p
    driver = webdriver.Chrome()
    driver.get(url)
    login(netid, password,driver)
    if wait_for(passDUO,driver):
        homepage = driver.page_source
        all_lists = (save_all_quizs_assignments(homepage,driver))
        my_dic = transfer_time(all_lists)
        driver.close()
        driver.quit()
    print(my_dic)
    for class_name in my_dic.keys():
        if class_name in dic_class.keys():
            class_id = dic_class[class_name]
            print("existing one")
            for task in my_dic[class_name]:
                if task[0] != "No quizs" and task[0] != "No Assignments" and task not in dic_task:
                    dic_task.append(task)
                    newtaskSchema = {
                        "user": netid,
                        "name": task[0],
                        "duetime": task[1],
                        "opentime": "",
                        "starttime": "",
                        "finishtime": "",
                        "tag": [],
                        "state": "",
                        "class": class_id,
                        "description": "",
                        "difficulty": 0,
                        "predictiontime": 0,
                        "actualtime": 0
                    }
                    postTask(createTaskURL, newtaskSchema)

        else:
            print("new class one")
            newclassSchema = {
            "name": class_name,
            "user": netid,
            "task": [],
            "deviation": 0
            }
            newclassid = postClass(createClassURL, newclassSchema)
            dic_class[class_name] = newclassid
            for task in my_dic[class_name]:
                if task[0] != "No quizs" and task[0] != "No Assignments" and task not in dic_task:
                    dic_task.append(task)
                    newtaskSchema = {
                        "user": netid,
                        "name": task[0],
                        "duetime": task[1],
                        "opentime": "",
                        "starttime": "",
                        "finishtime": "",
                        "tag": [],
                        "state": "",
                        "class": newclassid,
                        "description": "",
                        "difficulty": 0,
                        "predictiontime": 0,
                        "actualtime": 0
                    }
                    postTask(createTaskURL, newtaskSchema)