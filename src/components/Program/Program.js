import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import SaveIcon from '@material-ui/icons/Save';
import DeleteIcon from '@material-ui/icons/Delete';
import InputBase from '@material-ui/core/InputBase';
import { connect } from 'react-redux'
import { withFirebase } from '../Firebase'
import { deleteProgram, saveProgram } from '../../actions'
import { compose } from 'recompose';

const styles = theme => ({
  card: {
    maxWidth: 400,
    margin: '5px',
    cursor: 'pointer',
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


const ProgramCardBase = ({
  program, 
  index, 
  firebase,
  deleteProgram, 
  saveProgram,
  classes}) => {

  const handleProgramTitle = (event) => {
    program.title = event.target.value;
  }

  return (
      <Card className={classes.card}>
        <CardHeader
          avatar={
            <Avatar aria-label="Recipe" className={classes.avatar}>
              {index+1}
            </Avatar>
          }
          title={
            <InputBase
              id="programTitle"
              defaultValue={program.title}
              fullWidth={true}
              margin={'dense'}
              multiline
              InputProps={{ fullWidth: true }}
              placeholder="Type the program title here"
              autoFocus
              onChange={handleProgramTitle}
            />
          }
        />
        <CardContent className={classes.cardContent} fullWidth>
          
        </CardContent>
        <CardActions className={classes.actions} disableActionSpacing>
          <IconButton aria-label="Save Program">
            <SaveIcon onClick={() => {saveProgram(firebase, program)}}/>
          </IconButton>
          <IconButton aria-label="Delete Program">
            <DeleteIcon onClick={() => {deleteProgram(firebase, program.key)}} />
          </IconButton>
        </CardActions>
      </Card>
    );
  }

const mapDispatchToProps = dispatch => ({
  deleteProgram: (firebase, key) => dispatch(deleteProgram(firebase, key)),
  saveProgram: (firebase, program) => dispatch(saveProgram(firebase, program)),
})

const ProgramCard = compose(
  withFirebase,
  withStyles(styles)
)(ProgramCardBase)


export default connect(null, mapDispatchToProps)(ProgramCard);