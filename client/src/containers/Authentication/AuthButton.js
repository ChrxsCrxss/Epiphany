import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import React, { Component } from "react";
import Button from '@material-ui/core/Button';


export default class AuthButton extends Component {
  static propTypes = {
    authenticated: PropTypes.bool.isRequired
  };

  handleSignInClick = () => {
    // Authenticate using via passport api in the backend
    // Open Google login page
    window.open("http://localhost:5000/auth/google", "_self");
  };

  handleLogoutClick = () => {
    // Logout using google passport api
    // Set authenticated state to false in the HomePage component
    window.open("http://localhost:5000/auth/logout", "_self");
    this.props.handleNotAuthenticated();
  };


  render() {

    const { authenticated } = this.props;

    const AuthenticateButton =
      authenticated ?
        <Button size='small'
          onClick={this.handleLogoutClick}
        >Logout</Button>
        :
        <Button size='small'
          onClick={this.handleSignInClick}
        >Logoin</Button>


    return (
      <div>
            { AuthenticateButton }
      </div>
    )
  }

}