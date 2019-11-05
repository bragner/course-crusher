import React from "react";
import {
  InputGroup,
  FormControl,
  Row,
  Col,
  Button,
  Spinner
} from "react-bootstrap";

class EditQuestionForm extends React.Component {
  constructor(props) {
    super(props);
    this.api = this.props.api;

    this.state = {
      inRequest: false,
      courseId: this.props.courseId,
      question: this.props.question,
      questionPhrase: this.props.question.questionPhrase,
      option1chk: this.props.question.answers[0].isCorrect,
      option1txt: this.props.question.answers[0].answerPhrase,

      image:
        this.props.question.image !== null ? this.props.question.image : null,
      fileUrl: "",
      option2chk:
        this.props.question.answers[1] !== undefined
          ? this.props.question.answers[1].isCorrect
          : false,
      option2txt:
        this.props.question.answers[1] !== undefined
          ? this.props.question.answers[1].answerPhrase
          : "",
      option3chk:
        this.props.question.answers[2] !== undefined
          ? this.props.question.answers[2].isCorrect
          : false,
      option3txt:
        this.props.question.answers[2] !== undefined
          ? this.props.question.answers[2].answerPhrase
          : "",
      option4chk:
        this.props.question.answers[3] !== undefined
          ? this.props.question.answers[3].isCorrect
          : false,

      option4txt:
        this.props.question.answers[3] !== undefined
          ? this.props.question.answers[3].answerPhrase
          : ""
    };

    this.onFieldChange = this.onFieldChange.bind(this);
    this.onCheckboxChange = this.onCheckboxChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async handleSubmit(event) {
    event.preventDefault();
    this.setState({ inRequest: !this.state.inRequest });
    try {
      var question = null;
      if (this.state.question.isMultipleChoice) {
        const answers = [
          {
            answerId: this.state.question.answers[0].answerId,
            answerPhrase: this.state.option1txt,
            isCorrect: this.state.option1chk
          },
          {
            answerId: this.state.question.answers[1].answerId,
            answerPhrase: this.state.option2txt,
            isCorrect: this.state.option2chk
          },
          {
            answerId: this.state.question.answers[2].answerId,
            answerPhrase: this.state.option3txt,
            isCorrect: this.state.option3chk
          },
          {
            answerId: this.state.question.answers[3].answerId,
            answerPhrase: this.state.option4txt,
            isCorrect: this.state.option4chk
          }
        ];
        question = {
          questionPhrase: this.state.questionPhrase,
          isMultipleChoice: this.state.question.isMultipleChoice,
          answers: answers
        };
      } else {
        const answers = [
          {
            answerId: this.state.question.answers[0].answerId,
            answerPhrase: this.state.option1txt,
            isCorrect: true
          }
        ];
        question = {
          questionPhrase: this.state.questionPhrase,
          isMultipleChoice: this.state.question.isMultipleChoice,
          answers: answers
        };
      }
      question.questionId = this.state.question.questionId;

      if (this.state.image !== null) {
        question.image = this.state.image;
      }
      this.api
        .put(
          `courses/${this.state.courseId}/questions/${this.state.question.questionId}`,
          question
        )
        .then(response => {
          this.setState({ inRequest: !this.state.inRequest });
          this.props.onQuestionEdited(response);
        });
    } catch (err) {
      console.log(err);
      alert("Something went wrong...");
    }
  }
  onFieldChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }
  onCheckboxChange(event) {
    this.setState({
      [event.target.name]: event.target.checked
    });
  }
  onImageChange = event => {
    this.setState({ fileUrl: event.target.value });
    var img = this.refs.file.files[0];
    var reader = new FileReader();
    reader.readAsDataURL(img);

    reader.onloadend = function(e) {
      this.setState({
        image: reader.result
      });
    }.bind(this);
  };
  handleRemoveImage = event => {
    this.setState({
      image: null,
      fileUrl: ""
    });
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div>
          <label htmlFor="questionPhrase">Question phrase</label>
          <input
            className="form-control"
            required
            type="text"
            name="questionPhrase"
            value={this.state.questionPhrase}
            onChange={this.onFieldChange}
          ></input>
        </div>
        <Row>
          <Col></Col>
          <Col style={{ marginRight: "15px", marginTop: "5px" }}>
            <input
              className="custom-file-input"
              ref="file"
              type="file"
              accept="image/*"
              onChange={this.onImageChange}
              value={this.state.fileUrl}
            />
            {this.state.fileUrl === "" ? (
              <label className="custom-file-label">Choose image</label>
            ) : (
              <label
                style={{ overflow: "hidden" }}
                className="custom-file-label"
              >
                {this.state.fileUrl.substring(
                  this.state.fileUrl.lastIndexOf("\\") + 1
                )}
              </label>
            )}

            {this.state.image === null ? (
              <div></div>
            ) : (
              <div
                style={{ marginLeft: "-30px", marginTop: "5px" }}
                className="container row thumbnail-image"
              >
                <img
                  src={this.state.image}
                  alt="Preview of upload"
                  className="col-10 img-fluid img-responsive img-thumbnail"
                />
                <button
                  onClick={this.handleRemoveImage.bind(this)}
                  className="btn remove-image-button col-2"
                >
                  <span role="img" aria-label="Remove Image">
                    ❌
                  </span>
                </button>
              </div>
            )}
          </Col>
        </Row>
        {!this.state.question.isMultipleChoice && (
          <div>
            <label htmlFor="option1txt">Answer</label>
            <textarea
              className="form-control"
              required
              type="text"
              name="option1txt"
              value={this.state.option1txt}
              onChange={this.onFieldChange}
            ></textarea>
          </div>
        )}
        {this.state.question.isMultipleChoice && (
          <div>
            <div style={{ marginTop: "10px" }}>Answers</div>
            <div>
              <InputGroup className="mb-3">
                <InputGroup.Prepend>
                  <InputGroup.Checkbox
                    aria-label="Checkbox for following text input"
                    name="option1chk"
                    checked={this.state.option1chk}
                    onChange={this.onCheckboxChange}
                  />
                </InputGroup.Prepend>
                <FormControl
                  aria-label="Text input with checkbox"
                  name="option1txt"
                  value={this.state.option1txt}
                  onChange={this.onFieldChange}
                />
              </InputGroup>
            </div>
            <div>
              <InputGroup className="mb-3">
                <InputGroup.Prepend>
                  <InputGroup.Checkbox
                    aria-label="Checkbox for following text input"
                    name="option2chk"
                    checked={this.state.option2chk}
                    onChange={this.onCheckboxChange}
                  />
                </InputGroup.Prepend>
                <FormControl
                  aria-label="Text input with checkbox"
                  name="option2txt"
                  value={this.state.option2txt}
                  onChange={this.onFieldChange}
                />
              </InputGroup>
            </div>
            <div>
              <InputGroup className="mb-3">
                <InputGroup.Prepend>
                  <InputGroup.Checkbox
                    aria-label="Checkbox for following text input"
                    name="option3chk"
                    checked={this.state.option3chk}
                    onChange={this.onCheckboxChange}
                  />
                </InputGroup.Prepend>
                <FormControl
                  aria-label="Text input with checkbox"
                  name="option3txt"
                  value={this.state.option3txt}
                  onChange={this.onFieldChange}
                />
              </InputGroup>
            </div>
            <div>
              <InputGroup className="mb-3">
                <InputGroup.Prepend>
                  <InputGroup.Checkbox
                    aria-label="Checkbox for following text input"
                    name="option4chk"
                    checked={this.state.option4chk}
                    onChange={this.onCheckboxChange}
                  />
                </InputGroup.Prepend>
                <FormControl
                  aria-label="Text input with checkbox"
                  name="option4txt"
                  value={this.state.option4txt}
                  onChange={this.onFieldChange}
                />
              </InputGroup>
            </div>
          </div>
        )}
        <hr />
        {!this.state.inRequest && (
          <input
            type="submit"
            className="btn btn-primary float-right"
            value="Save"
          />
        )}
        {this.state.inRequest && (
          <Button className="float-right" variant="primary" disabled>
            <Spinner
              as="span"
              animation="grow"
              size="sm"
              role="status"
              aria-hidden="true"
            />
            Saving...
          </Button>
        )}
      </form>
    );
  }
}

export default EditQuestionForm;
