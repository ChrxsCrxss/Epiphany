import React, { Component } from "react";
import axios from "axios";
import Paper from "@material-ui/core/Paper";
import classes from "./Draftspace.module.css";
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { connect } from 'react-redux';
import Card from '@material-ui/core/Card';

class draftSpace extends Component {


  state = {
    selecedPointType: null,
    pro_arguments: [],
    con_arguments: [],
    qualifications: []
  };

  handleSubmit = (event) => {
    event.preventDefault();

    this.props.onSaveHandler();
  }



  render() {

    return (
      <div className={classes.DraftSpace}>

        <Select
          labelId="demo-simple-select-placeholder-label-label"
          id="demo-simple-select-placeholder-label"
          value={this.props.selecedPointType}
          onChange={(event) => this.props.onPointTypeChange(event)}
          displayEmpty

        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={'thesis'}>Thesis</MenuItem>
          <MenuItem value={'pro_arguments'}>Argument For Thesis</MenuItem>
          <MenuItem value={'con_arguments'}>Arugment Against Thesis</MenuItem>
          <MenuItem value={'qual_arguments'}>Qualification</MenuItem>
        </Select>

        <h3> Type: {this.props.pt_type} </h3>
        <button onClick={(event) => this.handleSubmit(event)}> Submit</button>

        <Paper elevation={2} className={classes.DraftSpace}>

          <form>
            <textarea
              placeholder="Title"
            />
          </form>

          <hr />

          <form>
            <textarea
              className={classes.DraftContent}
              onChange={this.props.handleChange}
              placeholder="Type or Copy/Paste your text here!"
              value={this.props.draftSpaceContent}

            />
          </form>

        </Paper>

        {this.props.thesis !== null ?
          <Card>
            <h6>Thesis</h6>
            <p> {this.props.thesis} </p>
          </Card>
          : <h5 style={{color : 'red'}}> You don't have a thesis! </h5>

        }

        {this.props.pro_arguments.map(point => {
          return <Card>
            <h6>{point.type}</h6>
            <p> This is a pro argument: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
            minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
            commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
            cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum. </p>
          </Card>
        })}
        {this.props.con_arguments.map(point => {
          return <Card>
            <h6>{point.type}</h6>
            <p> This is a con argument: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
            minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
            commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
            cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum. </p>
          </Card>
        })}

        {this.props.qual_arguments.map(point => {
          return <Card>
            <h6>{point.type}</h6>
            <p> This is a qualifying argument: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
            minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
            commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
            cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum. </p>
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

    onPointTypeChange: (event) => dispatch(
      {
        type: 'SELECT_TYPE',
        pointType: event.target.value
      }
    ),

    onSaveHandler: (event) => dispatch(
      {
        type: 'SAVE',
      }
    )
  };
}


const mapStateToProps = state => {
  return {
    pt_type: state.selectedPointType,
    pro_arguments: state.pro_arguments,
    con_arguments: state.con_arguments,
    qual_arguments: state.qual_arguments,
    thesis: state.thesis
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(draftSpace);
