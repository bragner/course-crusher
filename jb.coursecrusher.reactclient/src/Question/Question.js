import React, { Component } from "react";
import DeleteQuestionModal from "../Modals/DeleteQuestionModal";
import EditQuestionModal from "../Modals/EditQuestionModal";
import { ListGroup, Row, Col } from "react-bootstrap";

class Question extends Component {
  constructor(props) {
    super(props);
    this.state = {
      question: this.props.question,
      api: this.props.api,
      courseId: this.props.courseId
    };
  }
  onQuestionEdited = question => {
    this.props.onQuestionEdited(question);
  };
  onQuestionDeleted = questionId => {
    this.props.onQuestionEdited(questionId);
  };
  render() {
    return (
      <div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between"
          }}
        >
          <div>
            <h4>{this.state.question.questionPhrase}</h4>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between"
            }}
          >
            <div style={{ marginRight: "10px" }}>
              <EditQuestionModal
                api={this.state.api}
                courseId={this.state.courseId}
                question={this.state.question}
                onQuestionEdited={this.onQuestionEdited}
              />
            </div>
            <div>
              <DeleteQuestionModal
                api={this.state.api}
                courseId={this.state.courseId}
                questionId={this.state.question.questionId}
                onQuestionDeleted={this.onQuestionDeleted}
              />
            </div>
          </div>
        </div>
        <div>
          <Row>
            <Col>
              {!this.state.question.isMultipleChoice &&
                this.state.question.answers.map(answer => {
                  return (
                    <i key={answer.answerId}>
                      <p>{answer.answerPhrase}</p>
                    </i>
                  );
                })}
              {this.state.question.isMultipleChoice && (
                <ListGroup>
                  {this.state.question.answers.map(answer => {
                    return (
                      <ListGroup.Item key={answer.answerId}>
                        {answer.answerPhrase}
                        {answer.isCorrect && (
                          <span className="float-right">✔</span>
                        )}
                      </ListGroup.Item>
                    );
                  })}
                </ListGroup>
              )}
            </Col>
            <Col>
              {this.state.question.image !== null && (
                <>
                  <img
                    alt="question pic"
                    className="col-9 img-fluid img-responsive img-thumbnail"
                    src={this.state.question.image}
                    style={{ marginBottom: "5px" }}
                  />
                </>
              )}
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

export default Question;
