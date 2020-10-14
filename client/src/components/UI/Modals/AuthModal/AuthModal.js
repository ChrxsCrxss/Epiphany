import React from 'react';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import classes from "./AuthModal.module.css";
import Paper from '@material-ui/core/Paper';

import { GoogleLoginButton, FacebookLoginButton, TwitterLoginButton }
    from "react-social-login-buttons";

const AuthModal = (props) => {

    const handleSignInClick = () => {
        // Authenticate using via passport api in the backend
        // Open Google login page

        window.open("http://localhost:5000/auth/google", "_self");
    };

    const handleLogoutClick = () => {
        // Logout using google passport api
        // Set authenticated state to false in the HomePage component
        window.open("http://localhost:5000/auth/logout", "_self");
        this.props.handleNotAuthenticated();
    };

    return (
        <Modal
            className={classes.AuthModal}
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={props.open}
            onClose={props.handleClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 500,
            }}
        >
            <Fade in={props.open}>
                <Paper elevation={10} className={classes.AuthDeck}>
                    <div>
                        Logging in will allow you to save and share 
                        all of your hard work! 
                    </div>
                    <div>
                        <GoogleLoginButton onClick={handleSignInClick} />
                        <FacebookLoginButton onClick={() => alert('Facebook Authentication')} />
                        <TwitterLoginButton onClick={() => alert('Twitter Authentication')} />
                    </div>
                </Paper>
            </Fade>
        </Modal>
    )
}

export default AuthModal; 