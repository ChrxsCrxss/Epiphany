import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import React, { Component } from "react";
import Button from '@material-ui/core/Button';
import AuthModal from '../../components/UI/Modals/AuthModal/AuthModal'



export default class AuthButton extends Component {
  static propTypes = {
    authenticated: PropTypes.bool.isRequired
  };

  state = {
    open : false
  }

  handleOpen = () => {
    this.setState({ open : true });
  };

  handleClose = () => {
    this.setState({ open : false });
  };

  render() {

    const { authenticated } = this.props;

    const AuthenticateButton =
      ! authenticated ? (
        <React.Fragment>
          <Button
            size='small'
            // onClick={this.handleLogoutClick}
            onClick={this.handleOpen}
          >Login
          </Button>
          <AuthModal 
            open={this.state.open}
            handleClose={this.handleClose}
          />
        </React.Fragment>
      )
        :
        <Button size='small'
          onClick={this.handleLogoutClick}
        >Logout</Button>


    return (
      <div>
        {AuthenticateButton}
      </div>
    )
  }
}