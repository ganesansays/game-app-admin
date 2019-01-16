import React, { useEffect } from 'react';
import ShowCard from './Show.js'
import Grid from '@material-ui/core/Grid';
import { addShow, fetchShows, cleanupShows } from '../../actions'
import { connect } from 'react-redux'
import { withFirebase } from '../Firebase'
import { withStyles } from '@material-ui/core/styles';
import { compose } from 'recompose';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add'
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

const ShowsBase = ({shows, addShow, fetchShows, cleanupShows, firebase, classes, programKey}) => {

  console.log(programKey);

  useEffect(() => {
    fetchShows(firebase, programKey);
    return function cleanup() {
      cleanupShows(firebase);
    };
  }, [])

  return (
    <div className={classes.app}>
      <Typography variant="subheading" gutterBottom>
          <Link to="/program"
            className={classes.breadCrumbs}
            >
            <IconButton aria-label="Back to program">
              <ArrowBack/>
            </IconButton>
          Programs</Link>
      </Typography>
      <Fab color="primary" aria-label="Add" className={classes.fab}>
        <AddIcon onClick={() => {addShow(firebase, programKey)}} style={{margin: '10px'}}/>
      </Fab>
      <div>
        <Grid container spacing={12}>
          {
            shows.map((show, index) => (
              <Grid item xs={4} key={show.key}>
                <ShowCard 
                  programKey={programKey}
                  show={show} 
                  index = {index}
                  />
              </Grid>
            ))
          }
        </Grid>
        {
          shows.length === 0 && (<div>Click (+) button to add a show!</div>)
        }
      </div>
    </div>
  )
}

const mapStateToProps = state => ({
  shows: state.shows
})

const mapDispatchToProps = dispatch => ({
  addShow: (firebase, programKey) => {dispatch(addShow(firebase, programKey))},
  fetchShows: (firebase, programKey) => dispatch(fetchShows(firebase, programKey)),
  cleanupShows: (firebase) => dispatch(cleanupShows(firebase))
})

const Shows = compose(
  withFirebase,
  withStyles(styles)
)(ShowsBase)

export default connect(mapStateToProps, mapDispatchToProps)(Shows)