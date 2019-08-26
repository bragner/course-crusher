import React from 'react'
import axios from 'axios'

class QuestionForm extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            courseId:props.courseId,
            questionId: '',
            questionPhrase: '',
            answer: '',
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
            alert(`Sucessfully added question to course: ${this.state.courseId}`);
            this.setState({
                questionId:'',
                questionPhrase:'',
                answer:''
            });
            this.props.onQuestionAdded(body);
        }
        catch(err){
            console.log(err);
            alert("Something went wrong...");
        }
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <div>
                    <label htmlFor="questionPhrase">Question phrase</label>
                    <input type="text" name="questionPhrase" value={this.state.questionPhrase} onChange={this.onFieldChange}></input>
                </div>
                <div>
                    <label htmlFor="answer">Answer</label>
                    <input type="text" name="answer" value={this.state.answer} onChange={this.onFieldChange}></input>
                </div>
                <div>
                    <label htmlFor="questionId">Question Id</label>
                    <input type="text" name="questionId" value={this.state.questionId} onChange={this.onFieldChange}></input>
                </div>
                <input type="submit" value="Add Question" />
            </form>
        )
    }

}

export default QuestionForm;