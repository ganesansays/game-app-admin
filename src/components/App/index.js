import React from 'react';

import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';

import SignUpPage from '../SignUp';
import SignInPage from '../SignIn';
import PasswordForgetPage from '../PasswordForget';
import HomePage from '../Home';
import AccountPage from '../Account';
import AdminPage from '../Admin';
import ProgramPage from '../Program'
import ShowPage from '../Shows'
import QuestionPage from '../Questions'

import * as ROUTES from '../../constants/routes';
import { withAuthentication } from '../Session';
import MenuAppBar from '../Navigation/MenuAppBar';

const App = () => (

  <Router>
    <div>
      <MenuAppBar />
      <Route exact path={ROUTES.LANDING} component={ProgramPage} />
      <Route path={ROUTES.SIGN_UP} component={SignUpPage} />
      <Route path={ROUTES.SIGN_IN} component={SignInPage} />
      <Route
        path={ROUTES.PASSWORD_FORGET}
        component={PasswordForgetPage}
      />
      <Route path={`/question/:programKey/:showKey`} component={QuestionPage} />
      <Route path={ROUTES.ADMIN} component={AdminPage} />
      <Route path={ROUTES.ACCOUNT} component={AccountPage} />
      <Route path={ROUTES.PROGRAM} component={ProgramPage} />
      <Route path={`/show/:programKey`} component={ShowPage} />
    </div>
  </Router>
);

export default withAuthentication(App);