import React, { Component } from "react";
import { Modal, Button } from "react-bootstrap";
import EditCourseForm from "../Forms/EditCourseForm.js";

class EditCourseModal extends Component {
  constructor(props) {
    super(props);
    this.api = this.props.api;
    this.state = {
      course: this.props.course,
      show: false
    };
  }
  handleShow = () => {
    this.setState({ show: !this.state.show });
  };
  onCourseEdited = course => {
    this.handleShow();
    this.setState({ course: course });
    this.props.onCourseEdited(course);
  };
  render() {
    return (
      <>
        <div style={{ marginRight: "10px" }}>
          <Button variant="secondary" onClick={this.handleShow}>
            Edit{" "}
            <span role="img" aria-label="Edit">
              ✏
            </span>
          </Button>
        </div>
        <Modal show={this.state.show} onHide={this.handleShow}>
          <Modal.Header closeButton>
            <Modal.Title>Edit course</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <EditCourseForm
              api={this.api}
              course={this.state.course}
              onCourseEdited={this.onCourseEdited}
            />
          </Modal.Body>
        </Modal>
      </>
    );
  }
}

export default EditCourseModal;
