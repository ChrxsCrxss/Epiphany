import React, { Component } from "react";
import Aux from "../../hoc/Aux";
import RecommendationCard from "./RecommendationCard/RecommendationCard";
import classes from "./RecommendationDeck.module.css";
import RecommendationModal from "../../UI/Modals/RecommendationModal/RecommendationModal";
import Spinner from "../../UI/Spinner/Spinner";
import axios from "axios"; 
import withErrorHandler from "../../hoc/withErrorHandler"; 

const instance = axios.create(); 

// Currently, RecommendationConent is a static place-holder from what will later be
// dynamic content. Each recommendation card is populated with data from this object. 
// The recommendationModalContent is what is feed to the pop-up

class RecommendationDeck extends Component {

    state = {
        loadingRecommendations: true,
        showRecommendationModal: false,

        RecommendationContent: {
            title: "Recommendation Card Title",
            body: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
                cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum.`,
            link: "https://google.com"
        },

        recommendationModalContent: {
            title: "If you're reading this, the update was unsuccessful",
            body: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
                cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum.`,
            link: "https://google.com"
        }

    }

    // We will make asynchronous requests from here. Right how, we
    // mock a three-second delay to verify that the spinner is working 
    async componentDidMount() {

        setTimeout(() => this.setState({ loadingRecommendations : false }),3000);

        const response = await instance.get(`https://this-wont-work/#nice-try`); 
        
    }



    toggleRecommendationModal = () => {
        this.setState((prevState) => {
            return {
                showRecommendationModal: !prevState.showRecommendationModal
            }

        });



        console.log("expanding recommendation card!");
        console.log(this.state.showRecommendationModal);
    }

    setRecommendationModalContent = (newContent) => {

        this.setState({
            recommendationModalContent: {
                title: newContent.title,
                body: newContent.body,
                link: newContent.link
            }
        });

        console.log("ser new recommendation modal content!");
    }




    render() {
        return (
            <Aux>
                {this.state.loadingRecommendations ?
                    <Spinner />
                    : <Aux>
                        {this.state.showRecommendationModal ?
                            <RecommendationModal
                                content={this.state.recommendationModalContent}
                                show={this.state.showRecommendationModal}
                                clicked={this.toggleRecommendationModal}
                            />
                            : null
                        }
                        <div className={classes.RecommendationDeck}>
                            <RecommendationCard
                                content={this.state.RecommendationContent}
                                show={this.state.showRecommendationModal}
                                clicked={this.toggleRecommendationModal}
                                set={this.setRecommendationModalContent}

                            />
                            <RecommendationCard
                                content={this.state.RecommendationContent}
                                show={this.state.showRecommendationModal}
                                clicked={this.toggleRecommendationModal}
                                set={this.setRecommendationModalContent}

                            />
                            <RecommendationCard
                                content={this.state.RecommendationContent}
                                show={this.state.showRecommendationModal}
                                clicked={this.toggleRecommendationModal}
                                set={this.setRecommendationModalContent}

                            />
                            <RecommendationCard
                                content={this.state.RecommendationContent}
                                show={this.state.showRecommendationModal}
                                clicked={this.toggleRecommendationModal}
                                set={this.setRecommendationModalContent}

                            />
                            <RecommendationCard
                                content={this.state.RecommendationContent}
                                show={this.state.showRecommendationModal}
                                clicked={this.toggleRecommendationModal}
                                set={this.setRecommendationModalContent}

                            />
                            <RecommendationCard
                                content={this.state.RecommendationContent}
                                show={this.state.showRecommendationModal}
                                clicked={this.toggleRecommendationModal}
                                set={this.setRecommendationModalContent}

                            />
                            <RecommendationCard
                                content={this.state.RecommendationContent}
                                show={this.state.showRecommendationModal}
                                clicked={this.toggleRecommendationModal}
                                set={this.setRecommendationModalContent}

                            />
                        </div>
                    </Aux>


                }



            </Aux>
        )
    }
}



export default withErrorHandler(RecommendationDeck, instance); 