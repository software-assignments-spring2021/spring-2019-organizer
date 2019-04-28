import React, { Component } from 'react';
import { Modal, Form, Col } from 'react-bootstrap';
import Select from 'react-select';

class Change extends Component {
  constructor(props) {
    super(props);
  
    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleTagChange = this.handleTagChange.bind(this);
    this.handleOptionChange = this.handleOptionChange.bind(this);
  
    this.state = {
      show: false,
      task: props.task,
      option: props.task === null ? '3' : props.task.difficulty.toString(),
      tags: null,
      newTask: { class: '', name: '', duetime: '', estimated: '', tag: [], difficulty: 3 }
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
    taskData.difficulty = parseInt(this.state.option);
    taskData.estimated = parseInt(taskData.estimated);
    this.setState({ show: false });

    fetch('/task',{
      method: "POST",
      body: JSON.stringify(taskData),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    // }).then(response => {
    //   response.json().then(data =>{
    //     console.log("Successful" + data);
    //   })
    }).catch(err => {
      console.log(err);
    });

    this.props.handleSave(taskData);
  }

  handleUpdate(e) {
    e.preventDefault();
    const taskData = this.state.task;
    taskData.difficulty = parseInt(this.state.option);
    taskData.estimated = parseInt(taskData.estimated);
    this.setState({ show: false });

    fetch('/task',{
      method: "UPDATE",
      body: JSON.stringify(taskData),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    // }).then(response => {
    //   response.json().then(data =>{
    //     console.log("Successful" + data);
    //   })
    }).catch(err => {
      console.log(err);
    });

    this.props.handleUpdate(taskData);
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

  handleTagChange(selectedOption) {
    console.log(`Option selected:`, selectedOption);
    if (this.state.task === null) {
      this.setState(prevState => ({
        newTask: {...prevState.newTask, tag: selectedOption}
      }));
    } else {
      this.setState(prevState => ({
        task: {...prevState.task, tag: selectedOption}
      }));
    }
  }

  handleOptionChange(e) {
    const difficulty = e.target.value;
    this.setState({
      option: difficulty
    });
  }
  
  render() {
    const tags = [];
    if (this.state.task !== null) {
      for (let tag of this.state.task.tag) {
        tags.push({
          value: tag.name,
          label: tag.name,
          color: tag.color
        });
      }
    }

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
                <Form.Group as={Col} md="4" controlId="duetime">
                  <Form.Label>Due </Form.Label>
                  <Form.Control required name="duetime" type="datetime-local" 
                  defaultValue={this.state.task === null ? "" : this.state.task.duetime}
                  onChange={this.handleChange}/>
                </Form.Group>
              </Form.Row>
              <Form.Row>
                <Form.Group as={Col} md="4" controlId="tag">
                  <Form.Label>Tags </Form.Label>
                  <Tags 
                  tags={this.state.task === null ? null : tags}
                  handleTagChange={this.handleTagChange}
                  />
                </Form.Group>
                <Form.Group as={Col} md="4" controlId="estimated">
                  <Form.Label>Estimated hours to finish </Form.Label>
                  <Form.Control required name="estimated" type="number" 
                  defaultValue={this.state.task === null ? "" : this.state.task.estimated}
                  onChange={this.handleChange}/>
                </Form.Group>
                <Form.Group as={Col} md="4" controlId="difficulty">
                  <Form.Label>Difficulty level </Form.Label><br/>
                  <Form.Check inline type="radio" label="1" value="1" name="diff"
                  onChange={this.handleOptionChange}
                  checked={this.state.option === "1"}/>
                  <Form.Check inline type="radio" label="2" value="2" name="diff"
                  onChange={this.handleOptionChange}
                  checked={this.state.option === "2"}/>
                  <Form.Check inline type="radio" label="3" value="3" name="diff"
                  onChange={this.handleOptionChange}
                  checked={this.state.option === "3"}/>
                  <Form.Check inline type="radio" label="4" value="4" name="diff"
                  onChange={this.handleOptionChange}
                  checked={this.state.option === "4"}/>
                  <Form.Check inline type="radio" label="5" value="5" name="diff"
                  onChange={this.handleOptionChange}
                  checked={this.state.option === "5"}/>
                </Form.Group>
              </Form.Row>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <button class="btn btn-primary custom" 
            onClick={this.state.task === null ? this.handleSave: this.handleUpdate}>
              Save
            </button>
          </Modal.Footer>
        </Modal>
      </>
    )
  }
}

class Tags extends Component {
  constructor(props) {
    super(props);
    this.state = {
      options: [
        { value: 'homework', label: 'homework', color: 'pink' },
        { value: 'else', label: 'else', color: 'purple' },
        { value: 'quiz', label: 'quiz', color: 'blue' }
      ],
      selectedOption: props.tags
    }
  }

  componentDidMount() {
    fetch('/tags')
    .then(res => res.json())
    .then(data => {
      const options = [];
      for (let tag of data.tags ) {
        options.push({
          value: tag.name,
          label: tag.name,
          color: tag.color
        });
      }
      this.setState({
        options: options
      });
    })
    .catch(err => {
        console.log(err);
    });
  }

  handleChange = (selectedOption) => {
    this.setState({ selectedOption });
    const finalOptions = []
    for (let option of selectedOption) {
      finalOptions.push({
        name: option.value,
        color: option.color
      });
    }
    this.props.handleTagChange(finalOptions);
  }

  render() {
    return (
      <Select
        isMulti={true}
        value={this.state.selectedOption}
        onChange={this.handleChange}
        options={this.state.options}
      />
    )
  }
}

export default Change;