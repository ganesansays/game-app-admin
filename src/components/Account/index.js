import React from 'react';

import { AuthUserContext, withAuthorization } from '../Session';
import { PasswordForgetForm } from '../PasswordForget';
import PasswordChangeForm from '../PasswordChange';

const AccountPage = () => (
  <AuthUserContext.Consumer>
    {user => (
      <div>
        <h1>User Name: {user.userProperty.username}</h1>
        <h1>Email: {user.authUser.email}</h1>
      </div>
    )}
  </AuthUserContext.Consumer>
);

const condition = user => !!user;

export default withAuthorization(condition)(AccountPage);