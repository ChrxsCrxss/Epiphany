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
            <header>
                    <Toolbar className={classes.Toolbar}>

                        <RemoveRedEyeTwoToneIcon/>

                        <MenuRoundedIcon 
                        aria-controls="simple-menu" 
                        aria-haspopup="true" 
                        onClick={this.handleClick} 
                        style={{cursor: 'pointer', color : 'red'}}
                        />
                        
                        <Menu
                            id="simple-menu"
                            anchorEl={this.state.anchorElem}
                            keepMounted
                            open={Boolean(this.state.anchorElem)}
                            onClose={this.handleClose}
                        >
                            {/* <MenuItem onClick={this.handleClose}>Profile</MenuItem>
                            <MenuItem onClick={this.handleClose}>My account</MenuItem>
                            <MenuItem onClick={this.handleClose}>Logout</MenuItem> */}

                            <Link to="/"><MenuItem>Home</MenuItem></Link>
                            <Link to="/test"><MenuItem>Test</MenuItem></Link>
                            <Link to="/login"><MenuItem>Login</MenuItem></Link>
                            <Link to="/about"><MenuItem>About</MenuItem></Link>
                            <Link to="/thoughtTree"><MenuItem>ThoughtTree</MenuItem></Link>
                        </Menu>

{/* 
                        <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">

                            <NavLink to="/test"> <MenuRoundedIcon /> </NavLink>

                        </IconButton>
                        <Typography variant="h6" className={classes.title}>
                            News
                        </Typography>
                        <Button color="inherit"><NavLink to="/">Home</NavLink></Button>
                        <Button color="inherit"><NavLink to="/test">Test</NavLink></Button> */}
                    </Toolbar>
            </header>
        )



    }

}