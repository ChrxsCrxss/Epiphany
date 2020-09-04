import React, { Component } from "react";
import Card from '@material-ui/core/Card';
import DraftSpace from "./DraftSpace/Draftspace";
import classes from "./DraftDeck.module.css";
import Aux from "../../hoc/Aux";
import DraftDeckControls from "./DraftDeckControls/DrafDeckControls";
import Grid from '@material-ui/core/Grid';
import RecommendationDeck from "../RecommendationDeck/RecommendationDeck";
import DashBoard from "../DashBoard/DashBoard";

class DraftDeck extends Component {


    state = {
        draftSpaceContent: '',
        showRecommendations: false,
        showDashBoard: false
    };




    draftSavedHandler = () => {
        alert("Draft Saved!");
    };

    draftDeletedHanlder = () => {
        alert("Draft Deleted!");
    };

    toggleTalkModeHandler = () => {
        alert("Switched to talk mode");
    };

    userTextInputHandler = (event) => {

        // console.log(`In handChange callack`);
        console.log(event.target.value);

        const newText = event.target.value;

        this.setState({ draftSpaceContent: event.target.value });

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
                        <DraftSpace
                            handleChange={this.userTextInputHandler}
                            draftSpaceContent={this.state.draftSpaceContent}
                        />
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