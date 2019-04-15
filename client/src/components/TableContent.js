import React, { Component } from 'react'
import { Row, Col, Button } from 'react-bootstrap';
import Change from './Change';
import '../css/TimeBlock.css';

//This a known issue 
//https://github.com/facebook/draft-js/issues/53

console.error = (function() {
  var error = console.error;
  return function(exception) {
    if ((exception + '').indexOf('Warning: A component is `contentEditable`') !== 0) {
      error.apply(console, arguments)
    }
  }
})()

class TableContent extends Component {
  constructor(){
    super();
    this.state = {
      isStarted: false
    };
  }
   
  // if the button edit is pressed, then the user may edit the name, estimated time, and due date
  handleEdit = () =>{
    this.refs.Name.contentEditable = 'true';
    this.refs.Estimated.contentEditable = 'true';
    this.refs.Duedate.contentEditable = 'true';
  }

  handleStart = () => {
    this.setState({isStarted: true});
    // set start time
  }

  render() {
    return (
      <Row>
          <Col>
            <p ref='subject'>{this.props.subject}</p>
          </Col>
          <Col>
            <p ref='Name'> {this.props.name}</p>
          </Col>
          <Col>
            <p ref='Estimated'> {this.props.estimated} Hours</p>
          </Col>
          <Col>
            <Button variant="light" size="sm" disabled={this.state.isStarted} onClick={this.handleStart}>
              <ion-icon name="arrow-dropright-circle"></ion-icon>
            </Button> 
            <Button ref="start" variant="light" size="sm" onClick={this.props.handleDone}>
              <ion-icon name="checkmark-circle-outline"></ion-icon>
            </Button> 
            <Change task={this.props.task}/>
            <Button variant="light" size="sm" onClick={this.props.handleDelete}>
              <ion-icon name="trash"></ion-icon>
            </Button>
          </Col>
      </Row>
    )
  }

}

export default TableContent;