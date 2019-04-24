import React, { Component } from 'react'
import { Row, Col, Button } from 'react-bootstrap';
import Change from './Change';
import '../css/TimeBlock.css';

class TableContent extends Component {
  constructor(){
    super();

    this.handleUpdate = this.handleUpdate.bind(this);
    this.handleSave = this.handleSave.bind(this);

    this.state = {
      isStarted: false,
      isDone: false // need to initiate
    };
  }

  handleStart = () => {
    this.setState({isStarted: true}); // to delete after connect to db
    fetch('/task', {
      method: 'UPDATE',
      body: JSON.stringify({taskid: 'somestring'}), // set taskid
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(res => res.json())
		.then((data) => console.log(data))
    .catch((err)=>console.log(err))
  }

  handleUpdate(undateInfo) {
    this.props.handleUpdate(undateInfo);
  }

  handleSave(saveInfo) {
    this.props.handleSave(saveInfo);
  }
  
  handleDone = () => {
    this.setState({isDone: true});
    fetch('/done', {
      method: 'UPDATE',
      body: JSON.stringify({taskid: 'somestring'}), // set taskid
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(res => res.json())
		.then((data) => console.log(data))
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
            {this.props.task.tag.map((tag, i) => 
              <font 
                key={i}
                ref='Tag' 
                color={tag.color}
              > 
                {tag.name}
              </font>
            )}
          </Col>
          <Col>
            <Button 
              variant="light" 
              size="sm" 
              disabled={this.state.isStarted || this.state.isDone} 
              onClick={this.handleStart}
            >
              <ion-icon name="arrow-dropright-circle"></ion-icon>
            </Button> 
            <Button ref="start" variant="light" disabled={this.state.isDone} size="sm" onClick={this.handleDone}>
              <ion-icon name="checkmark-circle-outline"></ion-icon>
            </Button> 
            <Change 
              disabled={this.state.isDone} 
              task={this.props.task}
              handleUpdate={this.handleUpdate}
              handleSave={this.handleSave}
            />
            <Button variant="light" size="sm" disabled={this.state.isDone} onClick={this.props.handleDelete}>
              <ion-icon name="trash"></ion-icon>
            </Button>
          </Col>
      </Row>
    )
  }

}

export default TableContent;