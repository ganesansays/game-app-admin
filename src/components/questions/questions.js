import React, {useEffect, useContext} from 'react';
import QuestionCard from './questionCard.js'
import { connect } from 'react-redux'
import { addQuestion, fetchQuestions, cleanupQuestions } from '../../actions'
import { withFirebase } from '../Firebase'
import Grid from '@material-ui/core/Grid';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add'
import { withStyles } from '@material-ui/core/styles';
import { compose } from 'recompose';
import { Link } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import ArrowBack from '@material-ui/icons/ArrowBack';

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
  },
  breadCrumbs: {
    textDecoration: 'none',
    fontWeight: 'bold',
    color: 'black'
  }
});

const QuestionsBase = ({programKey, showKey, questions, addQuestion, fetchQuestions, cleanupQuestions, firebase, classes}) => {

  useEffect(() => {
    fetchQuestions(firebase, programKey, showKey);
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
      <Typography variant="subheading" gutterBottom>
        <Link to={`/show/${programKey}`} 
            className={classes.breadCrumbs}
            >
            <IconButton aria-label="Back to shows">
              <ArrowBack/>
            </IconButton>
          Shows</Link>
      </Typography>
      
      <Fab color="primary" aria-label="Add" className={classes.fab}>
        <AddIcon onClick={() => {addQuestion(firebase, programKey, showKey); scrollToBottom();}} style={{margin: '10px'}}/>
      </Fab>
      <div>
        <Grid container spacing={12}>
          {
            questions.map((question, index) => (
              <Grid item xs={4}>
                <QuestionCard key={question.key}
                  programKey={programKey}
                  showKey={showKey}
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
  addQuestion: (firebase, programKey, showKey) => {dispatch(addQuestion(firebase, programKey, showKey))},
  fetchQuestions: (firebase, programKey, showKey) => dispatch(fetchQuestions(firebase, programKey, showKey)),
  cleanupQuestions: (firebase) => dispatch(cleanupQuestions(firebase))
})

const Questions = compose(
  withFirebase,
  withStyles(styles)
)(QuestionsBase)

export default connect(mapStateToProps, mapDispatchToProps)(Questions)