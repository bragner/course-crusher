import React, { Component } from "react";
import { Modal, Button } from "react-bootstrap";

class DeleteQuestionModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      api: this.props.api,
      courseId: this.props.courseId,
      questionId: this.props.questionId
    };
  }
  handleShow = () => {
    this.setState({ show: !this.state.show });
  };
  onDeleteCourse = () => {
    this.state.api
      .delete(
        `courses/${this.state.courseId}/questions/${this.state.questionId}`
      )
      .then(() => {
        this.handleShow();
        this.props.onQuestionDeleted(this.state.questionId);
      });
  };
  render() {
    return (
      <>
        <div>
          <Button variant="danger" onClick={this.handleShow}>
            <span role="img" aria-label="Delete">
              ❌
            </span>
          </Button>
        </div>
        <Modal show={this.state.show} onHide={this.handleShow}>
          <Modal.Header closeButton>
            <Modal.Title>Delete question</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h6>Are you sure you want to delete this question?</h6>
            <Button variant="danger" onClick={this.onDeleteCourse}>
              Yes, I'm sure
            </Button>
          </Modal.Body>
        </Modal>
      </>
    );
  }
}
export default DeleteQuestionModal;
