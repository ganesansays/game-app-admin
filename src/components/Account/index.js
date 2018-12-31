import React from 'react';

import { PasswordForgetForm } from '../PasswordForget';
import PasswordChangeForm from '../PasswordChange';
import { AuthUserContext } from '../Session';

const AccountPage = () => (
  <div>
    <AuthUserContext.Consumer>
        {authUser =>
            authUser ? <h1>Account: {authUser.email}</h1> : <div></div> 
        }
    </AuthUserContext.Consumer>
    <PasswordForgetForm />
    <PasswordChangeForm />
  </div>
);

export default AccountPage;