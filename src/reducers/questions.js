const questions = (state = [], action) => {
  switch (action.type) {
    case 'FETCH_QUESTIONS':
      return action.questions;
      case 'REFRESH_LIST':
      return state;
    default:
      return state;
  }
}

export default questions