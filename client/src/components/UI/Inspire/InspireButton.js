import React from "react";
import Button from '@material-ui/core/Button';
import EmojiObjectsSharpIcon from '@material-ui/icons/EmojiObjectsSharp';
import classes from "./InspireButton.module.css"
import Aux from "../../hoc/Aux"




const inspireButton = (props) => {

    return (

        <div className={classes.InspireButton}>
            <Button
                variant="contained"
                color="secondary"
                size="small"
                startIcon={<EmojiObjectsSharpIcon />}
                onClick={props.show}
            >
                Get Inspired
            </Button>
        </div>

    )
}


export default inspireButton; 