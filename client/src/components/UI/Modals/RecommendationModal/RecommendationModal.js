import React, { Component } from "react";
import classes from "./RecommendationModal.module.css";
import Aux from "../../../hoc/Aux";
import Backdrop from "../../../UI/Backdrop/Backdrop"; 

class RecommendationModal extends Component {

    state = {
        curVideoSrc : ''
    }



    render() {

        return (

            <Aux>
            <Backdrop show={this.props.show} clicked={this.props.clicked}/>
    
            <div className={classes.RecommendationModal}
                style={{
                    transform: this.props.show ? 'translate(0)' : 'translate(100vh)',
                    opacity: this.props.show ? '1' : '0'
                }}>
    
                <div> 
                    Title: {this.props.content.title} <br/>
                    Body: {this.props.content.body} <br/>
                    link: {this.props.content.link}

                </div>
    
    
            </div>
    
        </Aux>

        ); 
    }

}


export default RecommendationModal