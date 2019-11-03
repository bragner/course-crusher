import React, { Component } from "react";
import Auth from "./Auth/Auth";
import API from "./api";
import DeleteCourseModal from "./DeleteCourseModal";
import AddQuestionModal from "./AddQuestionModal";

class SingleCourse extends Component {
  constructor(props) {
    super(props);
    this.isDirectNavigation = false;
    var auth = new Auth(this.props.history);
    this.state = {
      course: this.props.location.course,
      api: new API(auth.getAccessToken())
    };

    if (this.props.location.course === undefined) {
      this.isDirectNavigation = true;
      var id = this.props.location.pathname.split("/").pop();
      this.state.api.get(`courses/${id}`).then(response => {
        this.isDirectNavigation = false;
        this.setState({ course: response });
      });
    }
  }

  onQuestionAdded = question => {
    const oldState = this.state;
    const newQuestions = this.state.course.questions;
    newQuestions.push(question);
    this.setState({
      course: {
        courseId: oldState.course.courseId,
        name: oldState.course.name,
        owner: oldState.course.owner,
        questions: newQuestions
      }
    });
  };

  render() {
    if (this.isDirectNavigation) return <p>Loading...</p>;
    return (
      <>
        <AddQuestionModal
          api={this.state.api}
          courseId={this.state.course.courseId}
          onQuestionAdded={this.onQuestionAdded}
        />
        <DeleteCourseModal
          api={this.state.api}
          courseId={this.state.course.courseId}
          history={this.props.history}
        />
        <div>Course Id: {this.state.course.courseId}</div>
        <div>Course name: {this.state.course.name}</div>
        <div>Course description: {this.state.course.description}</div>
        {this.state.course.questions.map(question => {
          return (
            <div key={question.questionId}>
              <div>{question.questionPhrase}</div>
              <div>{question.answer}</div>
            </div>
          );
        })}
      </>
    );
  }
}

export default SingleCourse;
