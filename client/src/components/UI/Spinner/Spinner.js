import React from "react";
import classes from "./Spinner.module.css";

const spinner = (props) => {

    return (
        <div className={classes.spinner}>
            <div className={classes.double_bounceOne}></div>
            <div className={classes.double_bounceTwo}></div>
        </div>
    )

}

export default spinner; 