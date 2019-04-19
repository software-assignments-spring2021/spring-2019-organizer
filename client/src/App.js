import React, { Component } from 'react';
import { BrowserRouter as Router, Route} from "react-router-dom";
import Sidebar from './components/Sidebar';
import Schedule from './components/Schedule';
import Profile from './components/Userprofile/Profile';
import Settingpage from './components/Settingpage';
import Figures from './components/Figures';

//const testprofile = 'https://raw.githubusercontent.com/nyu-software-engineering/organizer/master/documentation/web_mockup_Mark/home_page.png';

class App extends Component {

  render() {
    return (
      <Router>
        <div className="App">
          <Sidebar />
          <Profile name = "Mark" major='Computer Science'/>
          <Route exact path="/" />
          <Route path="/schedules" component={Schedule} />
          <Route path="/tags" />
          <Route path="/analysis" component={Figures}/>
          <Route path="/setting" component={Settingpage} 
          />
        </div>
      </Router>
    );
  }
}


export default App;
