import React, { Component } from 'react';
import { Modal, Form, Col } from 'react-bootstrap';

class Change extends Component {
  constructor(props) {
    super(props);
  
    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.handleChange = this.handleChange.bind(this);
  
    this.state = {
      show: false,
      task: props.task,
      newTask: { class: '', name: '', date: '', estimated: '', type: [], text: '' }
    };
  }

  handleShow() {
    this.setState({ show: true });
  }
  
  handleClose() {
    this.setState({ show: false });
  }
  
  handleSave(e) {
    e.preventDefault();
    const taskData = this.state.newTask;
    this.setState({ show: false });

    fetch('/schedules',{
      method: "POST",
      body: JSON.stringify(taskData),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(response => {
      response.json().then(data => {
        console.log("Successful" + data);
      }).catch( error => {
        console.log('no data');
      })
    }).catch( error => {
      console.log('no data');
    })
  }

  handleChange(e) {
    const name = e.target.name;
    const value = e.target.value;
    if (this.state.task === null) {
      this.setState(prevState => ({
        newTask: {...prevState.newTask, [name]: value}
      }));
    } else {
      this.setState(prevState => ({
        task: {...prevState.task, [name]: value}
      }));
    }
  }
  
  render() {
    return (
      <>
        <button class={this.state.task === null ? "btn btn-primary custom" : "btn btn-light btn-sm"} 
        onClick={this.handleShow}>
          {this.state.task === null ? "Add New Task" : <ion-icon name="create"></ion-icon>}
        </button>
  
        <Modal 
            show={this.state.show} onHide={this.handleClose}
            size="lg" aria-labelledby="contained-modal-title-vcenter" centered
        >
          <Modal.Header closeButton>
            <Modal.Title>
              {this.state.task === null ? "New Task" : "Edit Task"}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={e => this.handleSave(e)}>
              <Form.Row>
                <Form.Group as={Col} md="4" controlId="class">
                  <Form.Label>Subject </Form.Label>
                  <Form.Control required name="class" type="text" 
                  defaultValue={this.state.task === null ? "" : this.state.task.class}
                  onChange={this.handleChange}/>
                </Form.Group>
                <Form.Group as={Col} md="4" controlId="name">
                  <Form.Label>Task </Form.Label>
                  <Form.Control required name="name" type="text" 
                  defaultValue={this.state.task === null ? "" : this.state.task.name}
                  onChange={this.handleChange}/>
                </Form.Group>
                <Form.Group as={Col} md="4" controlId="date">
                  <Form.Label>Due </Form.Label>
                  <Form.Control required name="date" type="date" 
                  defaultValue={this.state.task === null ? "" : this.state.task.date}
                  onChange={this.handleChange}/>
                </Form.Group>
              </Form.Row>
              <Form.Row>
                <Form.Group as={Col} md="4" controlId="type">
                  <Form.Label>Type </Form.Label>
                  <Form.Control name="type" type="text" 
                  defaultValue={this.state.task === null ? "" : this.state.task.type}
                  onChange={this.handleChange}/>
                </Form.Group>
                <Form.Group as={Col} md="4" controlId="estimated">
                  <Form.Label>Estimated hours to finish </Form.Label>
                  <Form.Control required name="estimated" type="number" 
                  defaultValue={this.state.task === null ? "" : this.state.task.estimated}
                  onChange={this.handleChange}/>
                </Form.Group>
              </Form.Row>
              <Form.Group controlId="text">
                <Form.Label>Task description</Form.Label>
                <Form.Control name="text" as="textarea" rows="3" 
                defaultValue={this.state.task === null ? "" : this.state.task.text}
                onChange={this.handleChange}/>
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <button class="btn btn-primary custom" onClick={this.handleSave}>
              Save
            </button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
}

export default Change;