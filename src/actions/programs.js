import Firebase from 'firebase';

export const fetchPrograms = (firestore) => async dispatch => {
  if (firestore && firestore.auth && firestore.auth.currentUser && firestore.auth.currentUser.uid) {
    firestore.programs(firestore.auth.currentUser.uid).on("value", snapshot => {
      let programsDbData = snapshot.val();
      const programs = snapshot.val() ? Object.keys(programsDbData).map(key => ({
        ...programsDbData[key],
        key: key,
      })) : [];
      dispatch({
        type: 'FETCH_PROGRAMS',
        programs: programs
      });
    });
  } else {
    console.log('User is either not authenticated or there is something wrong with the authentiation!');
  }
};

export const cleanupPrograms = (firestore) => async dispatch => {
  firestore.programs().off();
}

export const deleteProgram = (firestore, key) => async dispatch => {
  console.log('delete program...' + key);
  if (firestore && firestore.auth && firestore.auth.currentUser && firestore.auth.currentUser.uid) {
    firestore.programs(firestore.auth.currentUser.uid).child(key).remove();
    dispatch({
      type: 'REFRESH_LIST'
    });
  }
}

export const addProgram = (firestore) => async dispatch => {
  if (firestore && firestore.auth && firestore.auth.currentUser && firestore.auth.currentUser.uid) {
    firestore.programs(firestore.auth.currentUser.uid).push().set({title: ""});
    dispatch({
      type: 'REFRESH_LIST'
    });
  }
}

export const saveProgram = (firestore, program) => async dispatch => {
  if (firestore && firestore.auth && firestore.auth.currentUser && firestore.auth.currentUser.uid) {
    firestore.programs(firestore.auth.currentUser.uid).child(program.key).set(program);
    dispatch({
      type: 'REFRESH_LIST'
    });
  }
}