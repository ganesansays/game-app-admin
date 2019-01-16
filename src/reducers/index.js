import { combineReducers } from 'redux'
import questions from './questions'
import programs from './programs'
import shows from './shows'

export default combineReducers({
  questions,
  programs,
  shows,
})
