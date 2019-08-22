import React from 'react'
import axios from 'axios'

class CourseForm extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            name: '',
            owner: '',
            courseId: '',
            questions: []
        }

        this.onFieldChange = this.onFieldChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async handleSubmit(event) {
        event.preventDefault();
        try
        {
            const body = JSON.stringify(this.state);
            await axios.post('https://localhost:44320/api/courses', body, { headers: {'Content-Type':'application/json'}})
            alert("Sucessfully added course.");
            this.props.history.push("/courses");
        }
        catch(err){
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
                    <label htmlFor="name">Name</label><br/>
                    <input type="text" name="name" value={this.state.name} onChange={this.onFieldChange}></input>
                </div>
                <div>
                    <label htmlFor="owner">Owner</label><br/>
                    <input type="text" name="owner" value={this.state.owner} onChange={this.onFieldChange}></input>
                </div>
                <div>
                    <label htmlFor="courseId">Course Id</label><br/>
                    <input type="text" name="courseId" value={this.state.courseId} onChange={this.onFieldChange}></input>
                </div>
                <input type="submit" value="Add Course" />
            </form>
        )
    }

}

export default CourseForm;