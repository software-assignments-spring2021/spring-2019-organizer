import React, { Component } from 'react';
import TimeBlock from './Timeblock/TimeBlock';
import '../css/Schedule.css';

class Schedule extends Component {
  constructor(props){
    super(props);
    this.state = {
      subjectFilter: props.match.params !== {} ? props.match.params.subject : '',
      tagFilter: props.match.params !== {} ? props.match.params.tag : '',
      schedules: {
      '2019-05-10' : [{ _id: "", classname: 'Agile Software Development', name: 'HW10', duetime: '2019-05-10T08:00', predictiontime: 1.5, tag: [{_id: "", name:'homework',color:'pink'}], difficulty: 2, state: false, starttime: '...'},
      { _id: "", classname: 'Machine Learning', name: 'Homework 3', duetime: '2019-05-10T08:00', predictiontime: 8, tag: [{_id: "", name:'homework',color:'pink'}, {name:'else',color:'purple'}], difficulty: 5, state: false, starttime: ''}],
      '2019-05-15': [{ _id: "", classname: 'SSPC', name: 'Final Paper', duetime: '2019-05-15T15:30', predictiontime: 5, tag: [{_id: "", name:'homework',color:'pink'}], difficulty: 4, state: true, starttime: ''}]
      }
    };
  }

  componentDidMount() {
    Promise.all([
      fetch('/schedule'),
      fetch('/class'),
    ]).then(([schedules, classes]) => {
      let newSchedules = {};
      for (const obj of schedules) {
        const due = obj.duetime.slice(0,10);
        let class_name;
        for (const class_obj of classes) {
          if (class_obj._id === obj.class)
            class_name = class_obj.name;
        }
        due.classname = class_name;
        if (newSchedules.hasOwnProperty(due)) {
          newSchedules[due].push(obj);
        } else {
          newSchedules[due] = [obj];
        }
      }
      this.setState({ schedules: newSchedules });
    }).catch((err) => {
      console.log(err);
    });
  }
    
  handleDelete(key) {
    delete this.state.schedules[key];
    this.setState({schedules: this.state.schedules});
  }

  handleUpdate(idx, updateInfo) {
    console.log(updateInfo);
    const key = updateInfo.duetime.slice(0,10);
    const schedules_old = this.state.schedules;

    if (schedules_old.hasOwnProperty(key)) {
      schedules_old[key].splice(idx, 0, updateInfo);
    } else { 
      schedules_old[key] = [updateInfo];
    }

    const schedules_new = this.sortByDate(schedules_old);
    this.setState({
      schedules: schedules_new
    });
    console.log(this.state.schedules);
  }

  handleSave(saveInfo) {
    const key = saveInfo.duetime.slice(0,10);
    const schedules_old = this.state.schedules;
    if (schedules_old.hasOwnProperty(key)) {
      schedules_old[key].push(saveInfo);
    } else {
      schedules_old[key] = [saveInfo];
    }

    const schedules_new = this.sortByDate(schedules_old);
    this.setState({
      schedules: schedules_new
    });
  }
    
  sortByDate(unordered) {
    const ordered = {};

    Object.keys(unordered).sort().forEach(function(key) {
      ordered[key] = unordered[key];
    });

    return ordered;
  }

  filter(oldSchedules) {
    if (this.state.subjectFilter !== undefined || this.state.tagFilter !== undefined) {
      let newSchedules = {};
      if (this.state.subjectFilter !== undefined) {
        const filter = this.state.subjectFilter;
        for (const key of Object.keys(oldSchedules)) {
          const arr = oldSchedules[key].filter(obj => {
              return obj.class === filter;
          });
          if (arr.length !== 0) {
              newSchedules[key] = arr;
          }
        }
      } 

      else if (this.state.tagFilter !== undefined) {
        const filter = this.state.tagFilter;
        for (const key of Object.keys(oldSchedules)) {
          const arr = oldSchedules[key].filter((obj, idx) => {
              let index = null;
              for (let tag of obj.tag) {
                if (tag.name === filter) {
                  index = idx;
                }
              }
              return index !== null;
          });
          if (arr.length !== 0) {
              newSchedules[key] = arr;
          }
        }
        
      }
      
      return newSchedules;
    }

    else {
      return oldSchedules;
    }
  }
  

  render() {
    let schedules = this.state.schedules;
    schedules = this.filter(schedules);
    schedules = this.sortByDate(schedules);

    let subjectFlag = false;
    let subject = "";
    let tagFlag = false;
    let tag = "";

    if (this.state.subjectFilter !== undefined) {
      subjectFlag = true;
      subject = this.state.subjectFilter;
    }
    else if (this.state.tagFilter !== undefined) {
      tagFlag = true;
      tag = this.state.tagFilter;
    }

    return (
      <div className="Schdule">

        <h4 id="title"> 
          {subjectFlag ? `Tasks for ${subject}` : ""} 
        </h4>

        <h4 id="title"> 
          {tagFlag ? `Tasks for ${tag}` : ""} 
        </h4>
        
        { Object.keys(schedules).map((key, index) =>
            <TimeBlock 
            key={key}
            date={key}
            tasks={schedules[key]}
            handleDelete={this.handleDelete.bind(this, key)}
            handleUpdate={this.handleUpdate.bind(this)}
            handleSave={this.handleSave.bind(this)}
            />
        ) }
      </div>
    );
  }
}

export default Schedule;