import React from "react";
import classes from "./Backdrop.module.css"

// Backdrop is a semi-transparent dark overlay over the main
// components. This is a quick and dirty conditional render
// using the ternary operator 

const backdrop = (props) => (
    props.show ? <div 
    className={classes.Backdrop}
    onClick={props.clicked}> </div> : null
);

export default backdrop;