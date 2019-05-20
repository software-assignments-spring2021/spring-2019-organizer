# Organizer


![build](https://travis-ci.com/nyu-software-engineering/organizer.svg?branch=master)

## Table of Contents:

  - [1. Description](#1-description)
  - [2. History](#2-history)
  - [3. How to contribute](#3-how-to-contribute)
  - [4. Building and Testing](#4-building-and-testing)
    - [4.1 Development Code Building](#41-development-code-building)
    - [4.2 How To Use](#42-how-to-use)
    - [4.3 How to read our analysis](#43-how-to-read-our-analysis)
    - [4.4 Testing](#44-testing)
  - [5. Additional Links](#5-additional-links)
  - [6. Authors](#6-authors)

<a name="desc"></a>

## 1. Description
   <p>Organizer is a web application that tracks down students' assignments from NYU Classes and organize them into a website so students do not neccessarily have to log in to NYU Classes and check for assignments for each of their courses. The web app also intends to provide insights on students' performance on doing different assignments. Additionally, it provides a time prediction on finishing upcoming tasks. This application is designed to help students make the most out of their time.</p>
  
<a name="hist"></a>

## 2. History
   <p>As NYU students who are aware of how time consuming tracking down all assignments from NYU Classes can be. We would like to develop a tool to help students organize upcoming assignments so that they do not have to constantly log into NYUClasses and check for new published assignments.</p>
   
<a name="htocontri"></a>

## 3. How to contribute
   <p>Please refer to the following link regarding for more contributing information </p>
  
   [CONTRIBUBTING.md](https://github.com/nyu-software-engineering/organizer/blob/master/CONTRIBUTING.md)
  
<a name="buildtest"></a>

## 4. Building and Testing

> **IMPORTANT:** Our application requires *NYU NetID* and *password*. To see how our application works, refer to the build steps in the section below. The testing data on the front page (/schedules) is for presenting purpose in case that there are not much upcoming tasks on NYUClasses as the semester comes to an end. Our code uses port 3000 and 5000, please make sure these two ports are available for use.

<a name="build"></a>

### 4.1 Development Code Building

   > **Important: Please make sure you turn on the 'automatically-push' function on DUO and respond to the push within 30s**.
   
   1. Clone our repository
   2. Enter the directory by `cd organizer`
   3. Please be aware of our directory structure:
      <pre>
      .
      ├── client
      │   ├── public
      │   └── src
      │       ├── __tests__
      │       ├── components
      │       └── css
      ├── documentation
      │   ├── web_mockup_Mark
      │   └── wireframe
      └── server
         ├── crawler
         │   └── scripts
         ├── src
         └── test
      </pre>
   4. First run our server: 
      1. from commandline, do `cd server`
      2. install dependencies by `npm install` and then `python3 install -r requirements.txt`.
      3. run the server: go to src directory (`cd src`) and run `node app.js`.
   5. Open another terminal to run the front-end react application:
      1. go to the client directory (path/to/organizer/client)
      2. install or dependencies by running `npm install`
      3. start the react application by `npm start`
   6. Please **DO NOT USE** `npm audit fix`

<a name="use"></a>

### 4.2 How To Use
1. Open a broswer and go to `http://localhost:3000`, this will lead you to a google sign-in page. Please choose one of your google account to continue.
2. Go to the setting page (`http://localhost:3000/setting`) enter your prefered username and NetID and Password. This will open a new Chrome window to crawl your upcoming assignments where due date is larger than the current date.
3. The schedules page (`http://localhost:3000/schedules`) contains the information about all your upcoming assignments. Please refresh the page if there has been an css error (sometimes happens). Here is a list of what you could do:
   1. view all tasks in the next two weeks in the timeline
   2. check your stress level
   3. to create a new task, click 'add new task' and input task information. The 'predicted time' is the amount of time you plans to spend on the task.
   4. to acquire an actual time spent on a task, we recommend users to click the 'play' button on a task and then click again 'finish' when done to help our analysis. This will our analysis
   5. You can delete a task (the 'trash button') or edit a task (the 'pen' button).
4. In the tags and subjects page, you can view the set of tasks for a specific category you choose. You can also manage your tags by clicking 'manage tags'.
5. The analysis page (`http://localhost:3000/analysis`) invloves different types of figures to help students to get insights of their time management.

<a name="analysis"></a>

### 4.3 How to read our analysis

> Our application provides various ways to help students to have a better sense of their deadlines. The schedules page shows some tasks and displays a timeline and a stress level gauge. The analysis page serves 3 kinds of figures. The first two provides insight into how well students can predict workload on assignments. The third figure shows the timestamp when a student puts a task as `done'. The fourth figure uses some algorithm to predict the percentages of time to spend on each course in the coming week.


<a name="test"></a>

### 4.4 Testing
   To run frontend tests, make sure you are in `client` directory.
  
  * Run unit tests: <code>npm test</code>
  * Run unit-test-coverage: <code>npm test -- --coverage</code>(notice the double dashes in the middle)
  
<a name="addlink"></a>  

## 5. Additional Links
  
  Links to our webpage mock-ups and wireframes:

  [mock-ups](documentation/web_mockup_Mark/mockup.md)

  [wireframe](documentation/wireframe)
  
<a name="athr"></a>

## 6. Authors

[Angela Luo](https://github.com/aqlangela)

[Eric Chen](https://github.com/Zerichen)

[Mark Zeng](https://github.com/Mark-Zeng)

[Michael Zhang](https://github.com/MichaelZhangty)

[Junno Yau](https://github.com/jq488)

