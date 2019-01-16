import React, { useEffect } from 'react';
import ProgramCard from './Program.js'
import Grid from '@material-ui/core/Grid';
import { addProgram, fetchPrograms, cleanupPrograms } from '../../actions'
import { connect } from 'react-redux'
import { withFirebase } from '../Firebase'
import { withStyles } from '@material-ui/core/styles';
import { compose } from 'recompose';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add'

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

const ProgramsBase = ({programs, addProgram, fetchPrograms, cleanupPrograms, firebase, classes}) => {

  useEffect(() => {
    fetchPrograms(firebase);
    return function cleanup() {
      cleanupPrograms(firebase);
    };
  }, [])

  return (
    <div className={classes.app}>
      <Fab color="primary" aria-label="Add" className={classes.fab}>
        <AddIcon onClick={() => {addProgram(firebase)}} style={{margin: '10px'}}/>
      </Fab>
      <div>
        <Grid container spacing={12}>
          {
            programs.map((program, index) => (
              <Grid item xs={4} key={program.key}>
                <ProgramCard 
                  program={program} 
                  index = {index}
                  />
              </Grid>
            ))
          }
        </Grid>
        {
          programs.length === 0 && (<div>Click (+) button to add a program!</div>)
        }
      </div>
    </div>
  )
}

const mapStateToProps = state => ({
  programs: state.programs
})

const mapDispatchToProps = dispatch => ({
  addProgram: (firebase) => {dispatch(addProgram(firebase))},
  fetchPrograms: (firebase) => dispatch(fetchPrograms(firebase)),
  cleanupPrograms: (firebase) => dispatch(cleanupPrograms(firebase))
})

const Programs = compose(
  withFirebase,
  withStyles(styles)
)(ProgramsBase)

export default connect(mapStateToProps, mapDispatchToProps)(Programs)