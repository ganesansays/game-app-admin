import Firebase from 'firebase';

const BLANK_QUESTION = { answers: Array(4).fill({ text: "" }) }

export const fetchQuestions = (questionStore, programKey, showKey) => async dispatch => {
  if (questionStore && questionStore.auth && questionStore.auth.currentUser && questionStore.auth.currentUser.uid) {
    questionStore.questions(questionStore.auth.currentUser.uid, programKey, showKey).on("value", snapshot => {
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

export const deleteQuestion = (questionStore, programKey, showKey, key) => async dispatch => {
  if (questionStore && questionStore.auth && questionStore.auth.currentUser && questionStore.auth.currentUser.uid) {
    questionStore.questions(questionStore.auth.currentUser.uid, programKey, showKey).child(key).remove();
    dispatch({
      type: 'REFRESH_LIST'
    });
  }
}

const getRandomCode = () => (Math.random().toString(36).substr(2, 6)).toUpperCase();

export const addQuestion = (questionStore, programKey, showKey) => async dispatch => {
  if (questionStore && questionStore.auth && questionStore.auth.currentUser && questionStore.auth.currentUser.uid) {
    questionStore.questions(questionStore.auth.currentUser.uid, programKey, showKey).push().set({ ...BLANK_QUESTION, code: getRandomCode() });
    dispatch({
      type: 'REFRESH_LIST'
    });
  }
}

export const saveQuestion = (questionStore, programKey, showKey, question) => async dispatch => {
  if (questionStore && questionStore.auth && questionStore.auth.currentUser && questionStore.auth.currentUser.uid) {
    questionStore.questions(questionStore.auth.currentUser.uid, programKey, showKey).child(question.key).set(question);
    dispatch({
      type: 'REFRESH_LIST'
    });
  }
}

export const openQuestion = (questionStore, programKey, showKey, question) => async dispatch => {
  question.status = "OPENED"
  question.openTime =  Firebase.database.ServerValue.TIMESTAMP;
  if (questionStore && questionStore.auth && questionStore.auth.currentUser && questionStore.auth.currentUser.uid) {
    questionStore.questions(questionStore.auth.currentUser.uid, programKey, showKey).child(question.key).set(question);
    dispatch({
      type: 'REFRESH_LIST'
    });
  }
}

export const closeQuestion = (questionStore, programKey, showKey, question) => async dispatch => {
  question.status = "NEW"
  if (questionStore && questionStore.auth && questionStore.auth.currentUser && questionStore.auth.currentUser.uid) {
    questionStore.questions(questionStore.auth.currentUser.uid, programKey, showKey).child(question.key).set(question);
    dispatch({
      type: 'REFRESH_LIST'
    });
  }
}