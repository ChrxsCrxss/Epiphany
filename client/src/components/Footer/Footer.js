import React from "react";
import classes from "./Footer.module.css";
import { Link } from "react-router-dom";

const footer = (props) => (
    <footer className={classes.Footer}>
        <button><Link to="/about">About</Link></button>
    </footer>
)

export default footer; 