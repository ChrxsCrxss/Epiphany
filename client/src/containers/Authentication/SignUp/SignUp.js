import AuthButton from "../AuthButton";
import PropTypes from "prop-types";
import React, { Component } from "react";
import axios from 'axios'
export default class Signup extends Component {
  state = {
    user: {},
    error: null,
    authenticated: false
  };

  componentDidMount() {

    console.log('SignUp mounted');
    
    axios.get("http://localhost:5000/auth/login/success", {
      method: "GET",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Credentials": true
      }
    })
      .then(response => {
        if (response.status === 200) return response.json();
        throw new Error("failed to authenticate user");
      })
      .then(responseJson => {
        this.setState({
          authenticated: true,
          user: responseJson.user
        });
      })
      .catch(error => {
        this.setState({
          authenticated: false,
          error: "Failed to authenticate user"
        });
      });
  }

  render() {
    const { authenticated } = this.state;
    return (
      <div>
        <AuthButton
          authenticated={authenticated}
          handleNotAuthenticated={this._handleNotAuthenticated}
        />
        <div>
          {!authenticated ? (
            null
          ) : (
              <div>
                <h1>You have login succcessfully!</h1>
                <h2>Welcome {this.state.user.name}!</h2>
              </div>
            )}
        </div>
      </div>
    );
  }

  _handleNotAuthenticated = () => {
    this.setState({ authenticated: false });
  };
}
