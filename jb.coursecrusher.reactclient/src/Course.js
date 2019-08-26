import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'
import QuestionForm from './AddQuestionForm.js'
import editBtn from "./img/edit.png";
import deleteBtn from "./img/delete.png";
import saveBtn from "./img/save.png"

class Course extends Component {
    constructor(props) {
        super(props);
        this.state ={
            course:{
                name:this.props.location.state.name,
                owner:'',
                questions:[]
            },
            questionPhrase:'',
            answer:'',
            courseId:props.match.params.courseId,
        }
        this.onFieldChange = this.onFieldChange.bind(this);
    }

    async componentDidMount() {
        const response = await axios.get(`https://localhost:44320/api/courses/${this.state.courseId}`)
        const courseRes = response.data;      
        this.setState({course:courseRes});
    }

    onFieldChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }
    onDeleteClick = async (event) => {
        event.preventDefault();
        try
        {
          const targetId = event.target.id;
          await axios.delete(`https://localhost:44320/api/courses/${this.state.courseId}/questions/${targetId}`);
          
          const oldState = this.state;
          const newQuestions = this.state.course.questions.filter(function(question, index, arr){
            return question.questionId !== targetId;
          });
          this.setState({
              course: {
                  name: oldState.course.name,
                  owner: oldState.course.owner,
                  questions: newQuestions
              },
              courseId: oldState.courseId
          });
        }
        catch(err)
        {
          console.log(err);
        }
    }
    onQuestionAdded = (event) => {
        const oldState = this.state;
        const newQuestions = this.state.course.questions;
        newQuestions.push(event);
        this.setState({
            course: {
                name: oldState.course.name,
                owner: oldState.course.owner,
                questions: newQuestions
            },
            courseId: oldState.courseId
        });
      }
      onEditSubmit = async (event, questionId) => {
          event.preventDefault();
          try
          {
              const putData = {
                  questionId: questionId,
                  questionPhrase: this.state.questionPhrase,
                  answer: this.state.answer
              }
            await axios.put(`https://localhost:44320/api/courses/${this.state.courseId}/questions/${questionId}`, 
                            JSON.stringify(putData),
                            { headers: {'Content-Type':'application/json'}});
            const oldState = this.state;
            const newQuestions = this.state.course.questions;

            const currentQuestion = this.state.course.questions.find((question, index, arr) => {
                if(question.questionId === questionId){
                    return question;
                }
                return null;
            });
            currentQuestion.questionPhrase = this.state.questionPhrase;
            currentQuestion.answer = this.state.answer;
            
            this.setState({
                course: {
                    name: oldState.course.name,
                    owner: oldState.course.owner,
                    questions: newQuestions
                },
                courseId: oldState.courseId
            });
            
          }
          catch(err)
          {
            console.log(err);
          }
      }
      
      showEditForm = (e, question) => {
        
        Array.from(document.getElementsByClassName('questionform')).forEach(item => {
            item.style.display = 'none';
        })

        this.setState({
            questionPhrase: question.questionPhrase,
            answer: question.answer
        });
        
        const target = e.target.parentElement.parentElement.parentElement.querySelector('.' + question.questionId);
        if(this.currentQuestionId !== question.questionId){
            target.style.display = 'block';
            this.currentQuestionId = question.questionId;
        } else {
            target.style.display = 'none';
            this.currentQuestionId = '';
        }
    };
    render() {

        return (
            <div>
                <h1>
                    {this.props.location.state.name}
                </h1>
                {
                    this.state.course.questions.map((question) => 
                                                                <div className="list-item" key={question.questionId}>
                                                                <div id={question.questionId} className="flex-container" >
                                                                            <div style={{'flexGrow': '3'}}>
                                                                                {question.questionPhrase}
                                                                            </div>
                                                                            <img src={editBtn} style={{'flexGrow': '2'}} onClick={event => this.showEditForm(event, question)} width="5%" alt="Edit button"></img>
                                                                            <img src={deleteBtn} style={{'flexGrow': '2'}} onClick={(e) => {if(window.confirm('Are you sure you wish to delete this question?')) this.onDeleteClick(e)} } id={question.questionId} width="5%" alt="Delete button"></img>
                                                                            
                                                                            </div>
                                                                            <div className={'questionform ' + question.questionId}  style={{'display':'none'}}>
                                                                                <form onSubmit={e => this.onEditSubmit(e, question.questionId)} className="flex-container ">
                                                                                    <div style={{'flexGrow': '8'}}>
                                                                                        <div>
                                                                                            <label htmlFor="questionPhrase">Question phrase</label>
                                                                                            <input type="text" name="questionPhrase" value={this.state.questionPhrase} onChange={this.onFieldChange}></input>
                                                                                        </div>
                                                                                        <div>
                                                                                            <label htmlFor="answer">Answer</label>
                                                                                            <input type="text" name="answer" value={this.state.answer} onChange={this.onFieldChange}></input>
                                                                                        </div>
                                                                                    </div>
                                                                                        <input className="save-btn" type="image" alt="Save button" src={saveBtn}></input>
                                                                                    </form>
                                                                            </div>
                                                                    
                                                                    </div>)
                }
                <Link to="/courses">⬅Back</Link>
                <div className="sidenav">
                    <QuestionForm onQuestionAdded={this.onQuestionAdded} courseId={this.state.courseId}/>
                </div>
            </div>
        )
    }
}

export default Course;