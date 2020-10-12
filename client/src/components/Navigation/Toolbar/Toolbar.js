import React, { Component } from "react";
import classes from "./Toolbar.module.css";
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import { Link } from "react-router-dom";
import MenuRoundedIcon from '@material-ui/icons/MenuRounded';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import RemoveRedEyeTwoToneIcon from '@material-ui/icons/RemoveRedEyeTwoTone';
import Paper from '@material-ui/core/Paper';
import Auth from '../../../containers/Authentication/SignUp/SignUp'; 


export default class toolbar extends Component {

    state = {
        // The menu is anchored to this element 
        anchorElem: null
    }

    handleClick = (event) => {
        this.setState({ anchorElem: event.target });
    }

    handleClose = () => {
        this.setState({ anchorElem: null });
    }



    render() {
        return (
            <header className={classes.Header}>
                <Paper>
                    <Toolbar className={classes.Toolbar}>

                        <RemoveRedEyeTwoToneIcon />

                        <Auth />

                        <MenuRoundedIcon
                            aria-controls="simple-menu"
                            aria-haspopup="true"
                            onClick={this.handleClick}
                            style={{ cursor: 'pointer', color: 'red' }}
                        />

                        <Menu
                            id="simple-menu"
                            anchorEl={this.state.anchorElem}
                            keepMounted
                            open={Boolean(this.state.anchorElem)}
                            onClose={this.handleClose}
                        >
                            <Link to="/"><MenuItem>Home</MenuItem></Link>
                            <Link to="/test"><MenuItem>Test</MenuItem></Link>
                            <Link to="/about"><MenuItem>About</MenuItem></Link>
                            <Link to="/thoughtTree"><MenuItem>ThoughtTree</MenuItem></Link>
                        </Menu>

                    </Toolbar>
                </Paper>
            </header>
        )



    }

}