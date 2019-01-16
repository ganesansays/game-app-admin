import Firebase from 'firebase';

export const fetchShows = (firestore) => async dispatch => {
  if (firestore && firestore.auth && firestore.auth.currentUser && firestore.auth.currentUser.uid) {
    firestore.shows(firestore.auth.currentUser.uid).on("value", snapshot => {
      let showsDbData = snapshot.val();
      const shows = snapshot.val() ? Object.keys(showsDbData).map(key => ({
        ...showsDbData[key],
        key: key,
      })) : [];
      dispatch({
        type: 'FETCH_SHOWS',
        shows: shows
      });
    });
  } else {
    console.log('User is either not authenticated or there is something wrong with the authentiation!');
  }
};

export const cleanupShows = (firestore) => async dispatch => {
  firestore.shows().off();
}

export const deleteShow = (firestore, key) => async dispatch => {
  console.log('delete show...' + key);
  if (firestore && firestore.auth && firestore.auth.currentUser && firestore.auth.currentUser.uid) {
    firestore.shows(firestore.auth.currentUser.uid).child(key).remove();
    dispatch({
      type: 'REFRESH_LIST'
    });
  }
}

export const addShow = (firestore) => async dispatch => {
  if (firestore && firestore.auth && firestore.auth.currentUser && firestore.auth.currentUser.uid) {
    firestore.shows(firestore.auth.currentUser.uid).push().set({title: ""});
    dispatch({
      type: 'REFRESH_LIST'
    });
  }
}

export const saveShow = (firestore, show) => async dispatch => {
  if (firestore && firestore.auth && firestore.auth.currentUser && firestore.auth.currentUser.uid) {
    firestore.shows(firestore.auth.currentUser.uid).child(show.key).set(show);
    dispatch({
      type: 'REFRESH_LIST'
    });
  }
}