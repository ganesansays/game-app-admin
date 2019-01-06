const questions = (state = [], action) => {
  switch (action.type) {
    case 'FETCH_QUESTIONS':
      return action.questions;
    case 'ADD_QUESTION':
      return [...state, {...BLANK_QUESTION}]
    case 'DELETE_QUESTION':
      return [...state.slice(0,action.index), ...state.slice(action.index+1)]
    case 'SAVE_QUESTION':
      console.log(action.question.text);
      return [...state.slice(0, action.index),
        {...action.question},
        ...state.slice(action.index + 1)]
    case 'OPEN_QUESTION':
      return [...state.slice(0, action.index),
      {...state[action.index], status: "OPENED"},
      ...state.slice(action.index + 1)]
    case 'CLOSE_QUESTION':
      return [...state.slice(0, action.index),
      {...state[action.index], status: "CLOSED"},
      ...state.slice(action.index + 1)]
    default:
      return state
  }
}

export default questions

const BLANK_QUESTION = {answers: Array(4).fill({text: ""})}
