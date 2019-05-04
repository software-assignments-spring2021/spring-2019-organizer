import React, { Component } from 'react';
import { Nav, Modal, Form, Col, Row, Button, Dropdown, InputGroup, FormControl} from 'react-bootstrap';

class Tag extends Component {
  constructor(props) {
    super(props);

    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleColorChange = this.handleColorChange.bind(this);

    this.state = {
      show: false,
      tags: props.tags,
      edit: Array(props.tags.length).fill(0),
      color: "",
      newTag: { name: "", color: "" }
    }
  }

  handleShow() {
    this.setState({ show: true });
  }

  handleClose() {
    this.setState({ show: false });
  }

  handleSave(e) {
    e.preventDefault();
    const tag = this.state.newTag;
    tag.user = this.props.user;
    this.setState({
      show: false,
      newTag: { name: "", color: "" }
    });

    if (tag.name !== "" && tag.color !== "") {
      // data format: {"user": "", "name": "", "color": ""}
      fetch('/tag', {
        method: "POST",
        body: JSON.stringify(tag),
        headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
        }
      }).catch(err => {
        console.log(err);
      });
  
      this.props.handleSave(tag);
    }
  }

  handleChange(e) {
    const name = e.target.name;
    const value = e.target.value;

    this.setState(prevState => ({
      newTag: {...prevState.newTag, [name]: value}
    }));
  }

  handleDelete(i) {
    let tags = this.state.tags;
    const deleteInfo = {
      _id: tags[i]._id
    };
    this.props.handleDelete(tags[i].name);
    tags.splice(i,1);
		this.setState({
			tags: tags
    });
    
    // data format: {_id: ""}
    fetch('/tag', {
      method: "DELETE",
      body: JSON.stringify(deleteInfo),
      headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
      }
    }).catch(err => {
      console.log(err);
    });
  }

  handleEdit(i) {
    let edit = this.state.edit;
    if (edit[i] === 1) {
      edit[i] = 0;
      this.setState({
        edit: edit,
        color: ""
      });
    } else {
      edit[i] = 1;
      const color = this.state.tags[i].color;
      this.setState({
        edit: edit,
        color: color
      });
    }
  }

  handleColorChange(e) {
    const color = e.target.value;
    this.setState({
      color: color
    });
  }

  handleSaveEdit(i) {
    let edit = this.state.edit;
    edit[i] = 0;
    let tags = this.state.tags;
    if (this.state.color !== "")
      tags[i].color = this.state.color;
    this.setState({
      edit: edit,
      tags: tags,
      color: ""
    });

    if (this.state.color !== "") {
      let updateInfo = tags[i];
      // data format: {_id: "", "name": "", color: ""}
      fetch('/tag', {
        method: "PUT",
        body: JSON.stringify(updateInfo),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      }).catch(err => {
        console.log(err);
      });
    }
  }

  render() {
    const { edit } = this.state;
    return (
      <>
        <Nav.Link 
          bsPrefix="sidebarlink submenu" 
          label="Tag"
          onClick={this.handleShow}
        >
          Manage Tags
        </Nav.Link>

        <Modal 
            show={this.state.show} onHide={this.handleClose}
            aria-labelledby="contained-modal-title-vcenter"
            dialogClassName="modal-25w"
            centered
        >
          <Modal.Header closeButton>
            <Modal.Title>
              Manage Tags
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Row style={{ paddingBottom: '10px' }}>
              <Col md="4"> <b>Tag Name</b> </Col>
              <Col md="4"> <b>Tag Color</b> </Col>
              <Col></Col>
            </Row>
            
            {this.state.tags.map((tag,i)=> 
              <Row key={i}>
                <Col md="4">
                  {tag.name}
                </Col>
                <Col md="4">
                  <InputGroup id={i}>
                    <p className={ edit[i] ? "edit" : "default"}>{tag.color}</p>
                    <FormControl
                      className={ edit[i] ? "default" : "edit"}
                      defaultValue={tag.color}
                      aria-label={tag.color}
                      aria-describedby="basic-addon1"
                      onChange={this.handleColorChange}
                    />
                  </InputGroup>
                </Col>
                <Col>
                  <Button 
                    variant="light" 
                    size="sm" 
                    onClick={this.handleDelete.bind(this, i)}
                  >
                    <ion-icon name="trash"></ion-icon>
                  </Button>
                  <Button 
                    variant="light" 
                    size="sm" 
                    onClick={this.handleEdit.bind(this, i)}
                  >
                    <ion-icon name="create"></ion-icon>
                  </Button>
                  <Button
                    className={ edit[i] ? "default" : "edit"}
                    variant="light" 
                    size="sm" 
                    onClick={this.handleSaveEdit.bind(this, i)}
                  >
                    <ion-icon name="checkmark-circle-outline"></ion-icon>
                  </Button>
                </Col>
              </Row>
            )}

            <Dropdown.Divider />
            <Form onSubmit={e => this.handleSave(e)}>
              <Form.Row>
                <Form.Group as={Col} controlId="name">
                  <Form.Label> Tag Name </Form.Label>
                  <Form.Control required name="name" type="text" 
                  onChange={this.handleChange}/>
                </Form.Group>
                <Form.Group as={Col} controlId="color">
                  <Form.Label> Tag Color </Form.Label>
                  <Form.Control required name="color" type="text" 
                  onChange={this.handleChange}/>
                </Form.Group>
              </Form.Row>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <button class="btn btn-primary custom" 
            onClick={this.handleSave}>
              Save
            </button>
          </Modal.Footer>
        </Modal>
      </>
    )
  }

}

export default Tag;