import React from 'react';
import { withAuthorization, AuthUserContext } from '../Session';
import Questions from './questions.js'

const QuestionPage = props => (
  <Questions programKey={props.match.params.programKey} showKey={props.match.params.showKey}/>
);

const condition = user => !!user;

export default withAuthorization(condition)(QuestionPage);
