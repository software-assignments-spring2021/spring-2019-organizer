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
    this.handleClassChange = this.handleClassChange.bind(this);
    this.handleOptionChange = this.handleOptionChange.bind(this);
  
    this.state = {
      show: false,
      task: props.task,
      option: props.task === null ? '3' : props.task.difficulty.toString(),
      tags: null,
      newTask: { 
        user: props.user,
        name: "",
        duetime: "",
        tag: [],
        class: "",
        classname: "", 
        difficulty: 3,
        predictiontime: "" }
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
    taskData.predictiontime = parseInt(taskData.predictiontime);
    this.props.handleSave(taskData);
    this.setState({ show: false });
    
    delete taskData.classname;
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
  }

  handleUpdate(e) {
    e.preventDefault();
    const taskData = this.state.task;
    taskData.difficulty = parseInt(this.state.option);
    taskData.predictiontime = parseInt(taskData.predictiontime);
    this.props.handleUpdate(taskData);
    this.setState({ show: false });

    delete taskData.classname;
    fetch('/task',{
      method: "PUT",
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

  handleClassChange(selectedOption) {
    if (this.state.task === null) {
      this.setState(prevState => ({
        newTask: {
          ...prevState.newTask,
          class: selectedOption.class,
          classname: selectedOption.classname
        }
      }));
    } else {
      this.setState(prevState => ({
        task: {
          ...prevState.task, 
          class: selectedOption.class,
          classname: selectedOption.classname
        }
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
          _id: tag._id
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
                <Form.Group as={Col} md="4" controlId="classname">
                  <Form.Label>Subject </Form.Label>
                  <Classes 
                  classes={this.state.task === null ? null : this.state.task.classname}
                  handleClassChange={this.handleClassChange}
                  />
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
                <Form.Group as={Col} md="4" controlId="predictiontime">
                  <Form.Label>Estimated hours to finish </Form.Label>
                  <Form.Control required name="predictiontime" type="number" 
                  defaultValue={this.state.task === null ? "" : this.state.task.predictiontime}
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
        { value: 'homework', label: 'homework', _id: '' },
        { value: 'else', label: 'else', _id: '' },
        { value: 'quiz', label: 'quiz', _id: '' }
      ],
      selectedOption: props.tags
    }
  }

  componentDidMount() {
    // data format: [{_id: "", user": "", "task": [], "name": "", "color": ""}]
    fetch('/tag')
    .then(res => res.json())
    .then(data => {
      const options = [];
      for (let tag of data ) {
        options.push({
          value: tag.name,
          label: tag.name,
          _id: tag._id
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
    for (const option of selectedOption) {
      finalOptions.push({
        _id: option._id
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

class Classes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      options: [
        { value: '1', label: 'Agile Software Development'},
        { value: '2', label: 'Machine Learning'},
        { value: '3', label: 'SSPC'}
      ],
      selectedOption: props.classes
    }
  }

  componentDidMount() {
    fetch('/class')
    .then(res => res.json())
    .then(data => {
      const options = [];
      for (const clss of data) {
        options.push({
          value: clss._id,
          label: clss.name,
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
    const finalOption = {
      class: selectedOption.value,
      classname: selectedOption.label
    };
    this.props.handleClassChange(finalOption);
  }

  render() {
    let selectedOption = this.state.selectedOption;
    if (typeof(selectedOption) === "string") {
      for (const obj of this.state.options) {
        if (obj.label === selectedOption) {
          selectedOption = {
            value: obj.value,
            label: obj.label
          }
        }
      }
    }
    return (
      <Select
        value={selectedOption}
        onChange={this.handleChange}
        options={this.state.options}
      />
    )
  }

}

export default Change;