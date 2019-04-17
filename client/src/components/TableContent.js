import React, { Component } from 'react'
import { Row, Col, Button } from 'react-bootstrap';
import Change from './Change';
import '../css/TimeBlock.css';

class TableContent extends Component {
  constructor(){
    super();
    this.state = {
      isStarted: false,
      isDone: false // need to initiate
    };
  }

  handleStart = () => {
    this.setState({isStarted: true}); // to delete after connect to db
<<<<<<< HEAD
    fetch('/task', {
      method: 'UPDATE',
=======
    fetch('/start', {
      method: 'POST',
>>>>>>> task edit/delete/done refined, difficulty added
      body: JSON.stringify({taskid: 'somestring'}), // set taskid
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(res => res.json())
<<<<<<< HEAD
		.then((data) => console.log(data))
=======
		.then((data) =>  console.log(data))
>>>>>>> task edit/delete/done refined, difficulty added
    .catch((err)=>console.log(err))
  }
  
  handleDone = () => {
    this.setState({isDone: true});
    fetch('/done', {
<<<<<<< HEAD
      method: 'UPDATE',
=======
      method: 'POST',
>>>>>>> task edit/delete/done refined, difficulty added
      body: JSON.stringify({taskid: 'somestring'}), // set taskid
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(res => res.json())
<<<<<<< HEAD
		.then((data) => console.log(data))
=======
		.then((data) =>  console.log(data))
>>>>>>> task edit/delete/done refined, difficulty added
    .catch((err)=>console.log(err))
  }

  render() {
    return (
      <Row bsPrefix={this.state.isDone ? "row done" : "row"}>
          <Col>
            <p ref='subject'>{this.props.task.class}</p>
          </Col>
          <Col>
            <p ref='Name'> {this.props.task.name}</p>
          </Col>
          <Col>
            <p ref='Estimated'> {this.props.task.estimated} Hours</p>
          </Col>
          <Col>
            {this.props.task.tag.map(tag => 
<<<<<<< HEAD
              <font ref='Tag' color={tag.color}> {tag.name}</font>
=======
              <span ref='Tag'> {tag}</span>
>>>>>>> task edit/delete/done refined, difficulty added
            )}
          </Col>
          <Col>
            <Button variant="light" size="sm" disabled={this.state.isStarted || this.state.isDone} onClick={this.handleStart}>
              <ion-icon name="arrow-dropright-circle"></ion-icon>
            </Button> 
            <Button ref="start" variant="light" disabled={this.state.isDone} size="sm" onClick={this.handleDone}>
              <ion-icon name="checkmark-circle-outline"></ion-icon>
            </Button> 
            <Change disabled={this.state.isDone} task={this.props.task}/>
            <Button variant="light" size="sm" disabled={this.state.isDone} onClick={this.props.handleDelete}>
              <ion-icon name="trash"></ion-icon>
            </Button>
          </Col>
      </Row>
    )
  }

}

export default TableContent;