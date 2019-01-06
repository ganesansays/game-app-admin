import React, {useEffect} from 'react';
import Question from '../question'
import { connect } from 'react-redux'
import { addQuestion, fetchQuestions } from '../../actions'

const Questions = ({questions, addQuestion}) => {

  useEffect(() => {
    fetchQuestions();
  }, [])

  return (
    <div className="App">
      <button onClick={addQuestion}>Add Question</button>
      {
        questions.map((question, index) => (
          <Question
            question={question} 
            index = {index}
            />
        ))
      }
    </div>
  );
}

const mapStateToProps = state => ({
  questions: state.questions
})

const mapDispatchToProps = dispatch => ({
  addQuestion: () => dispatch(addQuestion()),
  fetchQuestions: (firebase) => dispatch(fetchQuestions(firebase))
})

export default connect(mapStateToProps, mapDispatchToProps)(Questions);