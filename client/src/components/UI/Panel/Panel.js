import React from 'react';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import classes from './Panel.module.css';

const panel = (props) => {


    return (
        <Card className={classes.Panel}>
            <h4>{props.ele._private.data.type}</h4>
            <h4>{props.ele._private.data.title}</h4>
            <p>{props.ele._private.data.content}</p>


            <Button
                variant="contained"
                color="secondary"
                size="small"
                onClick={props.close}
            >
                Close
            </Button>



        </Card>
    )
}

export default panel; 