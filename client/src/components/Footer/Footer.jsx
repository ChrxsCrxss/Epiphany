import React from "react"; 
import classes from "./Footer.module.css";

function Footer(){
    const CurrentYear = new Date().getFullYear(); 
    console.log(CurrentYear); 

    return <footer className={classes.Footer}>
        <p> Copyright @{CurrentYear} </p>
    </footer>
}

export default Footer; 