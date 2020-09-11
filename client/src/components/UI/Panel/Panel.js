import React from 'react';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import classes from './Panel.module.css';

const panel = (props) => {
    return (
        <Card className={classes.Panel}>
            <h4>{props.title}</h4>
            <p>{props.content}</p>
            <Button
                variant="contained"
                color="secondary"
                size="small"
                onClick={props.close}
            >
                Close Panel
            </Button>
        </Card>
    )
}

export default panel; 