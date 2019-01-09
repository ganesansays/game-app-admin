import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import SaveIcon from '@material-ui/icons/Save';
import LockIcon from '@material-ui/icons/Lock';
import DeleteIcon from '@material-ui/icons/Delete';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import Radio from '@material-ui/core/Radio';
import InputBase from '@material-ui/core/InputBase';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import { connect } from 'react-redux'
import { withFirebase } from '../Firebase'
import {deleteQuestion, saveQuestion, openQuestion, closeQuestion} from '../../actions'
import { compose } from 'recompose';
import { useState } from 'react';
import { InputLabel } from '@material-ui/core';
import Counter from '../Counter'
import Countdown from 'react-countdown-now'

const styles = theme => ({
  card: {
    maxWidth: 400,
    margin: '5px'
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  actions: {
    display: 'flex',
  },
  /*avatar: {
    backgroundColor: default,
  },*/
  correctAnswer: {
    flex: '0 0 1px'
  },
  cardContent: {
    //backgroundColor: 'red',
    marginRight: '15px'
  },
  answerText: {
    padding: '5px',
    //backgroundColor: 'lightgrey',
    flex: 1,
    margin: '5px'
  },
  fab: {
    position: 'absolute',
    bottom: theme.spacing.unit * 2,
    right: theme.spacing.unit * 2,
  },
  counter: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  }
});


// Renderer callback with condition
const renderer = ({ seconds, milliseconds, completed }) => {
  if (completed) {
    // Render a complete state
    return <span></span>;
  } else {
    // Render a countdown
    return (
      <div>
      <span>
        {seconds}
      </span>
      </div>
    );
  }
};

const QuestionCardBase = ({
  question, 
  index, 
  deleteQuestion, 
  saveQuestion,
  openQuestion,
  closeQuestion,
  firebase,
  classes}) => {

    const [questionLocalState, setQuestion] = useState(question);

    const handleQuestionTextChange = (event) => {
      let changedQuestion = {...questionLocalState, text: event.target.value};
      setQuestion(changedQuestion);
    }

    const handleCorrectAnswerChange = (event) => {
      let changedQuestion = {...questionLocalState, correctAnswer: event.target.value};
      setQuestion(changedQuestion)
    }

    const handleAnswerTextChange = (event, answerIndex) => {
      let changedQuestion = {...questionLocalState};
      changedQuestion.answers[answerIndex].text = event.target.value;
      setQuestion(changedQuestion);
    }

    return (
      <div>
      <Card className={classes.card}>
        <CardHeader
          avatar={
            <Avatar aria-label="Recipe" className={classes.avatar}>
              {index + 1}
            </Avatar>
          }
          title={
            <InputBase
              id="questionText"
              defaultValue={question.text}
              fullWidth={true}
              margin={'dense'}
              multiline
              InputProps={{ fullWidth: true }}
              placeholder="Type your question here"
              autoFocus
              onChange={handleQuestionTextChange}
            />
          }
          subheader={question.code}
        />
        <CardContent className={classes.cardContent} fullWidth>
        <FormControl component="fieldset" className={classes.formControl} fullWidth>
          <RadioGroup
            aria-label="Gender"
            name="gender1"
            fullWidth
            className={classes.group}
            value={question.correctAnswer}
            onChange={handleCorrectAnswerChange}
          >
          {
            question.answers.map((answer, answerIndex) => {
              return (
                <FormControlLabel
                  className={classes.answerText}
                  value={""+answerIndex} control={<Radio fullWidth />}
                  fullwidth={true}
                  inputlabelprops={{ fullWidth: true }}
                  InputProps={{ fullWidth: true }}
                  label={
                    <InputBase
                    inputlabelprops={{ shrink: true }}
                      defaultValue={answer.text}
                      fullwidth={true}
                      margin={'dense'}
                      multiline
                      InputProps={{ fullWidth: true }}
                      placeholder="Type your answer here"
                      onChange={(event) => handleAnswerTextChange(event, answerIndex)}
                    />
                  }
                />
            )})
          }
          </RadioGroup>
        </FormControl>
        </CardContent>
        <CardActions className={classes.actions} disableActionSpacing>
          <IconButton aria-label="Edit question">
            <SaveIcon onClick={() => saveQuestion(firebase, questionLocalState)}/>
          </IconButton>
          <IconButton aria-label="Delete question">
            <DeleteIcon onClick={() => deleteQuestion(firebase, question.key)}/>
          </IconButton>
          {question.status === "OPENED" && 
          <IconButton aria-label="Lock questions for viewers">
            <LockIcon onClick={() => closeQuestion(firebase, question)}/>
          </IconButton>}
          {!!question.code && (question.status === "NEW" || !question.status) && 
            <IconButton aria-label="Un lock questions for viewers">
            <LockOpenIcon  onClick={() => openQuestion(firebase, question)}/>
          </IconButton>}
          {question.status === "OPENED" && 
          <IconButton
            className={classes.counter}
            aria-label="Show more"
            disabled
            style={{color: 'red'}}
          >
            <Countdown 
              date={new Date(question.openTime + 40 * 1000)} 
              renderer={renderer}
              intervalDelay={0}
              precision={3}
              onComplete={() => closeQuestion(firebase, question)}
            ></Countdown>
          </IconButton>}
        </CardActions>
      </Card>
          </div>
    );
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

const QuestionCard = compose(
  withStyles(styles),
  withFirebase
)(QuestionCardBase)

export default connect(mapStateToProps, mapDispatchToProps)(QuestionCard);