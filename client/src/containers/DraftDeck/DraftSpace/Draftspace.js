import React, { Component } from "react";
import axios from "axios";
import Paper from "@material-ui/core/Paper";
import classes from "./Draftspace.module.css";
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { connect } from 'react-redux';
import Card from '@material-ui/core/Card';
import * as actionTypes from "../../../store/actions/actionsTypes";
import { v4 as uuidv4 } from 'uuid';

class draftSpace extends Component {



  state = {
    selectedArgumentType : 'thesis'
  }


  handleSubmit = (event) => {
    event.preventDefault();

    this.props.onSaveHandler({
      id : uuidv4(),
      type : this.state.selectedArgumentType,
      title : this.props.title,
      content : this.props.content
    });
  }

  argumentTypeChangeHandler = (event) => {
    this.setState({ selectedArgumentType : event.target.value })
  }

  render() {

    return (
      <div className={classes.DraftSpace}>

        <Select
          labelId="demo-simple-select-placeholder-label-label"
          id="demo-simple-select-placeholder-label"
          value={this.props.selectedArgumentType}
          onChange={(event) => this.argumentTypeChangeHandler(event)}
          displayEmpty

        >

          <MenuItem value={'thesis'}>Thesis</MenuItem>
          <MenuItem value={'pro_arguments'}>Argument For Thesis</MenuItem>
          <MenuItem value={'con_arguments'}>Arugment Against Thesis</MenuItem>
          <MenuItem value={'qual_arguments'}>Qualification</MenuItem>
        </Select>

        <h3> Type: {this.props.selectedArgumentType} </h3>
        <button onClick={(event) => this.handleSubmit(event)}> Submit</button>

        <Paper elevation={2} className={classes.DraftSpace}>

          <form>
            <textarea
              placeholder="Title"
              name='title'
              value={this.props.title}
              onChange={(event) => this.props.onDraftChange(event)}
            />
          </form>

          <hr />

          <form>
            <textarea
              className={classes.DraftContent}
              onChange={(event) => this.props.onDraftChange(event)}
              placeholder="Content: text or paste your argument here!"
              value={this.props.content}
              name='content'
            />
          </form>

        </Paper>

        { this.props.thesis === null ?
           <h5 style={{ color: 'red' }}> You don't have a thesis! </h5>
          : <Card>
            <h6>{this.props.thesis.type}</h6>
            <h6>{this.props.thesis.title}</h6>
            <p> {this.props.thesis.content} </p>
          </Card>
        }

        {this.props.pro_arguments.map(point => {
          return <Card>
            <h6>{point.type}</h6>
            <h6>{point.title}</h6>
            <p>{point.content}</p>
          </Card>
        })}
        {this.props.con_arguments.map(point => {
          return <Card>
            <h6>{point.type}</h6>
            <h6>{point.title}</h6>
            <p>{point.content}</p>
          </Card>
        })}

        {this.props.qual_arguments.map(point => {
          return <Card>
            <h6>{point.type}</h6>
            <h6>{point.title}</h6>
            <p>{point.content}</p>
          </Card>
        })}
      </div>
    );
  }
}

/**
 * Basically, you use connect from react-redux to pass slices of the
 * state and actions to the component right before export. the type
 * property is a mandatory field: it is used to identify actions in the
 * reducer to appropriately update state. 
 */
const mapDispatchToProps = dispatch => {
  return {

    onSaveHandler: (payload) => dispatch(
      {
        type : actionTypes.ADD_ARGUMENT,
        payload : {...payload}
      }
    ),

    onDraftChange: (event) => dispatch(
      {
        type: actionTypes.UPDATE_DRAFT,
        field: event.target.name,
        value: event.target.value
      }
    )
  };
}


const mapStateToProps = state => {
  return {
    pro_arguments: state.pro_arguments,
    con_arguments: state.con_arguments,
    qual_arguments: state.qual_arguments,
    thesis: state.thesis[0] || null,
    title: state.title,
    content: state.content
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(draftSpace);
