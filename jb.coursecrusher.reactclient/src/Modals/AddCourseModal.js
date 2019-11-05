import React, { Component } from "react";
import { Modal, Button } from "react-bootstrap";
import AddCourseForm from "../Forms/AddCourseForm.js";

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
  onCourseAdded = course => {
    this.handleShow();
    this.props.onCourseAdded(course);
  };
  render() {
    return (
      <>
        <div className="float-right">
          <Button onClick={this.handleShow}>Add course (+)</Button>
        </div>

        <Modal show={this.state.show} onHide={this.handleShow}>
          <Modal.Header closeButton>
            <Modal.Title>Add course</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <AddCourseForm
              auth={this.props.auth}
              api={this.api}
              onCourseAdded={this.onCourseAdded.bind()}
            />
          </Modal.Body>
        </Modal>
      </>
    );
  }
}
export default AddQuestionModal;
