import React, { Component } from 'react'
import { Row, Col, Button } from 'react-bootstrap';
import Change from './Change';
import "react-icons/io";
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
            
    };
  }
   
  // if the button edit is pressed, then the user may edit the name, estimated time, and due date
  handleEdit = () =>{
    this.refs.Name.contentEditable = 'true';
    this.refs.Estimated.contentEditable = 'true';
    this.refs.Duedate.contentEditable = 'true';
  }
    
  // if the mouse is pressed not in the editable content of name, then the user may no longer edit the value
  handleNameBlur = () =>{
    this.refs.Name.contentEditable = 'false';
    var name = this.refs.Name.innerHTML;
    this.props.handleNameBlur(name);
  }
    
  // if the mouse is pressed not in the editable content of estimated time, then the user may no longer edit the value
  handleEstimatedBlur = () =>{
    this.refs.Estimated.contentEditable = 'false';
    var estimated = this.refs.Estimated.innerHTML;
    this.props.handleEstimatedBlur(estimated);
  }
    
  // if the mouse is pressed not in the editable content of due date, then the user may no longer edit the value
  handleDuedateBlur = () =>{
    this.refs.Duedate.contentEditable = 'false';
    var subject = this.refs.Duedate.innerHTML;
    this.props.handleDuedateBlur(subject);
  }

  // onBlur is used to save the content of saving new data. 
  // When the mouse is no longer pointing at the value input
  // in this rendering case, it would be outputed value. 
  render() {
    return (
      <Row>
          <Col>
            <p contentEditable="false" ref='Subject' onBlur={this.handleNameBlur}>{this.props.subject}</p>
          </Col>
          <Col>
            <p contentEditable="false" ref='Name' onBlur={this.handleEstimatedBlur}> {this.props.name}</p>
          </Col>
          <Col>
            <p contentEditable="false" ref='Estimated' onBlur={this.handleDuedateBlur}> {this.props.estimated} Hours</p>
          </Col>
          <Col>
            <Button variant="light" size="sm" onClick={this.props.handleDone}>
              <ion-icon name="arrow-dropright-circle"></ion-icon>
            </Button> 
            <Button variant="light" size="sm" onClick={this.props.handleDone}>
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