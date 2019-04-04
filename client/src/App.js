import React, { Component } from 'react';
import Sidebar from './components/Sidebar';
import Events from './components/Timeline/Events';
import TimeBlock from './components/TimeBlock';

import './App.css';
const testArray = {'March 23':["1", "2"], "April 2":["3"], "May 19":["4"]};

class App extends Component {
  render() {
    return (
      <div className="App">
          <Sidebar />
          <Events eventArray={testArray}/>
          <TimeBlock />
      </div>
    );
  }
}


export default App;
