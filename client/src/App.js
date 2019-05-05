import React, { Component } from 'react';
import { BrowserRouter as Router, Route} from "react-router-dom";
import Sidebar from './components/Sidebar';
import Schedule from './components/Schedule';
import Settingpage from './components/Settingpage';
import Figures from './components/Figures';
import Timeline from './components/Timeline';
import Stress from './components/Stress';
// import {GoogleLogin} from 'react-google-login';
// import config from './config.json';
import './css/Timeline.css';

//const testprofile = 'https://raw.githubusercontent.com/nyu-software-engineering/organizer/master/documentation/web_mockup_Mark/home_page.png';

class App extends Component {

  render() {
    
    return (
      
      <Router>
        <div className="App">
          <Sidebar />
          <Stress value={68} />
          <Timeline />
          <Route path="/schedules" component={Schedule} />
          <Route path="/subject/:subject" component={Schedule} />
          <Route path="/tag/:tag" component={Schedule} />
          <Route path="/analysis" component={Figures}/>
          <Route path="/setting" component={Settingpage} 
          />
        </div>
      </Router>
    );
  }
}


export default App;
