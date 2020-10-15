import React, { Component } from "react";
import classes from "./Toolbar.module.css";
import Toolbar from '@material-ui/core/Toolbar';
import { Link } from "react-router-dom";
import MenuRoundedIcon from '@material-ui/icons/MenuRounded';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import RemoveRedEyeTwoToneIcon from '@material-ui/icons/RemoveRedEyeTwoTone';
import Paper from '@material-ui/core/Paper';
import Auth from '../../../containers/Authentication/SignUp/SignUp'; 
import { connect } from 'react-redux'; 
import * as actions from '../../../store/actions/index';

class Nav extends Component {

    state = {
        // The menu is anchored to this element 
        anchorElem: null
    }

    handleClick = (event) => {
        this.setState({ anchorElem: event.target });
    }

    handleClose = () => {
        this.setState({ anchorElem: null });
    }

    onSaveDiagramWrapper = () => {
        
        /**
         * We want to save the diagram data as a flatten array
         */
        const diagramData = []
        .concat( this.props.thesis.map( thesis => ({...thesis}) ) )
        .concat( this.props.pro_arguments.map( pro_arg => ({...pro_arg}) ) )
        .concat( this.props.con_arguments.map( con_arg => ({...con_arg}) ) )
        .concat( this.props.qual_arguments.map( qual_arg => ({...qual_arg}) ) ); 

        this.props.onSaveDiagram(diagramData); 


    }


    render() {
        return (
            <header className={classes.Header}>
                <Paper>
                    <Toolbar className={classes.Toolbar}>

                        <RemoveRedEyeTwoToneIcon />

                        <Auth />

                        <button 
                        onClick={this.onSaveDiagramWrapper}
                         >
                            Save
                        </button>

                        <MenuRoundedIcon
                            aria-controls="simple-menu"
                            aria-haspopup="true"
                            onClick={this.handleClick}
                            style={{ cursor: 'pointer', color: 'red' }}
                        />

                        <Menu
                            id="simple-menu"
                            anchorEl={this.state.anchorElem}
                            keepMounted
                            open={Boolean(this.state.anchorElem)}
                            onClose={this.handleClose}
                        >
                            <Link to="/"><MenuItem>Home</MenuItem></Link>
                            <Link to="/test"><MenuItem>Test</MenuItem></Link>
                            <Link to="/about"><MenuItem>About</MenuItem></Link>
                        </Menu>

                    </Toolbar>
                </Paper>
            </header>
        )



    }

}


const mapDispatchToProps = dispatch => {
    return {
        onSaveDiagram: (payload) => dispatch(actions.saveDiagram(payload))
    };
}

const mapStateToProps = state => {
    return {
        pro_arguments: state.draftSpaceReducer.pro_arguments,
        con_arguments: state.draftSpaceReducer.con_arguments,
        qual_arguments: state.draftSpaceReducer.qual_arguments,
        thesis: state.draftSpaceReducer.thesis,
        isAuthenticated: state.draftSpaceReducer.isAuthenticated
    };
};

// If you want to use mapDispatchToProps without a 
// mapStateToProps just use null for the first argument.
export default connect(mapStateToProps, mapDispatchToProps)(Nav); 