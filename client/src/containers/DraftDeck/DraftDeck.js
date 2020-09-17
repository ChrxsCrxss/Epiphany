import React, { Component } from "react";
import Card from '@material-ui/core/Card';
import DraftSpace from "./DraftSpace/Draftspace";
import classes from "./DraftDeck.module.css";
import Aux from "../../components/hoc/Aux";
import DraftDeckControls from "./DraftDeckControls/DrafDeckControls";
import Grid from '@material-ui/core/Grid';
import RecommendationDeck from "../RecommendationDeck/RecommendationDeck";
import DashBoard from "../DashBoard/DashBoard";

class DraftDeck extends Component {


    state = {
        showRecommendations: false,
        showDashBoard: false
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

    toggleDashBoard = () => {

        this.setState((prevState) => {
            return {
                showDashBoard: !prevState.showDashBoard
            }
        });

    }

    toggleRecommendationDeck = () => {
        this.setState((prevState) => {
            return {
                showRecommendations: !prevState.showRecommendations
            }
        });

        console.log("showing recommendations !");
    }

    userSubmittedHandler = () => {

        // Eventually, we will make an async request to the backend using this method 
        // const res = await axios.post(`http://localhost:4000/recommendations`, {
        //     textInput: this.state.draftSpaceContent
        // });

        console.log(this.state.draftSpaceContent);

        alert("Getting recommendations!");

    };


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
                    seeData={this.toggleDashBoard}
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

                    {this.state.showDashBoard ?
                        <Grid item sm={12} className={classes.RecommendationDeck}>
                            <DashBoard
                                draftSpaceContent={this.state.draftSpaceContent}
                            />
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


export default DraftDeck; 