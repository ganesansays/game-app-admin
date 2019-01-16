import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Button from '@material-ui/core/Button';
import * as ROUTES from '../../constants/routes';
import { Link } from 'react-router-dom';
import { AuthUserContext } from '../Session';
import { withFirebase } from '../Firebase';
import { compose } from 'recompose';

const styles = {
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
};

class MenuAppBarBase extends React.Component {
  state = {
    auth: true,
    anchorEl: null,
  };

  handleChange = event => {
    this.setState({ auth: event.target.checked });
  };

  handleMenu = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const { classes } = this.props;
    const { auth, anchorEl } = this.state;
    const open = Boolean(anchorEl);

    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" color="inherit" className={classes.grow}>
              Game Admin
            </Typography>
            <AuthUserContext.Consumer>
              {user =>
              (user && user.authUser && <div>
                <IconButton
                  aria-owns={open ? 'menu-appbar' : undefined}
                  aria-haspopup="true"
                  onClick={this.handleMenu}
                  color="inherit"
                >
                  <AccountCircle />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={open}
                  onClose={this.handleClose}
                >
                  <MenuItem onClick={this.props.firebase.doSignOut}>Sign out</MenuItem>
                </Menu>
              </div>)
            }
            </AuthUserContext.Consumer>
            <AuthUserContext.Consumer>
            {user =>
             (!user.authUser && <Button color="inherit"
              component={Link}
              to={ROUTES.SIGN_IN}
              >Sign in</Button>)
            }
            </AuthUserContext.Consumer>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

MenuAppBarBase.propTypes = {
  classes: PropTypes.object.isRequired,
};

const MenuAppBar = compose(
  withFirebase,
  withStyles(styles)
) (MenuAppBarBase)

export default MenuAppBar;