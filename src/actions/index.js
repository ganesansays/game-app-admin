import Firebase from 'firebase';

const BLANK_QUESTION = { answers: Array(4).fill({ text: "" }) }

export const fetchQuestions = (questionStore) => async dispatch => {
  if (questionStore && questionStore.auth && questionStore.auth.currentUser && questionStore.auth.currentUser.uid) {
    questionStore.questions(questionStore.auth.currentUser.uid).on("value", snapshot => {
      let questionsDbData = snapshot.val();
      const questions = snapshot.val() ? Object.keys(questionsDbData).map(key => ({
        ...questionsDbData[key],
        key: key,
      })) : [];
      dispatch({
        type: 'FETCH_QUESTIONS',
        questions: questions
      });
    });
  } else {
    console.log('User is either not authenticated or there is something wrong with the authentiation!');
  }

};

export const cleanupQuestions = (questionStore) => async dispatch => {
  questionStore.questions().off();
}

export const deleteQuestion = (questionStore, key) => async dispatch => {
  if (questionStore && questionStore.auth && questionStore.auth.currentUser && questionStore.auth.currentUser.uid) {
    questionStore.questions(questionStore.auth.currentUser.uid).child(key).remove();
    dispatch({
      type: 'REFRESH_LIST'
    });
  }
}

const getRandomCode = () => (Math.random().toString(36).substr(2, 6)).toUpperCase();

export const addQuestion = (questionStore) => async dispatch => {
  if (questionStore && questionStore.auth && questionStore.auth.currentUser && questionStore.auth.currentUser.uid) {
    questionStore.questions(questionStore.auth.currentUser.uid).push().set({ ...BLANK_QUESTION, code: getRandomCode() });
    dispatch({
      type: 'REFRESH_LIST'
    });
  }
}

export const saveQuestion = (questionStore, question) => async dispatch => {
  if (questionStore && questionStore.auth && questionStore.auth.currentUser && questionStore.auth.currentUser.uid) {
    questionStore.questions(questionStore.auth.currentUser.uid).child(question.key).set(question);
    dispatch({
      type: 'REFRESH_LIST'
    });
  }
}

export const openQuestion = (questionStore, question) => async dispatch => {
  question.status = "OPENED"
  question.openTime =  Firebase.database.ServerValue.TIMESTAMP;
  if (questionStore && questionStore.auth && questionStore.auth.currentUser && questionStore.auth.currentUser.uid) {
    questionStore.questions(questionStore.auth.currentUser.uid).child(question.key).set(question);
    dispatch({
      type: 'REFRESH_LIST'
    });
  }
}

export const closeQuestion = (questionStore, question) => async dispatch => {
  question.status = "CLOSED"
  if (questionStore && questionStore.auth && questionStore.auth.currentUser && questionStore.auth.currentUser.uid) {
    questionStore.questions(questionStore.auth.currentUser.uid).child(question.key).set(question);
    dispatch({
      type: 'REFRESH_LIST'
    });
  }
}