import React, { Component } from 'react';
import { BrowserRouter as Router, Route} from "react-router-dom";
import Sidebar from './components/Sidebar';
import Schedule from './components/Schedule';

import './App.css';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Sidebar />
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
