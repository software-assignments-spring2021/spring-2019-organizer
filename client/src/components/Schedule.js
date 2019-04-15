import React, { Component } from 'react';
import Events from './Timeline/Events';
import TimeBlock from './TimeBlock';
// import CompleteTable from './CompleteTable';

const testArray = {'March 23':["1", "2"], "April 2":["3"], "May 19":["4"]};
class Schedule extends Component {
  constructor(){
    super();
    this.state = {
      schedules: {
      '04/18/2019' : [{ class: 'Agile Software Development', name: 'HW10', date: '04/18/2019', estimated: 1.5, tag: ['homework'], text: '' }],
      '05/02/2019': [{ class: 'Machine Learning', name: 'Homework 3', date: '05/02/2019', estimated: 8, tag: ['homework'], text: '' }],
      '01/01/2020': [{ class: 'SSPC', name: 'Final Paper', date: '01/01/2020', estimated: 5, tag: ['homework'], text: '' }]
      }
    };
  }

  componentDidMount() {
    fetch('/schedules')
    .then(res => res.json())
    .then(data => {
      this.setState({
        tasks: data.tasks
      });
    })
    .catch(err => {
        console.log(err);
    });
  }
    
  handleDone(taski){
    var newList = this.state.fixedList;
    newList.push(taski);
    this.setState({
      fixedList:newList
    });
  }
    
  render() {
    return (
      <div className="Schdule">
        <Events eventArray={testArray}/>
        <h3 className="ongoing">ongoing event list</h3>
        { Object.keys(this.state.schedules).map((key, index) =>
            <TimeBlock 
            key={key}
            date={key}
            tasks={this.state.schedules[key]}
            handleDone={this.handleDone.bind(this)}
            />
        ) }
      </div>
    );
  }
}

export default Schedule;