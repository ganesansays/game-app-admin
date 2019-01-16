import Firebase from 'firebase';

export const fetchShows = (firestore, programKey) => async dispatch => {
  if (firestore && firestore.auth && firestore.auth.currentUser && firestore.auth.currentUser.uid) {
    firestore.shows(firestore.auth.currentUser.uid, programKey).on("value", snapshot => {
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

export const deleteShow = (firestore, programKey, key) => async dispatch => {
  console.log('delete show...' + key);
  if (firestore && firestore.auth && firestore.auth.currentUser && firestore.auth.currentUser.uid) {
    firestore.shows(firestore.auth.currentUser.uid, programKey).child(key).remove();
    dispatch({
      type: 'REFRESH_LIST'
    });
  }
}

export const addShow = (firestore, programKey) => async dispatch => {
  if (firestore && firestore.auth && firestore.auth.currentUser && firestore.auth.currentUser.uid) {
    firestore.shows(firestore.auth.currentUser.uid, programKey).push().set({title: ""});
    dispatch({
      type: 'REFRESH_LIST'
    });
  }
}

export const saveShow = (firestore, programKey, show) => async dispatch => {
  if (firestore && firestore.auth && firestore.auth.currentUser && firestore.auth.currentUser.uid) {
    firestore.shows(firestore.auth.currentUser.uid, programKey).child(show.key).set(show);
    dispatch({
      type: 'REFRESH_LIST'
    });
  }
}