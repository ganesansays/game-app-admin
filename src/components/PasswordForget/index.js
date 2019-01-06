import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { compose } from 'recompose';

import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';
import Button from '@material-ui/core/Button';
import { styles } from '../../styles'
import withStyles from '@material-ui/core/styles/withStyles';
import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import HowToReg from '@material-ui/icons/HowToRegOutlined';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';


const PasswordForgetPage = () => (
  <PasswordForgetForm />
);

const INITIAL_STATE = {
  email: '',
  error: null,
};

class PasswordForgetFormBase extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = event => {
    const { email } = this.state;

    this.props.firebase
      .doPasswordReset(email)
      .then(() => {
        this.setState({ ...INITIAL_STATE });
      })
      .catch(error => {
        this.setState({ error });
      });

    event.preventDefault();
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { email, error } = this.state;

    const isInvalid = email === '';

    const { classes } = this.props;

    return (
      <main className={classes.main}>
          <CssBaseline />
          <Paper className={classes.paper}>
            <Avatar className={classes.avatar}>
              <HowToReg />
            </Avatar>
            <Typography component="h1" variant="h5">
              Forgot password
              </Typography>
            <form className={classes.form} onSubmit={this.onSubmit}>
              <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="email">Email address</InputLabel>
                <Input id="email" name="email" autoComplete="email" autoFocus value={email}
                  onChange={this.onChange} />
              </FormControl>
              <Button
                disabled={isInvalid}
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Reset my password
                </Button>
            </form>
          </Paper>
        </main>
    );
  }
}

const PasswordForgetLinkBase = (props) => {
  const { classes } = props;
  return (
    <Button 
      className={classes.button} 
      style={{float: "right"}} 
      color="primary"
      component={Link}
      to={ROUTES.PASSWORD_FORGET}
      >
      Forgot password?
    </Button>
  )
};

export default PasswordForgetPage;

const PasswordForgetForm = compose(
  withFirebase,
  withStyles(styles)
)(PasswordForgetFormBase);

const PasswordForgetLink = withStyles(styles)(PasswordForgetLinkBase);

export { PasswordForgetForm, PasswordForgetLink };