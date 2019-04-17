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

  handleOptionChange(e) {
    const option = e.target.value;
  }
  
  render() {
    return (
      <>
        <button class={this.state.task === null ? "btn btn-primary custom" : "btn btn-light btn-sm"} 
        disabled={this.props.disabled === null ? false : this.props.disabled} onClick={this.handleShow}>
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
                  <Form.Control required name="date" type="datetime-local" 
                  defaultValue={this.state.task === null ? "" : this.state.task.duetime}
                  onChange={this.handleChange}/>
                </Form.Group>
              </Form.Row>
              <Form.Row>
                <Form.Group as={Col} md="4" controlId="type">
                  <Form.Label>Tags </Form.Label>
                  <Form.Control name="type" type="text" 
                  defaultValue={this.state.task === null ? "" : this.state.task.tag}
                  onChange={this.handleChange}/>
                </Form.Group>
                <Form.Group as={Col} md="4" controlId="estimated">
                  <Form.Label>Estimated hours to finish </Form.Label>
                  <Form.Control required name="estimated" type="number" 
                  defaultValue={this.state.task === null ? "" : this.state.task.estimated}
                  onChange={this.handleChange}/>
                </Form.Group>
                <Form.Group as={Col} md="4" controlId="difficulty">
                  <Form.Label>Difficulty level </Form.Label><br/>
                  <Form.Check inline type="radio" label="1" name="diff" id="1" onChange={this.handleOptionChange}
                  checked={this.state.task === null ? false : this.state.task.difficulty===1}/>
                  <Form.Check inline type="radio" label="2" name="diff" id="2" onChange={this.handleOptionChange}
                  checked={this.state.task === null ? false : this.state.task.difficulty===2}/>
                  <Form.Check inline type="radio" label="3" name="diff" id="3" onChange={this.handleOptionChange}
                  checked={this.state.task === null ? true : this.state.task.difficulty===3}/>
                  <Form.Check inline type="radio" label="4" name="diff" id="4" onChange={this.handleOptionChange}
                  checked={this.state.task === null ? false : this.state.task.difficulty===4}/>
                  <Form.Check inline type="radio" label="5" name="diff" id="5" onChange={this.handleOptionChange}
                  checked={this.state.task === null ? false : this.state.task.difficulty===5}/>
                </Form.Group>
              </Form.Row>
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