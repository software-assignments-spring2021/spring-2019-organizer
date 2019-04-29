from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.chrome.options import Options
from selenium.common.exceptions import StaleElementReferenceException, NoSuchElementException
import time
import datetime
# from info import netid, password

# insert your netid and password here for now
# We will have a better version
netid = "tz904"
password = "885600JJjj!"



url = 'http://newclasses.nyu.edu'
month_table = {'Jan': 1, 'Feb': 2, 'Mar': 3, 'Apr': 4, 'May': 5, 'Jun': 6, 'Jul': 7, 'Aug': 8, 'Sep': 9, 'Oct': 10, 'Nov': 11, 'Dec': 12}


# n represents netid
# p represents password
# The outcome is the fill in the log-in page automatically and click to go to the duo verfication page
def login(n, p):
    netidBox = driver.find_element_by_id('netid')
    passwordBox = driver.find_element_by_id('password')
    submitBtn = driver.find_element_by_css_selector('button[name="_eventId_proceed"]')
    netidBox.clear()
    netidBox.send_keys(n)
    passwordBox.clear()
    passwordBox.send_keys(p)
    submitBtn.click()
#
# # This function is to find the duo-button to click
# def click_Push():
#     shadowHost = driver.find_element_by_id('duo_iframe')
#     for i in range(400, 500, 10):
#         for j in range(0, 140, 10):
#             actionChain = webdriver.ActionChains(driver).move_to_element_with_offset(shadowHost, i, j).click()
#             actionChain.perform()

# This function is to check if we can find the duo location
def passDUO():
    try:
        driver.find_element_by_id('duo_iframe')
        return False
    except StaleElementReferenceException:
        return True
    except NoSuchElementException:
        return True

# This function to force quit if we wait for too long
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
    print(namelst)
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
def choosetag(taglst):
    print(taglst)
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
            #print(page[start_time:start_time+26])
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
            quizs.append(currentquiz)
            page = page[end_due::]
            return quizs
    except:
        return ["The name you searched does not exist in this page"]


# The input is the assignment page of one class
# The output is the list of all the unfinished assignments we have with the help of select_assignments
def get_assigments(page):
    assignment_tab = driver.find_element_by_css_selector('a[title="Assignments "]')
    assignment_tab.click()
    assignments_page = driver.page_source
    assignments_rows = driver.find_elements_by_css_selector('table[summary="List of assignments."] tr')[1:]
    newcount = 0
    for r in assignments_rows:
        newcount += select_assignments(r)
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
            # attachmant = assignments_columns[0]
            # open_date = assignments_columns[3]
            title = assignments_columns[1].find_element_by_css_selector('a[name="asnActionLink"]').text
            print(title, due_date)
            count += 1
    return count

# The input is the assignment page of one class
# The output is the list of all the unfinished assignments we have with the help of select_assignments
def save_get_assigments(page):
    assignment_tab = driver.find_element_by_css_selector('a[title="Assignments "]')
    assignment_tab.click()
    assignments_page = driver.page_source
    assignments_rows = driver.find_elements_by_css_selector('table[summary="List of assignments."] tr')[1:]
    newcount = 0
    all_assignments = []
    for r in assignments_rows:
        newcount += select_assignments(r)[0]
        all_assignments.append(select_assignments(r)[1])
    if newcount == 0:
        print("No Assignments")
    return all_assignments

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
            # attachmant = assignments_columns[0]
            # open_date = assignments_columns[3]
            title = assignments_columns[1].find_element_by_css_selector('a[name="asnActionLink"]').text
            print(title, due_date)
            count += 1
    return [count,[title,due_date]]

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
def show_all_lists_of_quizs(originalsource):
    namelst = find_class_names(originalsource)
    namelst.pop(0)
    print(["Title", "Time limit","Due Date"])
    for classname in namelst:
        print(classname)
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

# This is the auto version of showing all the unfinished assignments and quizzes
# The input is the start page after we log in
# The output is all the unfinished assignments and quizzes  we have and its details
def show_all_quizs_assignments(originalsource):
    namelst = find_class_names(originalsource)
    namelst.pop(0)
    for classname in namelst:
        print(classname)
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


def save_all_quizs_assignments(originalsource):
    namelst = find_class_names(originalsource)
    namelst.pop(0)
    classlist = {}
    for classname in namelst:
        classlist[classname] = {};
        cur_class = []
        cur_class.append(classname)
        quiz = []
        assignment = []
        try:
            shadowHostnew = driver.find_element_by_css_selector('.link-container[title="' + classname + '"]')
            actionChain1 = webdriver.ActionChains(driver).move_to_element(shadowHostnew).click()
            actionChain1.perform()
            classpage = driver.page_source
            assignment.append(save_get_assigments(classpage))
        except:
            assignment.append(["No assignments"])
            print("No assignments for this class")

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
        classlist[classname]["Quiz"] = quiz;
        classlist[classname]["Assignment"] = assignment;
        # cur_class.append(quiz)
        # cur_class.append(assignment)
        # classlist.append(cur_class)
    return classlist

# The following is the main function
# driver = webdriver.Chrome()
# driver.get(url)
# login(netid, password)
# # click_Push()
# if wait_for(passDUO):
#     # originalsource = driver.page_source
#     homepage = driver.page_source
#     # show_all_quizs_assignments_v2(homepage)
#     all_lists = (save_all_quizs_assignments(homepage))
#     print(all_lists)
#     #get_classes(homepage)
#     driver.close()
#     driver.quit()

list_get = {'Artificial Intelligence, Section 001': {'Quiz': [['No quizs']], 'Assignment': [['No assignments']]},
            'AIT - 008 SP19': {'Quiz': [['Quiz 01 (optional, no due date)', 'n/a', 'n/a']], 'Assignment': [['No assignments']]},
            'Spring 2019 Pre-Orientation Modules': {'Quiz': [['Budgets', 'n/a', '2019-10-04 1:45 AM']], 'Assignment': [['No assignments']]},
            'ICP  s1s2 Fall2017': {'Quiz': [['no available quizzes']], 'Assignment': [['No assignments']]},
            'Data Structures Spring 2018': {'Quiz': [['no available quizzes']], 'Assignment': [['No assignments']]},
            'Basic Algorithms, Section 005': {'Quiz': [['Homework 09, test-part, practice', 'n/a', '2019-11-13 12:00 AM']], 'Assignment': [['No assignments']]},
            'Intro to Econometrics, Section 004': {'Quiz': [['No quizs']], 'Assignment': [['No assignments']]}}

timemodel = "2019-05-10T08:00 yyyy-mm-ddThh:ss"
def transfer_time(dic):
    for clss in dic:
        for sec in dic[clss]:
            for info_index in range(len(dic[clss][sec])):
                if len(dic[clss][sec][info_index]) > 1:
                    time = dic[clss][sec][info_index][2]
                    timelist = time.split()
                    if timelist[0] != "n/a":
                        newtime = timelist[0] + "T" + timelist[1] + timelist[2]
                        dic[clss][sec][info_index] = newtime
    return dic
print(transfer_time(list_get));
