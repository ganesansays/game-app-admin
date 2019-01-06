import React, {useEffect} from 'react';
import Question from '../question'
import { connect } from 'react-redux'
import { addQuestion, fetchQuestions, cleanupQuestions } from '../../actions'
import { withFirebase } from '../Firebase'

const Questions = ({questions, addQuestion, fetchQuestions, cleanupQuestions, firebase}) => {

  useEffect(() => {
    fetchQuestions(firebase);
    return function cleanup() {
      cleanupQuestions(firebase);
    };
  }, [])

  return (
    <div className="App">
      <button onClick={() => addQuestion(firebase)}>Add Question</button>
      {
        questions.map((question, index) => (
          <Question key={question.key}
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
  addQuestion: (firebase) => dispatch(addQuestion(firebase)),
  fetchQuestions: (firebase) => dispatch(fetchQuestions(firebase)),
  cleanupQuestions: (firebase) => dispatch(cleanupQuestions(firebase))
})

export default withFirebase(connect(mapStateToProps, mapDispatchToProps)(Questions));