import React from 'react';
import { withAuthorization, AuthUserContext } from '../Session';
import Shows from './Shows.js'

const ShowPage = props => (
  <Shows programKey={props.match.params.programKey}/>
)

const condition = user => !!user;

export default withAuthorization(condition)(ShowPage);