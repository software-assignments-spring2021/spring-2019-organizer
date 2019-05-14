<h1>Organizer</h1>

![build](https://travis-ci.com/nyu-software-engineering/organizer.svg?branch=master)

<h2>Description</h2>
  <p>Organizer is a web application that tracks down students' assignments from NYU Classes and organize them into a website so students do not neccessarily have to log in to NYU Classes and check for assignments for each of their courses. The web app also intends to provide insights on students' performance on doing different assignments. Additionally, it provides a time prediction on finishing upcoming tasks. This application is designed to help students make the most out of their time.</p>
  
  
 <h2>History</h2>
 <p>As NYU students who are aware of how time consuming tracking down all assignments from NYU Classes can be. We would like to develop a tool to help students organize upcoming assignments so that they do not have to constantly log into NYUClasses and check for new published assignments.</p>
 
 
  <h2>How to contribute</h2>
  <p>Please refer to the following link regarding for more contributing information </p>
  
  [CONTRIBUBTING.md](https://github.com/nyu-software-engineering/organizer/blob/master/CONTRIBUTING.md)
  
 <h2>Building and Testing </h2>

> **IMPORTANT:** Our application requires *NYU NetID* and *password*. Since we do not have done anything to protect user information, **PLEASE DO NOT INPUT YOUR NYU ACCOUNT INFORMATION**. To see how our application works, refer to the build steps in the section below. The data is for testing purpose only from our database deployed on mlab.

<h4>Development Code Building and Testing</h4>
  
   1. Clone our repository
   2. Please be aware of our directory structure:
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
   3. First run our server: from commandline, do `cd server` and install dependencies by `npm install`. Go to src (`cd src`)and run `node app.js`
   4. Then go to the client directory (`cd client`) install or dependencies by running `npm install` and then `npm start`
   5. Please **DO NOT USE** `npm audit fix`

## How to read our analysis:

> Our application provides various ways to help students to have a better sense of their deadlines. The schedules page shows some tasks and displays a timeline and a stress level gauge. The analysis page serves 3 kinds of figures. The first two provides insight into how well students can predict workload on assignments. The third figure shows the timestamp when a student puts a task as `done'. The fourth figure uses some algorithm to predict the percentages of time to spend on each course in the coming week.
<h4>Testing</h4>
   To run frontend tests, make sure you are in `client` directory.
  
  * Run unit tests: <code>npm test</code>
  * Run unit-test-coverage: <code>npm test -- --coverage</code>(notice the double dashes in the middle)
  
   
  <h2>Additional Links</h2>
  
  Links to our webpage mock-ups and wireframes:

  [mock-ups](documentation/web_mockup_Mark/mockup.md)

  [wireframe](documentation/wireframe)
  
  <h2>Authors</h2>

[Angela Luo](https://github.com/aqlangela)

[Eric Chen](https://github.com/Zerichen)

[Mark Zeng](https://github.com/Mark-Zeng)

[Michael Zhang](https://github.com/MichaelZhangty)

[Junno Yau](https://github.com/jq488)

