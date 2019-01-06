import React from 'react';
import { Container, Row, Col } from 'react-grid-system';
import './question.css';
import UniCodeEditor from '../UniCodeEditor/UniCodeEditor.js'
import { connect } from 'react-redux'
import { withFirebase } from '../Firebase'
import {deleteQuestion, saveQuestion, openQuestion, closeQuestion} from '../../actions'

const Question = ({
    question, 
    index, 
    deleteQuestion, 
    saveQuestion,
    openQuestion,
    closeQuestion,
    firebase}) => {
    const onChangeQuestion = (editorText) => {
        question.text = editorText;
    }

    const onChangeAnswer = (index, editorText) => {
        question.answers[index].text = editorText;
    }

    const getRandomCode = () => (Math.random().toString(36).substr(2, 6)).toUpperCase();
    
    return(
        <div className="question">
            <Container>
                <Row>
                    <Col md={10} className='Heading'>Question ({question.key}):</Col>
                    <Col md={2} className='SubHeading'>Code</Col>
                </Row>
                <Row className="opened">
                    <Col md={10} className='pStyle'>
                        <UniCodeEditor text={question.text} propagate={onChangeQuestion}/>
                    </Col>
                    <Col md={2} className='pStyle boldText'>
                        <span>{question.code}</span>
                        <input type="button" 
                            value="Generate code" 
                            name="generateCode" 
                            className="btn" 
                            onClick={() => saveQuestion(firebase, {...question, code: getRandomCode()})} />
                    </Col>
                </Row>
                <Row>
                    <Col md={10} className='Heading'>Answers:</Col>
                    <Col md={2} className='SubHeading'>Correct
                    </Col>                
                </Row>
                {
                    question.answers.map((answer, answerIndex) => {
                        return (
                        <Row key={answerIndex}>
                            <Col md={10} className='pStyle'>
                                <UniCodeEditor 
                                    text={answer.text} propagate={(editorText) => onChangeAnswer(answerIndex, editorText)}/>
                            </Col>
                            <Col md={2} className='pStyle'>
                                <input 
                                    type="radio"
                                    value={answerIndex} 
                                    onChange={() => saveQuestion(firebase, {...question, correct: answerIndex})} 
                                    checked={answerIndex === question.correct}/>
                            </Col>
                        </Row>
                    )})
                }
                <Row>
                    <Col md={12} className="Heading">
                        <input 
                            style={{ visibility: !!question.code && (question.status === "NEW" || !question.status) ? 'visible': 'hidden'}} 
                            type="button" 
                            value="Open for viewers" 
                            name="openAQuestion" 
                            className="btn default" onClick={() => openQuestion(firebase, question)}/>

                        <input 
                            style={{ visibility: question.status === "OPENED" ? 'visible': 'hidden'}} 
                            type="button" 
                            value="Close for viewers" 
                            name="closeAQuestion" 
                            className="btn default" onClick={() => closeQuestion(firebase, question)}/>
                            
                        <input 
                            type="button" 
                            value="Save changes" 
                            name="saveQuestion" 
                            className="btn" 
                            onClick={() => saveQuestion(firebase, {...question})}/>

                        <button 
                            className="btn" 
                            onClick={() => deleteQuestion(firebase, question.key)}>Delete question</button>
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
    deleteQuestion: (firebase, key) => dispatch(deleteQuestion(firebase, key)),
    saveQuestion: (firebase, question) => dispatch(saveQuestion(firebase, question)),
    openQuestion: (firebase, question) => dispatch(openQuestion(firebase, question)),
    closeQuestion: (firebase, question) => dispatch(closeQuestion(firebase, question))
})

export default withFirebase(connect(mapStateToProps, mapDispatchToProps)(Question));
