import React, { Component } from 'react';
import { Nav } from 'react-bootstrap';
import { Modal, Form, Col } from 'react-bootstrap';

class Tag extends Component {
  constructor(props) {
    super(props);

    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.handleChange = this.handleChange.bind(this);

    this.state = {
      show: false,
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
    this.setState({ show: false });

    fetch('/tags', {
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

  handleChange(e) {
    const name = e.target.name;
    const value = e.target.value;

    this.setState(prevState => ({
      newTag: {...prevState.newTag, [name]: value}
    }));
  }

  render() {
    return (
      <>
        <Nav.Link 
          bsPrefix="sidebarlink submenu" 
          label="Tag"
          onClick={this.handleShow}
        >
          + new tag
        </Nav.Link>

        <Modal 
            show={this.state.show} onHide={this.handleClose}
            size="lg" aria-labelledby="contained-modal-title-vcenter" 
            centered
        >
          <Modal.Header closeButton>
            <Modal.Title>
              New Tag
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
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