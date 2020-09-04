import React from "react";
import classes from "./VideoPrompts.module.css";


const videoPrompts = (props) => {

    return (
        <p className={classes.VideoPrompts}>
            Questions to ask:
            <ol>
                <li>Who is the speaker? What is his/her/their background/training?</li>
                <li>What is the main point the speaker is trying to convey (the thesis)?</li>
                <li>What evidence, arguments, or considerations does the speaker bring up?</li>
                <li>What is the strongest part of the speaker's position? Why?</li>
                <li>What is the weakest part of the speaker's position? Why? How would you improve it?</li>
            </ol>

        </p>

    );

}

export default videoPrompts