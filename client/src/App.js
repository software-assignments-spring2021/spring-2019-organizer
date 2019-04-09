import React, { Component } from 'react';
import { BrowserRouter as Router, Route} from "react-router-dom";
import Sidebar from './components/Sidebar';
import Schedule from './components/Schedule';
import Profile from './components/Userprofile/Profile';

import './App.css';

const testprofile = 'https://raw.githubusercontent.com/nyu-software-engineering/organizer/master/documentation/web_mockup_Mark/home_page.png';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Sidebar />
          <Profile image={testprofile}/>
          <Route exact path="/" />
          <Route path="/schedules" component={Schedule} />
          <Route path="/tags" />
          <Route path="/analysis" />
        </div>
      </Router>
    );
  }
}


export default App;
