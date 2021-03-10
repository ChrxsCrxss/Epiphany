import React, { Component } from 'react';
import CloseRoundedIcon from '@material-ui/icons/CloseRounded';
import Card from '@material-ui/core/Card';
import classes from './Panel.module.css';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import ReplayIcon from '@material-ui/icons/Replay';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import Draggable, { DraggableCore } from 'react-draggable';
import { connect } from 'react-redux';
import * as actions from "../../../store/actions/index";



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

        console.log(this.props.ele);

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
                    { editMode: false }
                    : {
                        editMode: true,
                        cachedArgument: {
                            title: this.props.ele._private.data.title,
                            content: this.props.ele._private.data.content
                        },
                        updatedArgument: {
                            title: this.props.ele._private.data.title,
                            content: this.props.ele._private.data.content
                        }
                    }
            )
        })
    };

    onSaveHandlerWrapper = async () => {

        const ele = {
            id: this.props.ele._private.data.id,
            type: this.props.ele._private.data.type,
            title: this.state.updatedArgument.title
        }

        console.log('onSaveHandlerWrapper: ', ele);
        const response = await this.props.onSaveHandler({ ...ele }, { ...this.state.updatedArgument });

        this.props.onEditUpdate(ele.id, ele.type);
    }

    onDeleteHanderWrapper = async () => {

        const payload = {
            targetId: this.props.ele._private.data.id,
            argumentType: this.props.ele._private.data.type
        }

        const response = await this.props.onDeleteHandler(payload);

        this.props.onDelete(this.props.ele._private.data.id)

    }



    render() {

        const content = (
            <div>
                <h4>
                    You are currently viewing
                        {this.props.ele._private.data.type === 'thesis' ?
                        ` your thesis. ` :
                        ` a ${this.props.ele._private.data.type} argument. `}
                        Use this panel to view and edit your argument, and
                        to add supporting materials.
                    </h4>
                <form className={classes.root} noValidate autoComplete="off">
                    <TextField id="outlined-basic" className={classes.EditBox} multiline name='title' label="Title" variant="outlined" value={this.state.updatedArgument.title} onChange={(event) => this.onChangeHandler(event)} />
                    <TextField id="outlined-basic" className={classes.EditBox} multiline name='content' label="Content" variant="outlined" value={this.state.updatedArgument.content} onChange={(event) => this.onChangeHandler(event)} />
                </form>
            </div>
        )


        return (
            <Draggable handle='#handle'>
                <Card className={classes.Panel}>
                    <strong id='handle' className={classes.Drag_Handle}>
                        <CloseRoundedIcon
                            className={classes.CloseButton}
                            onClick={this.props.close}
                            color='secondary'
                            size="small"
                        />
                    </strong>
                    <IconButton
                        aria-label="delete"
                        onClick={this.toggleEditMode}>
                        <EditIcon />
                    </IconButton>
                    <IconButton
                        aria-label="delete"
                        onClick={this.onSaveHandlerWrapper}>
                        <ReplayIcon />
                    </IconButton>
                    <IconButton
                        aria-label="delete"
                        disabled={this.props.ele._private.data.type === 'thesis'}
                        onClick={this.onDeleteHanderWrapper}>
                        <DeleteIcon />
                    </IconButton>

                    <hr />
                    {content}

                    <hr />
                    <h4> Supporting documents </h4>
                    <div>
                        Examples : images, thumbnails of vidoes (w/ links), audio
                </div>
                </Card >
            </Draggable>
        )



    }
}

const matchDispatchToProps = dispatch => {

    return {

        onSaveHandler: (ele, updatedArgument) => dispatch(actions.updateArgument(ele, updatedArgument)),
        onDeleteHandler: (payload) => dispatch(actions.deleteArgument(payload))

    }

}

// If you want to use mapDispatchToProps without a 
// mapStateToProps just use null for the first argument.
export default connect(null, matchDispatchToProps)(Panel); 