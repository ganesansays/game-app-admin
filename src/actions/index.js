export const fetchQuestions = (questionStore) => async dispatch => { 
  questions: questionStore.on("value", snapshot => {
    dispatch({
      type: 'FETCH_QUESTIONS',
      questions: snapshot.val()
    })
  })
}

export const addQuestion = () => ({
  type: 'ADD_QUESTION'
})

export const deleteQuestion = (index) => ({
  type: 'DELETE_QUESTION',
  index: index
})

export const saveQuestion = (index, question) => ({
  type: 'SAVE_QUESTION',
  question: question,
  index: index
})

export const openQuestion = (index) => ({
  type: 'OPEN_QUESTION',
  index: index
})

export const closeQuestion = (index) => ({
  type: 'CLOSE_QUESTION',
  index: index
})