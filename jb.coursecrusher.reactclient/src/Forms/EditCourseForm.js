import React from "react";

class EditCourseForm extends React.Component {
  constructor(props) {
    super(props);
    this.api = this.props.api;

    this.state = {
      courseId: this.props.course.courseId,
      name: this.props.course.name,
      image: this.props.course.image,
      description: this.props.course.description,
      questions: this.props.course.questions
    };

    this.onFieldChange = this.onFieldChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async handleSubmit(event) {
    event.preventDefault();
    try {
      this.api
        .put(`courses/${this.state.courseId}`, this.state)
        .then(response => {
          this.props.onCourseEdited(response);
          this.setState({
            name: response.name,
            description: response.description
          });
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

  render() {
    return (
      <form>
        <div>
          <label htmlFor="name">Name</label>
          <input
            className="form-control"
            required
            type="text"
            name="name"
            value={this.state.name}
            onChange={this.onFieldChange}
          ></input>
        </div>
        <div>
          <label htmlFor="owner">Description</label>
          <input
            className="form-control"
            required
            type="text"
            name="description"
            value={this.state.description}
            onChange={this.onFieldChange}
          ></input>
        </div>
        <hr />
        <input
          className="btn btn-primary float-right"
          type="submit"
          value="Save"
          onClick={this.handleSubmit}
        />
      </form>
    );
  }
}

export default EditCourseForm;
