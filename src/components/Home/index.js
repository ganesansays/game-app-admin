import React from 'react';
import { withAuthorization, AuthUserContext } from '../Session';

const HomePage = (user) => (
  <div></div>
);

const condition = user => !!user;

export default withAuthorization(condition)(HomePage);