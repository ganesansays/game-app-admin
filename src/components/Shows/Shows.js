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

const ShowsBase = ({shows, addShow, fetchShows, cleanupShows, firebase, classes}) => {

  useEffect(() => {
    fetchShows(firebase);
    return function cleanup() {
      cleanupShows(firebase);
    };
  }, [])

  return (
    <div className={classes.app}>
      <Fab color="primary" aria-label="Add" className={classes.fab}>
        <AddIcon onClick={() => {addShow(firebase)}} style={{margin: '10px'}}/>
      </Fab>
      <div>
        <Grid container spacing={12}>
          {
            shows.map((show, index) => (
              <Grid item xs={4} key={show.key}>
                <ShowCard 
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
  addShow: (firebase) => {dispatch(addShow(firebase))},
  fetchShows: (firebase) => dispatch(fetchShows(firebase)),
  cleanupShows: (firebase) => dispatch(cleanupShows(firebase))
})

const Shows = compose(
  withFirebase,
  withStyles(styles)
)(ShowsBase)

export default connect(mapStateToProps, mapDispatchToProps)(Shows)