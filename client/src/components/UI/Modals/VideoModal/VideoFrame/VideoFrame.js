import React from "react";
import Aux from "../../../../hoc/Aux";
import classes from "./VideoFrame.module.css";
import VideoPrompts from "./VideoPrompts/VideoPrompts";
import Grid from '@material-ui/core/Grid';

const videoFrame = (props) => {


    return (

        <Aux>
            <hr />
            <Grid container spacing={1}>
                <Grid item sm={6}>
                    <iframe
                        className={classes.VideoFrame}
                        height="315"
                        src="https://www.youtube.com/embed/l0-6qTVTsxE"
                        frameBorder="2"
                        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen>

                    </iframe>
                </Grid>

                <Grid item sm={6}>
                    <VideoPrompts />
                </Grid>
            </Grid>
            <hr />
            <form>
                <textarea>

                </textarea>
            </form>
        </Aux>
    )
}

export default videoFrame; 