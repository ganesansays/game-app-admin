import React from 'react';
import { withAuthorization, AuthUserContext } from '../Session';
import Programs from './Programs.js'

const ProgramPage = (user) => (
  <Programs/>
);

const condition = user => !!user;

export default withAuthorization(condition)(ProgramPage);