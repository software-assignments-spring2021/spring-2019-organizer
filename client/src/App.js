import React, { Component } from 'react';
import Sidebar from './components/Sidebar';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <body>
          <Sidebar />
        </body>
      </div>
    );
  }
}


export default App;
