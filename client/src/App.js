import React, { Component } from 'react';
import Sidebar from './components/Sidebar';
import EventDot from './components/Timeline/EventDot';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
          <Sidebar />
          <EventDot position='200px'/>
      </div>
    );
  }
}


export default App;
