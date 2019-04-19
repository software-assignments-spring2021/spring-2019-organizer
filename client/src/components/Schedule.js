import React, { Component } from 'react';
import Events from './Timeline/Events';
import TimeBlock from './TimeBlock';

const testArray = {'March 23':["1", "2"], "April 2":["3"], "May 19":["4"]};
class Schedule extends Component {
  constructor(){
    super();
    this.state = {
      schedules: {
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
      '2019-05-10' : [{ class: 'Agile Software Development', name: 'HW10', duetime: '2019-05-10T08:00', estimated: 1.5, tag: ['homework'], difficulty: 2},
      { class: 'Machine Learning', name: 'Homework 3', duetime: '2019-05-10T08:00', estimated: 8, tag: ['homework', 'haha'], difficulty: 5}],
      '2019-05-15': [{ class: 'SSPC', name: 'Final Paper', duetime: '2019-05-15T15:30', estimated: 5, tag: ['homework'], difficulty: 4}]
=======
      '04/18/2019' : [{ subject: 'Agile Software Development', name: 'HW10', date: '04/18/2019', estimated: 1.5, type: 'homework', text: '' }],
      '05/02/2019': [{ subject: 'Machine Learning', name: 'Homework 3', date: '05/02/2019', estimated: 8, type: 'homework', text: '' }],
      '01/01/2020': [{ subject: 'SSPC', name: 'Final Paper', date: '01/01/2020', estimated: 5, type: 'homework', text: '' }]
>>>>>>> remove redundant codes
=======
      '2019-05-10' : [{ class: 'Agile Software Development', name: 'HW10', duetime: '2019-05-10T08:00', estimated: 1.5, tag: ['homework'], difficulty: 2},
      { class: 'Machine Learning', name: 'Homework 3', duetime: '2019-05-10T08:00', estimated: 8, tag: ['homework', 'haha'], difficulty: 5}],
      '2019-05-15': [{ class: 'SSPC', name: 'Final Paper', duetime: '2019-05-15T15:30', estimated: 5, tag: ['homework'], difficulty: 4}]
>>>>>>> task edit/delete/done refined, difficulty added
=======
      '2019-05-10' : [{ class: 'Agile Software Development', name: 'HW10', duetime: '2019-05-10T08:00', estimated: 1.5, tag: [{name:'homework',color:'pink'}], difficulty: 2},
      { class: 'Machine Learning', name: 'Homework 3', duetime: '2019-05-10T08:00', estimated: 8, tag: [{name:'homework',color:'pink'}, {name:'else',color:'purple'}], difficulty: 5}],
      '2019-05-15': [{ class: 'SSPC', name: 'Final Paper', duetime: '2019-05-15T15:30', estimated: 5, tag: [{name:'homework',color:'pink'}], difficulty: 4}]
>>>>>>> tag color and multiselection updated
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

  handleDelete(key) {
    delete this.state.schedules[key];
    this.setState({schedules: this.state.schedules});
  }
    
  render() {
    return (
      <div className="Schdule">
        <Events eventArray={testArray}/>
        { Object.keys(this.state.schedules).map((key, index) =>
            <TimeBlock 
            key={key}
            date={key}
            tasks={this.state.schedules[key]}
            handleDelete={this.handleDelete.bind(this, key)}
            />
        ) }
      </div>
    );
  }
}

export default Schedule;