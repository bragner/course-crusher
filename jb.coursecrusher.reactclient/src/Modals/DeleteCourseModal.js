import React, { Component } from "react";
import { Modal, Button } from "react-bootstrap";

class DeleteCourseModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      api: this.props.api,
      courseId: this.props.courseId
    };
  }
  handleShow = () => {
    this.setState({ show: !this.state.show });
  };
  onDeleteCourse = () => {
    this.state.api.delete(`courses/${this.state.courseId}`).then(() => {
      this.props.history.push("/courses");
    });
  };
  render() {
    return (
      <>
        <div>
          <Button variant="danger" onClick={this.handleShow}>
            <span role="img" aria-label="delete">
              ❌
            </span>
          </Button>
        </div>
        <Modal show={this.state.show} onHide={this.handleShow}>
          <Modal.Header closeButton>
            <Modal.Title>Delete course</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h6>Are you sure you want to delete ?</h6>
            <Button variant="danger" onClick={this.onDeleteCourse}>
              Yes, I'm sure
            </Button>
          </Modal.Body>
        </Modal>
      </>
    );
  }
}
export default DeleteCourseModal;
