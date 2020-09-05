import React, { Component } from "react";
import classes from "./VideoModal.module.css";
import Aux from "../../../hoc/Aux";
import Backdrop from "../../Backdrop/Backdrop"; 
import VideoFrame from "./VideoFrame/VideoFrame";


class VideoModal extends Component {

    state = {
        curVideoSrc : ''
    }



    render() {

        return (

            <Aux>
            <Backdrop show={this.props.show} clicked={this.props.clicked}/>
    
            <div className={classes.VideoModal}
                style={{
                    transform: this.props.show ? 'translate(0)' : 'translate(100vh)',
                    opacity: this.props.show ? '1' : '0'
                }}>
    
                <div> 
                    Why strain your eyes trying to extract wisdom from the dusty pages
                    of old manuscripts when you could just use <em>the web</em>? Enjyoy
                    this fine random selection from YouTube to get those philosophical
                    juices flowing!
                </div>
    
                <VideoFrame/>
    
            </div>
    
        </Aux>

        ); 
    }

}


export default VideoModal