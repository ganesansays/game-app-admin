import React from 'react';
import { withAuthorization } from '../Session';
import Questions from '../questions'

const HomePage = () => (
  <Questions/>
);

const condition = user => !!user;

export default withAuthorization(condition)(HomePage);