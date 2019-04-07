import React, { Component } from 'react';
import Sidebar from './components/Sidebar';
import Events from './components/Timeline/Events';
import TimeBlock from './components/TimeBlock';
import CompleteTable from './components/CompleteTable';

import './App.css';
const testArray = {'March 23':["1", "2"], "April 2":["3"], "May 19":["4"]};

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
          <Sidebar />
          <Events eventArray={testArray}/>
          <h3 className="ongoing">Ongoing Event List</h3>
          <TimeBlock 
            handleDone={this.handleDone.bind(this)}
          />
          <h3 className="completed">Completed Event List</h3>
          <CompleteTable 
            fixedList={this.state.fixedList}
          />
        {/* </body> */}
      </div>
    );
  }
}


export default App;
