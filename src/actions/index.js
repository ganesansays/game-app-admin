const BLANK_QUESTION = {answers: Array(4).fill({text: ""})}

export const fetchQuestions = (questionStore) => async dispatch => {
  questionStore.questions().on("value", snapshot => {
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
};

export const cleanupQuestions = (questionStore) => async dispatch => {
  questionStore.questions().off();
}

export const deleteQuestion = (questionStore, key) => async dispatch => {
  questionStore.questions().child(key).remove();
  dispatch({
    type: 'REFRESH_LIST'
  });
}

export const addQuestion = (questionStore) => async dispatch => {
  questionStore.questions().push().set(BLANK_QUESTION);
  dispatch({
    type: 'REFRESH_LIST'
  });
}

export const saveQuestion = (questionStore, question) => async dispatch => {
  questionStore.questions().child(question.key).set(question);
  dispatch({
    type: 'REFRESH_LIST'
  });
}

export const openQuestion = (questionStore, question) => async dispatch => {
  question.status = "OPENED"
  questionStore.questions().child(question.key).set(question);
  dispatch({
    type: 'REFRESH_LIST'
  });
}

export const closeQuestion = (questionStore, question) => async dispatch => {
  question.status = "CLOSED"
  questionStore.questions().child(question.key).set(question);
  dispatch({
    type: 'REFRESH_LIST'
  });
}