import React from 'react';
import { Container, Row, Col } from 'react-grid-system';
import './question.css';
import UniCodeEditor from '../UniCodeEditor/UniCodeEditor.js'
import { connect } from 'react-redux'
import {deleteQuestion, saveQuestion, openQuestion, closeQuestion} from '../../actions'

const Question = ({
    question, 
    index, 
    deleteQuestion, 
    saveQuestion,
    openQuestion,
    closeQuestion}) => {
    const onChangeQuestion = (editorText) => {
        question.text = editorText;
    }

    const onChangeAnswer = (index, editorText) => {
        question.answers[index] = editorText;
    }

    const getRandomCode = () => (Math.random().toString(36).substr(2, 6)).toUpperCase();
    
    return(
        <div className="question">
            <Container>
                <Row>
                    <Col md={10} class='Heading'>Question ({index}):</Col>
                    <Col md={2} class='SubHeading'>Code</Col>
                </Row>
                <Row class="opened">
                    <Col md={10} class='pStyle'>
                        <UniCodeEditor text={question.text} propagate={onChangeQuestion}/>
                    </Col>
                    <Col md={2} class='pStyle boldText'>
                        <span>{question.code}</span>
                        <input type="button" 
                            value="Generate code" 
                            name="generateCode" 
                            class="btn" 
                            onClick={() => saveQuestion(index, {...question, code: getRandomCode()})} />
                    </Col>
                </Row>
                <Row>
                    <Col md={10} class='Heading'>Answers:</Col>
                    <Col md={2} class='SubHeading'>Correct
                    </Col>                
                </Row>
                {
                    question.answers.map((answer, answerIndex) => (
                        <Row>
                            <Col md={10} class='pStyle'>
                                <UniCodeEditor 
                                    text={answer.text} propagate={(editorText) => onChangeAnswer(answerIndex, editorText)}/>
                            </Col>
                            <Col md={2} class='pStyle'>
                                <input 
                                    type="radio"
                                    value={answerIndex} 
                                    onChange={() => saveQuestion(index, {...question, correct: answerIndex})} 
                                    checked={answerIndex === question.correct}/>
                            </Col>
                        </Row>
                    ))
                }
                <Row>
                    <Col md={12} class="Heading">
                        <input 
                            style={{ visibility: !!question.code && (question.status === "NEW" || !question.status) ? 'visible': 'hidden'}} 
                            type="button" 
                            value="Open for viewers" 
                            name="openAQuestion" 
                            class="btn default" onClick={() => openQuestion(index)}/>

                        <input 
                            style={{ visibility: question.status === "OPENED" ? 'visible': 'hidden'}} 
                            type="button" 
                            value="Close for viewers" 
                            name="closeAQuestion" 
                            class="btn default" onClick={() => closeQuestion(index)}/>
                            
                        <input 
                            type="button" 
                            value="Save changes" 
                            name="saveQuestion" 
                            class="btn" 
                            onClick={() => saveQuestion(index, {...question})}/>

                        <button 
                            class="btn" 
                            onClick={() => deleteQuestion(index)}>Delete question</button>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

const mapStateToProps = state => ({
    questions: state.questions
})
  
const mapDispatchToProps = dispatch => ({
    deleteQuestion: id => dispatch(deleteQuestion(id)),
    saveQuestion: (index, question) => dispatch(saveQuestion(index, question)),
    openQuestion: (index) => dispatch(openQuestion(index)),
    closeQuestion: (index) => dispatch(closeQuestion(index))
})

export default connect(mapStateToProps, mapDispatchToProps)(Question);
