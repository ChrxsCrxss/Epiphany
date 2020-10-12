import React, { Component } from "react";
import Aux from "../../components/hoc/Aux"
import classes from "./Layout.module.css";
import Toolbar from "../../components/Navigation/Toolbar/Toolbar";
import Footer from "../../components/Footer/Footer";
import VideoModal from "../../components/UI/Modals/VideoModal/VideoModal";
import InspireButton from "../../components/UI/Inspire/InspireButton";


// The Layout class component is a high-order component that wraps the 
// main componets of the application. This component allows the layout
// to be decoupled from the actually application. 

// Currently, the layout component is responsible for managing the state
// of the video modal. It passes the toggleVideoModal method to the
// DraftDeck, which then passes it own its control deck, where it is
// assigned to a button. The Layout component must also pass the state
// showVideoModal and toggleVideoModal to the VideoModal component for
// conditional rendering 

// The VideoModal component is now rendered conditionally
// to prevent hidden interactions 

class Layout extends Component {

    state = {
        showVideoModal: false
    }


    toggleVideoModal = () => {
        this.setState((prevState) => {
            return {
                showVideoModal: !prevState.showVideoModal
            }
        });

        console.log("getting video inspirations!");
    }




    render() {
        return (
            <Aux>

                <Toolbar />

                {this.state.showVideoModal ?
                    <VideoModal
                        show={this.state.showVideoModal}
                        clicked={this.toggleVideoModal}

                    />
                    : null}


                <main className={classes.Content} >
                    {this.props.children}

                    
                    {/* <InspireButton
                        show={this.toggleVideoModal}
                    /> */}
                </main>

                <Footer/>
            </Aux>

        )
    }
}



export default Layout;


// uselayoutEffect 