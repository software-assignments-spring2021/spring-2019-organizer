import React, { Component } from 'react';
import Events from './Timeline/Events';
import TimeBlock from './TimeBlock';
import CompleteTable from './CompleteTable';

const testArray = {'March 23':["1", "2"], "April 2":["3"], "May 19":["4"]};
class Schedule extends Component {
  constructor(){
    super();
    this.state = {
      schedules: [ { date: 'Mar 10 2019', estimatedTime: '4:30 Hrs',
      taskList: [{taskName:'Task 1',taskEstimated:'1:30 Hrs', taskDuedate: '3/20/2019'},
      {taskName:'Task 2',taskEstimated:'1:30 Hrs', taskDuedate: '3/20/2019'},
      {taskName:'Task 3',taskEstimated:'1:30 Hrs', taskDuedate: '3/20/2019'}]} ],
      fixedList: []
    };
  }

  componentDidMount() {
    fetch('/schedules')
    .then(res => res.json())
    .then(data => {
      this.setState({
        schedules: data.schedules
      })
    })
    .catch(err => {
        console.log(err);
    })
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
        { this.state.schedules.map(schedule => 
            <TimeBlock 
            date={schedule.date} 
            estimatedTime={schedule.estimatedTime}
            taskList={schedule.taskList}
            handleDone={this.handleDone.bind(this)}
            />
        ) }
        <h3 className="completed">completed event list</h3>
        <CompleteTable fixedList={this.state.fixedList}/>
      </div>
    );
  }
}

export default Schedule;