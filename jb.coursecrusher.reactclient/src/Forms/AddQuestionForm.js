import React from "react";
import {
  InputGroup,
  FormControl,
  Form,
  Row,
  Col,
  Button,
  Spinner
} from "react-bootstrap";

class AddQuestionForm extends React.Component {
  constructor(props) {
    super(props);
    this.api = this.props.api;
    this.courseId = this.props.courseId;
    this.state = {
      inRequest: false,
      questionPhrase: "",
      isMultipleChoice: false,
      option1chk: false,
      option2chk: false,
      option3chk: false,
      option4chk: false,
      option1txt: "",
      option2txt: "",
      option3txt: "",
      option4txt: "",
      imageValue: "",
      fileUrl: ""
    };
    this.onFieldChange = this.onFieldChange.bind(this);
    this.onCheckboxChange = this.onCheckboxChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onImageChange.bind(this);
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

  async handleSubmit(event) {
    event.preventDefault();
    this.setState({ inRequest: !this.state.inRequest });
    try {
      const answers = [
        {
          answerPhrase: this.state.option1txt,
          isCorrect: this.state.option1chk
        },
        {
          answerPhrase: this.state.option2txt,
          isCorrect: this.state.option2chk
        },
        {
          answerPhrase: this.state.option3txt,
          isCorrect: this.state.option3chk
        },
        {
          answerPhrase: this.state.option4txt,
          isCorrect: this.state.option4chk
        }
      ];

      var question = null;
      if (this.state.isMultipleChoice) {
        question = {
          questionPhrase: this.state.questionPhrase,
          isMultipleChoice: this.state.isMultipleChoice,
          answers: answers
        };
      } else {
        answers[0].isCorrect = true;
        question = {
          questionPhrase: this.state.questionPhrase,
          isMultipleChoice: this.state.isMultipleChoice,
          answers: [answers[0]]
        };
      }

      if (this.state.image !== undefined) {
        question.image = this.state.image[0];
      }

      this.api
        .post(`courses/${this.courseId}/questions`, question)
        .then(response => {
          this.props.onQuestionAdded(response);
          this.setState({
            questionPhrase: "",
            isMultipleChoice: false,
            option1chk: false,
            option2chk: false,
            option3chk: false,
            option4chk: false,
            option1txt: "",
            option2txt: "",
            option3txt: "",
            option4txt: ""
          });
          this.setState({ inRequest: !this.state.inRequest });
        });
    } catch (err) {
      console.log(err);
      alert("Something went wrong...");
    }
  }

  onCheck = () => {
    this.setState({
      isMultipleChoice: !this.state.isMultipleChoice
    });
  };
  onImageChange = event => {
    this.setState({ fileUrl: event.target.value });
    var img = this.refs.file.files[0];
    var reader = new FileReader();
    reader.readAsDataURL(img);

    reader.onloadend = function(e) {
      this.setState({
        image: [reader.result]
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
          <Col style={{ marginTop: "5px" }}>
            <InputGroup className="mb-3">
              <Form.Check
                type="switch"
                id="custom-switch"
                label="Multiple choice"
                onChange={this.onCheck}
              />
            </InputGroup>
          </Col>
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
            {this.state.fileUrl === "" ? (
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

        <hr></hr>
        {!this.state.isMultipleChoice && (
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
        {this.state.isMultipleChoice && (
          <div>
            <div>
              <InputGroup className="mb-3">
                <InputGroup.Prepend>
                  <InputGroup.Checkbox
                    aria-label="Checkbox for following text input"
                    name="option1chk"
                    onChange={this.onCheckboxChange}
                  />
                </InputGroup.Prepend>
                <FormControl
                  aria-label="Text input with checkbox"
                  name="option1txt"
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
                    onChange={this.onCheckboxChange}
                  />
                </InputGroup.Prepend>
                <FormControl
                  aria-label="Text input with checkbox"
                  name="option2txt"
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
                    onChange={this.onCheckboxChange}
                  />
                </InputGroup.Prepend>
                <FormControl
                  aria-label="Text input with checkbox"
                  name="option3txt"
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
                    onChange={this.onCheckboxChange}
                  />
                </InputGroup.Prepend>
                <FormControl
                  aria-label="Text input with checkbox"
                  name="option4txt"
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
            value="Add Question"
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
            Adding...
          </Button>
        )}
      </form>
    );
  }
}

export default AddQuestionForm;
