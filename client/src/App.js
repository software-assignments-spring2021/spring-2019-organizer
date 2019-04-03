import React, { Component } from 'react';
import Sidebar from './components/Sidebar';
import TimeBlock from './components/TimeBlock';

import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <body>
          <Sidebar />
          <TimeBlock />
        </body>
      </div>
    );
  }
}


export default App;
