import React from "react";

class AddCourseForm extends React.Component {
  constructor(props) {
    super(props);
    this.api = this.props.api;
    this.state = {
      name: "",
      description: "",
      questions: []
    };

    this.onFieldChange = this.onFieldChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async handleSubmit(event) {
    event.preventDefault();
    try {
      this.api.post("courses", this.state).then(response => {
        this.props.onCourseAdded(response);
      });
      this.setState({
        name: "",
        description: ""
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
      <form onSubmit={this.handleSubmit}>
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
          value="Add Course"
        />
      </form>
    );
  }
}

export default AddCourseForm;
