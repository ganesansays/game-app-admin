import React, {useEffect, useContext} from 'react';
import Question from '../question'
import QuestionCard from '../question/questionCard.js'
import { connect } from 'react-redux'
import { addQuestion, fetchQuestions, cleanupQuestions } from '../../actions'
import { withFirebase } from '../Firebase'
import Grid from '@material-ui/core/Grid';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add'
import { withStyles } from '@material-ui/core/styles';
import { compose } from 'recompose';

const styles = theme => ({
  fab: {
    margin: 0,
    top: 'auto',
    right: 20,
    bottom: 20,
    left: 'auto',
    position: 'fixed',
    backgroundColor: 'red'
  },
  app: {
    margin: '15px',
  }
});

const QuestionsBase = ({questions, addQuestion, fetchQuestions, cleanupQuestions, firebase, classes}) => {

  useEffect(() => {
    fetchQuestions(firebase);
    return function cleanup() {
      cleanupQuestions(firebase);
    };
  }, [])

  let messagesEnd = React.createRef();

  const scrollToBottom = () => {
    messagesEnd.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <div className={classes.app}>
      <Fab color="primary" aria-label="Add" className={classes.fab}>
        <AddIcon onClick={() => {addQuestion(firebase); scrollToBottom();}} style={{margin: '10px'}}/>
      </Fab>
      <div>
        <Grid container spacing={12}>
          {
            questions.map((question, index) => (
              <Grid item xs={4}>
                <QuestionCard key={question.key}
                  question={question} 
                  index = {index}
                  />
              </Grid>
            ))
          }
        </Grid>
        {
          questions.length === 0 && (<div>Click (+) button to add a question!</div>)
        }
      </div>
      <div style={{ float:"left", clear: "both" }}
             ref={(el) => { messagesEnd = el; }}></div>
    </div>
  );
}

const mapStateToProps = state => ({
  questions: state.questions
})

const mapDispatchToProps = dispatch => ({
  addQuestion: (firebase) => {dispatch(addQuestion(firebase))},
  fetchQuestions: (firebase) => dispatch(fetchQuestions(firebase)),
  cleanupQuestions: (firebase) => dispatch(cleanupQuestions(firebase))
})

const Questions = compose(
  withFirebase,
  withStyles(styles)
)(QuestionsBase)

//export default withFirebase(connect(mapStateToProps, mapDispatchToProps)(Questions));
export default connect(mapStateToProps, mapDispatchToProps)(Questions)