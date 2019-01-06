import React from 'react';

import AuthUserContext from './context';
import { withFirebase } from '../Firebase';

const INITIAL_STATE = {
    authUser: null,
    userProperty: null,
};

const withAuthentication = Component => {
  class WithAuthentication extends React.Component {

    constructor(props) {
      super(props);
      this.state = {...INITIAL_STATE};
    }

    componentDidMount() {
      this.listener = this.props.firebase.auth.onAuthStateChanged(
        authUser => {
          if(authUser) 
          {
            this.setState({ authUser: authUser })
            this.props.firebase.user(authUser.uid).once('value', snapshot => {
              this.setState({ userProperty: snapshot.val() })
            });
          }
          else {
            this.setState({...INITIAL_STATE});
          }
        },
      );
    }

    componentWillUnmount() {
      this.listener();
    }

    render() {
      return (
        <AuthUserContext.Provider value={this.state}>
          <Component {...this.props} />
        </AuthUserContext.Provider>
      );
    }
  }

  return withFirebase(WithAuthentication);
};

export default withAuthentication;