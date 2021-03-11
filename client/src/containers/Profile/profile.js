import React, { Component } from "react";
import classes from "./profile.module.css";
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import { connect } from 'react-redux';

class Profile extends Component {


    componentDidMount() {
        console.log("Profile cmpnt mounted");

        console.log(this.props.argumentGraphs);
    }

    render() {

        const graphThumbNails = this.props.argumentGraphs.map(graph => {

            return (
                <Grid key={graph.id} item xs>
                    <Paper className={classes.paper}>
                        <img src={graph.graphThumbNail} alt="GRAPH JSON" width="100%" height="100%"></img>
                    </Paper>
                </Grid>

            )
        })
        return (

            <Container class={classes["profile-containe"]}>
                <h2> Profile Page </h2>
                <hr />
                <Grid container spacing={3}>
                    <Grid item xs>
                        <Paper className={classes.paper}>xs</Paper>
                    </Grid>
                    <Grid item xs>
                        <Paper className={classes.paper}>xs</Paper>
                    </Grid>
                    <Grid item xs>
                        <Paper className={classes.paper}>xs</Paper>
                    </Grid>
                    {graphThumbNails}
                </Grid>
            </Container>



        )

    }
}


const mapStateToProps = state => {
    return {
        argumentGraphs: state.graphReducer.argumentGraphs
    };
};

export default connect(mapStateToProps)(Profile); 