import React, { Component } from "react";
import Card from '@material-ui/core/Card';
import DraftSpace from "./DraftSpace/Draftspace";
import classes from "./DraftDeck.module.css";
import Aux from "../../components/hoc/Aux";
import DraftDeckControls from "./DraftDeckControls/DrafDeckControls";
import Grid from '@material-ui/core/Grid';
import RecommendationDeck from "../RecommendationDeck/RecommendationDeck";
import { withRouter } from "react-router-dom";
import axios from 'axios'

class DraftDeck extends Component {


    state = {
        showRecommendations: false,
    };


    /**
     * Click-event callback for save button. This method is responsible for lifting the state
     * of the draft space to App.js, where it is passed the the Diagram mode to create a new
     * node on the Thought tree
     */
    draftSavedHandler = () => {
        this.props.liftNewNodeContent(this.state.draftSpaceContent);
        console.log("Draft Saved!");
    };

    draftDeletedHanlder = () => {
        alert("Draft Deleted!");
    };

    toggleTalkModeHandler = () => {
        alert("Switched to talk mode");
    };

    toggleRecommendationDeck = () => {
        this.setState((prevState) => {
            return {
                showRecommendations: !prevState.showRecommendations
            }
        });

        console.log("showing recommendations !");
    }


    render() {

        const gridSize = this.state.showRecommendations ? 6 : 12

        return (

            <Card
                className={classes.DraftDeck}
                variant="outlined"
            >

                <DraftDeckControls
                    saved={this.draftSavedHandler}
                    deleted={this.draftDeletedHanlder}
                    talked={this.toggleTalkModeHandler}
                    submitted={this.toggleRecommendationDeck}
                    showVideo={this.props.showvideomodal}
                    history={this.props.history}
                />

                <hr />

                <Grid container
                    direction="row"
                >

                    <Grid item sm={gridSize}>
                        <DraftSpace/>
                    </Grid>

                    {this.state.showRecommendations ?
                        <Grid item sm={gridSize} className={classes.RecommendationDeck}>
                            <RecommendationDeck />
                        </Grid>
                        : null
                    }

                </Grid>

            </Card>

            // <Aux>

            //     <DraftSpace />
            // </Aux>
        )

    }
}


export default withRouter(DraftDeck); 