import React, { Component } from 'react';
import Sidebar from './components/Sidebar';
import Events from './components/Timeline/Events';
import './App.css';
const testArray = ['March 23', "April 2", "May 19"];

class App extends Component {
  render() {
    return (
      <div className="App">
          <Sidebar />
          <Events eventArray={testArray}/>
      </div>
    );
  }
}


export default App;
