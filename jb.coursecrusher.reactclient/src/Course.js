import React, { Component } from 'react';
import axios from 'axios';

class Course extends Component {
    constructor(props) {
        super(props);
        this.state ={
            course:{
                questions:[]
            },
            courseId:props.match.params.courseId,
            questionPhrase: '',
            answer: '',
            questionId: ''
        }
        this.onFieldChange = this.onFieldChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    onFieldChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }
    async handleSubmit(event) {
        event.preventDefault();
        try
        {
            const body = {
                questionPhrase: this.state.questionPhrase,
                answer: this.state.answer,
                questionId: this.state.questionId
            }
            const jsonBody = JSON.stringify(body);
            await axios.post(`https://localhost:44320/api/courses/${this.state.courseId}/questions`, jsonBody, { headers: {'Content-Type':'application/json'}})
            alert("Sucessfully added question to course.");
            this.setState(state => {
                const questions = this.state.course.questions.push(body);
                return {questions, value: ''}
            });
        }
        catch(err){
            console.log(err);
            alert("Something went wrong...");
        }
    }
    async componentDidMount() {
        const response = await axios.get(`https://localhost:44320/api/courses/${this.state.courseId}`)
        const courseRes = response.data;      
        this.setState({course:courseRes});
    }
    render() {
        return (
            <div>
                <h1>
                    {this.state.course.name}
                </h1>
                <form onSubmit={this.handleSubmit}>
                <div>
                    <label htmlFor="questionPhrase">Question phrase</label><br/>
                    <input type="text" name="questionPhrase" value={this.state.questionPhrase} onChange={this.onFieldChange}></input>
                </div>
                <div>
                    <label htmlFor="answer">Answer</label><br/>
                    <input type="text" name="answer" value={this.state.answer} onChange={this.onFieldChange}></input>
                </div>
                <div>
                    <label htmlFor="questionId">Course Id</label><br/>
                    <input type="text" name="questionId" value={this.state.questionId} onChange={this.onFieldChange}></input>
                </div>
                <input type="submit" value="Add Question" />
            </form>
                {
                    this.state.course.questions.map((question) => <div key={question.questionId}>
                                                                            {question.questionPhrase}
                                                                    </div>)
                }
            </div>
        )
    }
}

export default Course;