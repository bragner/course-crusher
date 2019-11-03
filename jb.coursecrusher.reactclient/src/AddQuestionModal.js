import React, { Component } from "react";
import { Modal, Button } from "react-bootstrap";
import AddQuestionForm from "./AddQuestionForm";

class AddQuestionModal extends Component {
  constructor(props) {
    super(props);
    this.api = this.props.api;
    this.state = {
      show: false,
      courseId: this.props.courseId
    };
  }
  handleShow = () => {
    this.setState({ show: !this.state.show });
  };
  onQuestionAdded = question => {
    this.handleShow();
    this.props.onQuestionAdded(question);
  };
  render() {
    return (
      <>
        <Button variant="secondary" onClick={this.handleShow}>
          Add question (+)
        </Button>
        <Modal show={this.state.show} onHide={this.handleShow}>
          <Modal.Header closeButton>
            <Modal.Title>Add question</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <AddQuestionForm
              api={this.api}
              courseId={this.state.courseId}
              onQuestionAdded={this.onQuestionAdded}
            />
          </Modal.Body>
        </Modal>
      </>
    );
  }
}
export default AddQuestionModal;
