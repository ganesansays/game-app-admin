import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { compose } from 'recompose';

import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import HowToReg from '@material-ui/icons/HowToRegOutlined';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { styles } from '../../styles'
import withStyles from '@material-ui/core/styles/withStyles';

const SignUpPage = () => (
  <SignUpForm />
);

const INITIAL_STATE = {
  username: '',
  email: '',
  passwordOne: '',
  passwordTwo: '',
  error: null,
};

class SignUpFormBase extends Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };
  }

  onSubmit = event => {
    const { username, email, passwordOne } = this.state;

    this.props.firebase
      .doCreateUserWithEmailAndPassword(email, passwordOne)
      .then(authUser => {
        // Create a user in your Firebase realtime database
        return this.props.firebase
          .user(authUser.user.uid)
          .set({
            username,
            email,
          });
      })
      .then(authUser => {
        this.setState({ ...INITIAL_STATE });
        this.props.history.push(ROUTES.HOME);
      })
      .catch(error => {
        this.setState({ error });
      });

    event.preventDefault();
  }

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const {
      username,
      email,
      passwordOne,
      passwordTwo,
      error,
    } = this.state;

    const isInvalid =
      passwordOne !== passwordTwo ||
      passwordOne === '' ||
      email === '' ||
      username === '';

    const { classes } = this.props;

    return (
      <div>
        <main className={classes.main}>
          <CssBaseline />
          <Paper className={classes.paper}>
            <Avatar className={classes.avatar}>
              <HowToReg />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign Up
              </Typography>
            <form className={classes.form} onSubmit={this.onSubmit}>
              <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="username">Full name</InputLabel>
                <Input id="username" name="username" autoComplete="username" autoFocus value={username}
                  onChange={this.onChange} />
              </FormControl>
              <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="email">Email Address</InputLabel>
                <Input id="email" name="email" type="email" autoComplete="email" value={email}
                  onChange={this.onChange} />
              </FormControl>
              <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="passwordOne">Password</InputLabel>
                <Input name="passwordOne" type="password" id="passwordOne" autoComplete="current-password" value={passwordOne}
                  onChange={this.onChange} />
              </FormControl>
              <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="passwordTwo">Confirm password</InputLabel>
                <Input name="passwordTwo" type="password" id="passwordTwo" autoComplete="current-password" value={passwordTwo}
                  onChange={this.onChange} />
              </FormControl>
              <Typography component="h5" color="error"
                style={{ visibility: !error }}
              >
                {error ? error.message : ""}
              </Typography>
              <Button
                disabled={isInvalid}
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Sign Up
                </Button>
            </form>

          </Paper>
        </main>
      </div>
    );
  }
}

const SignUpLinkBase = (props) => {
  const { classes } = props;
  return (
    <Button
      type="submit"
      fullWidth
      variant="contained"
      color="secondary"
      className={classes.submit}
      component={Link}
      to={ROUTES.SIGN_UP}
    >
      Sign Up
  </Button>
  )
}

const SignUpForm = compose(
  withRouter,
  withFirebase,
  withStyles(styles)
)(SignUpFormBase)

const SignUpLink = withStyles(styles)(SignUpLinkBase);

export default SignUpPage;

export { SignUpForm, SignUpLink };