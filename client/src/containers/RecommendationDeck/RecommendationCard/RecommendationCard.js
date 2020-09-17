import React from "react";
import Card from '@material-ui/core/Card';
import classes from "./RecommendationCard.module.css";
import OpenInNewIcon from '@material-ui/icons/OpenInNew';


const recommendationCard = (props) => {
    return (
        <Card
            className={ classes.RecommendationCard }>
            <strong>Title: {props.content.title}</strong>
            <OpenInNewIcon 
            className={ classes.ExpandButton }
            onClick={ () => { props.set(props.content); props.clicked() } }
            />
            <br />
            <strong>Intro: </strong>
            <p>
                {props.content.body}
            </p>
            <a href={props.content.link}>Google?</a>
        </Card>
    )
}

export default recommendationCard; 