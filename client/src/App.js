import React, { Component } from 'react';
import Sidebar from './components/Sidebar';
import TimeBlock from './components/TimeBlock';
import CompleteTable from './components/CompleteTable';

import './App.css';

class App extends Component {
  constructor(){
    super();
    this.state = {
        fixedList:[]
    }
  }


  handleDone(taski){
    var newList = this.state.fixedList
    newList.push(taski)
    this.setState({
      fixedList:newList
    })
  }

  render() {
    return (
      <div className="App">
        <body>
          <Sidebar />
          <h3 className="ongoing">ongoing event list</h3>
          <TimeBlock 
            handleDone={this.handleDone.bind(this)}
          />
          <h3 className="completed">completed event list</h3>
          <CompleteTable 
            fixedList={this.state.fixedList}
          />
        </body>
      </div>
    );
  }
}


export default App;
