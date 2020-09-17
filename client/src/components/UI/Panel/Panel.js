import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import classes from './Panel.module.css';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import ReplayIcon from '@material-ui/icons/Replay';
import IconButton from '@material-ui/core/IconButton';
import { connect } from 'react-redux';
import * as actionTypes from '../../../store/actions/actions'


class Panel extends Component {

    state = {
        editMode: false,
        cachedArgument: {
            title: '',
            content: ''
        },
        updatedArgument: {
            title: '',
            content: ''
        }
    }

    onChangeHandler = (event) => {

        console.log(event);

        console.log(this.state.cachedArgument);
        console.log(this.state.updatedArgument);

        // To access the event asynchronously in the setState callback,
        // we must remove the synthetic event from the pool.
        // From more info: https://reactjs.org/docs/events.html#event-pooling
        event.persist();
        this.setState(prevState => {

            return {
                updatedArgument: {
                    ...prevState.updatedArgument,
                    [event.target.name]: event.target.value
                }
            };

        });

    };


    toggleEditMode = () => {

        this.setState(prevState => {

            return (
                prevState.editMode ?
                    { editMode: !false }
                    : {
                        editMode: true, cachedArgument: {
                            title: this.props.ele._private.data.title,
                            content: this.props.ele._private.data.title
                        }
                    }
            )
        })
    };



    render() {

        const content =
            this.state.editMode ? (
                <div>
                    <h4>{this.props.ele._private.data.type}</h4>
                    <form>
                        <textarea
                            name='title'
                            value={this.props.ele._private.data.title}
                            onChange={(event) => this.onChangeHandler(event)}>
                        </textarea>
                        <textarea
                            name='content'
                            value={this.props.ele._private.data.content}
                            onChange={(event) => this.onChangeHandler(event)}>
                        </textarea>

                    </form>
                </div>
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
                    onClick={this.toggleEditMode}>
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

            </Card>
        )



    }
}

const matchDispatchToProps = dispatch => {

    return {

        /**
         * @param {object} updatedArgument The object holding updated values
         */
        onSaveHandler: (updatedArgument) => dispatch(
            {
                type: actionTypes.ADD_ARGUMENT,
            }
        )

    }

}

export default Panel; 