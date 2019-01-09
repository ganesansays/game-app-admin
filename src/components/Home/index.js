import React from 'react';
import { withAuthorization, AuthUserContext } from '../Session';
import Questions from '../questions'

const HomePage = (user) => (
  <Questions/>
);

const condition = user => !!user;

export default withAuthorization(condition)(HomePage);