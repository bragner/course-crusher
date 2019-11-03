import React from "react";
import { InputGroup, FormControl, Form } from "react-bootstrap";

class AddQuestionForm extends React.Component {
  constructor(props) {
    super(props);
    this.api = this.props.api;
    this.courseId = this.props.courseId;
    this.state = {
      questionPhrase: "",
      answer: "",
      isMultipleChoiceQuestion: false,
      option1chk: false,
      option2chk: false,
      option3chk: false,
      option4chk: false,
      option1txt: "",
      option2txt: "",
      option3txt: "",
      option4txt: ""
    };
    this.onFieldChange = this.onFieldChange.bind(this);
    this.onCheckboxChange = this.onCheckboxChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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
    console.log(this.state);
    /*try {
      this.api
        .post(`courses/${this.courseId}/questions`, this.state)
        .then(response => {
          this.props.onQuestionAdded(response);
        });
      this.setState({
        questionPhrase: "",
        answer: ""
      });
    } catch (err) {
      console.log(err);
      alert("Something went wrong...");
    }*/
  }
  onCheck = () => {
    this.setState({
      isMultipleChoiceQuestion: !this.state.isMultipleChoiceQuestion
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

        <Form.Check
          type="switch"
          id="custom-switch"
          label="Multiple Choice"
          onChange={this.onCheck}
        />
        <hr></hr>
        {!this.state.isMultipleChoiceQuestion && (
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

        {this.state.isMultipleChoiceQuestion && (
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
        <input
          type="submit"
          className="btn btn-primary float-right"
          value="Add Question"
        />
      </form>
    );
  }
}

export default AddQuestionForm;
