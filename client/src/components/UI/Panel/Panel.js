import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import classes from './Panel.module.css';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import ReplayIcon from '@material-ui/icons/Replay';
import IconButton from '@material-ui/core/IconButton';

class Panel extends Component {

    state = {
        editMode: false
    }


    toggleEditMode = (event) => {
        event.preventDefault();
        this.setState(prevState => {
            return { editMode: !prevState.editMode }
        })
    };

    render() {

        const content =
            this.state.editMode ? (
                <React.Fragment>
                    <h4>{this.props.ele._private.data.type}</h4>
                    <textarea
                        value={this.props.ele._private.data.title}>
                    </textarea>
                    <textarea
                        value={this.props.ele._private.data.content}>
                    </textarea>
                </React.Fragment>
            )
                : (
                    <React.Fragment>
                        <h4>{this.props.ele._private.data.type}</h4>
                        <h4>{this.props.ele._private.data.title}</h4>
                        <p>{this.props.ele._private.data.content}</p>
                    </React.Fragment>
                )

        return (
            <Card className={classes.Panel}>
                <IconButton
                    aria-label="delete"
                    onClick={(event) => this.toggleEditMode(event)}>
                    <EditIcon />
                </IconButton>
                <IconButton aria-label="delete">
                    <ReplayIcon />
                </IconButton>
                <IconButton aria-label="delete">
                    <DeleteIcon />
                </IconButton>

                <hr />
                { content}

                <div className={classes.Button}>
                    <Button
                        variant="contained"
                        color="secondary"
                        size="small"
                        onClick={this.props.close}
                    >
                        Close
                </Button>
                </div>

            </Card >
        )



    }
}

export default Panel; 