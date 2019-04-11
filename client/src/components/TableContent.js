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
    var TName = this.refs.Name.innerHTML;
    this.props.handleNameBlur(TName);
  }
    
  // if the mouse is pressed not in the editable content of estimated time, then the user may no longer edit the value
  handleEstimatedBlur = () =>{
    this.refs.Estimated.contentEditable = 'false';
    var TEstimated = this.refs.Estimated.innerHTML;
    this.props.handleEstimatedBlur(TEstimated);
  }
    
  // if the mouse is pressed not in the editable content of due date, then the user may no longer edit the value
  handleDuedateBlur = () =>{
    this.refs.Duedate.contentEditable = 'false';
    var TDuedate = this.refs.Duedate.innerHTML;
    this.props.handleDuedateBlur(TDuedate);
  }

  // onBlur is used to save the content of saving new data. 
  // When the mouse is no longer pointing at the value input
  // in this rendering case, it would be outputed value. 
  render() {
    return (
      <Row>
          <Col>
            <p contentEditable="false" ref='Name' onBlur={this.handleNameBlur}>{this.props.tName}</p>
          </Col>
          <Col>
            <p contentEditable="false" ref='Estimated' onBlur={this.handleEstimatedBlur}> {this.props.tEstimated}</p>
          </Col>
          <Col>
            <p contentEditable="false" ref='Duedate' onBlur={this.handleDuedateBlur}> {this.props.tDuedate}</p>
          </Col>
          <Col>
            <Button variant="success" size="sm" onClick={this.props.handleDone}>Done</Button> 
            <Change task={this.props.task}/>
            <Button variant="danger" size="sm" onClick={this.props.handleDelete}>Delete</Button>
          </Col>
      </Row>
    )
  }

}

export default TableContent;