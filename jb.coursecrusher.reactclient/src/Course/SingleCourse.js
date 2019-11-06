import React, { Component } from "react";
import API from "../api";
import DeleteCourseModal from "../Modals/DeleteCourseModal";
import EditCourseModal from "../Modals/EditCourseModal";
import AddQuestionModal from "../Modals/AddQuestionModal";
import { Image, ListGroup } from "react-bootstrap";
import Question from "../Question/Question";
import { Spinner } from "react-bootstrap";

class SingleCourse extends Component {
  constructor(props) {
    super(props);
    this.isDirectNavigation = false;
    this.image = null;
    if (!this.props.auth.isAuthenticated()) return this.props.auth.login();

    this.api = this.props.api;
    if (this.props.api === undefined) {
      this.api = new API(this.props.auth.getAccessToken());
    }

    this.state = {
      isLoading: true,
      key: Math.random(),
      course: this.props.location.course,
      searchPhrase: ""
    };
  }

  componentDidMount() {
    if (this.props.location.course === undefined) {
      this.isDirectNavigation = true;
      var id = this.props.location.pathname.split("/").pop();
      this.api.get(`courses/${id}`).then(response => {
        if (response === undefined) return this.props.history.push("/courses");

        this.image = `data:image/png;base64,${response.image}`;
        this.isDirectNavigation = false;
        this.setState({ course: response, isLoading: false });
      });
    } else {
      this.image = `data:image/png;base64,${this.props.location.course.image}`;
      this.setState({ isLoading: false });
    }
  }

  onCourseEdited = course => {
    this.setState({
      course: course
    });
  };
  onQuestionAdded = question => {
    const oldState = this.state;
    const newQuestions = this.state.course.questions;
    newQuestions.push(question);
    this.setState({
      course: {
        courseId: oldState.course.courseId,
        name: oldState.course.name,
        description: oldState.course.description,
        owner: oldState.course.owner,
        questions: newQuestions
      }
    });
  };
  onQuestionDeleted = questionId => {
    const oldState = this.state;
    const newQuestions = this.state.course.questions.filter(
      question => question.questionId !== questionId
    );
    this.setState({
      course: {
        courseId: oldState.course.courseId,
        name: oldState.course.name,
        description: oldState.course.description,
        owner: oldState.course.owner,
        questions: newQuestions
      }
    });
    this.setState({ key: Math.random() });
  };

  onQuestionEdited = question => {
    const oldState = this.state;
    const index = this.state.course.questions.findIndex(
      q => q.questionId === question.questionId
    );
    oldState.course.questions[index] = question;
    this.setState({
      course: {
        courseId: oldState.course.courseId,
        name: oldState.course.name,
        description: oldState.course.description,
        owner: oldState.course.owner,
        questions: oldState.course.questions
      },
      key: Math.random()
    });
  };
  onSearch = e => {
    this.setState({ searchPhrase: e.target.value });
  };

  render() {
    if (this.state.isLoading) {
      return (
        <div className="d-flex justify-content-center">
          <Spinner animation="grow" variant="primary" />
        </div>
      );
    }

    let filteredQuestions = this.state.course.questions.filter(question => {
      return (
        question.questionPhrase
          .toLowerCase()
          .search(this.state.searchPhrase.toLowerCase()) !== -1
      );
    });

    return (
      <div style={{ margin: "10px" }}>
        <div className="course-header">
          <div className="image-cropper">
            <Image className="rounded" src={this.image} />
          </div>
          <div>
            <h2 style={{ marginLeft: "20px" }}>{this.state.course.name}</h2>
            <div style={{ marginLeft: "20px" }}>
              <i>{this.state.course.description}</i>
            </div>
          </div>{" "}
          <div className="float-right">
            <DeleteCourseModal
              api={this.api}
              courseId={this.state.course.courseId}
              history={this.props.history}
            />
          </div>
          <div className="float-right" style={{ marginLeft: "20px" }}>
            <EditCourseModal
              api={this.api}
              course={this.state.course}
              onCourseEdited={this.onCourseEdited}
            />
          </div>
        </div>
        <div>
          <div style={{ marginTop: "20px" }}>
            <AddQuestionModal
              api={this.api}
              courseId={this.state.course.courseId}
              onQuestionAdded={this.onQuestionAdded}
            />
          </div>
        </div>
        <hr />
        {this.state.isLoading && (
          <div className="d-flex justify-content-center">
            <Spinner animation="grow" variant="primary" />
          </div>
        )}
        {!this.state.isLoading && (
          <>
            <div className="col-sm-6 col-md-6 col-lg-6 col-xl-6 pull-right float-right">
              <input
                className="form-control float-right"
                placeholder="Search question..."
                type="text"
                name="filter"
                onChange={this.onSearch}
              ></input>
            </div>
            <div key={this.state.key} style={{ marginTop: "90px" }}>
              <ListGroup>
                {filteredQuestions.map(question => {
                  return (
                    <ListGroup.Item
                      style={{ marginTop: "10px" }}
                      key={question.questionId}
                    >
                      <Question
                        key={this.state.key}
                        question={question}
                        courseId={this.state.course.courseId}
                        api={this.api}
                        onQuestionDeleted={this.onQuestionDeleted}
                        onQuestionEdited={this.onQuestionEdited}
                      />
                    </ListGroup.Item>
                  );
                })}
              </ListGroup>
            </div>
          </>
        )}
      </div>
    );
  }
}

export default SingleCourse;
