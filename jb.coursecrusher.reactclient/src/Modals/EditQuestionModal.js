import React, { Component } from "react";
import { Modal, Button } from "react-bootstrap";
import EditQuestionForm from "../Forms/EditQuestionForm.js";

class EditQuestionModal extends Component {
  constructor(props) {
    super(props);
    this.api = this.props.api;
    this.state = {
      courseId: this.props.courseId,
      question: this.props.question,
      show: false
    };
  }
  handleShow = () => {
    this.setState({ show: !this.state.show });
  };

  onQuestionEdited = question => {
    this.handleShow();
    this.setState({ question: question });
    this.props.onQuestionEdited(question);
  };
  render() {
    return (
      <>
        <div style={{ marginRight: "10px" }}>
          <Button variant="secondary" onClick={this.handleShow}>
            ✏
          </Button>
        </div>
        <Modal show={this.state.show} onHide={this.handleShow}>
          <Modal.Header closeButton>
            <Modal.Title>Edit question</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <EditQuestionForm
              api={this.api}
              courseId={this.state.courseId}
              question={this.state.question}
              onQuestionEdited={this.onQuestionEdited}
            />
          </Modal.Body>
        </Modal>
      </>
    );
  }
}

export default EditQuestionModal;
