import React from 'react';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import classes from './Panel.module.css';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import ReplayIcon from '@material-ui/icons/Replay';
import IconButton from '@material-ui/core/IconButton';

const panel = (props) => {


    return (
        <Card className={classes.Panel}>
            <IconButton aria-label="delete">
                <EditIcon />
            </IconButton>
            <IconButton aria-label="delete">
                <ReplayIcon />
            </IconButton>
            <IconButton aria-label="delete">
                <DeleteIcon />
            </IconButton>
            <hr/>
            <h4>{props.ele._private.data.type}</h4>
            <h4>{props.ele._private.data.title}</h4>
            <p>{props.ele._private.data.content}</p>

            <div className={classes.Button}>
                <Button
                    variant="contained"
                    color="secondary"
                    size="small"
                    onClick={props.close}
                >
                    Close
            </Button>
            </div>

        </Card>
    )
}

export default panel; 