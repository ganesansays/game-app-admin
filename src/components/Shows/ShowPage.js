import React from 'react';
import { withAuthorization, AuthUserContext } from '../Session';
import Shows from './Shows.js'

const ShowPage = (user) => (
  <Shows/>
);

const condition = user => !!user;

export default withAuthorization(condition)(ShowPage);