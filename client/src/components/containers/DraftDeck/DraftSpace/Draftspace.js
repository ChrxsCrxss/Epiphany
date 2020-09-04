import React, { Component } from "react";
import axios from "axios";
import Paper from "@material-ui/core/Paper";
import classes from "./Draftspace.module.css"; 


// import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'; 


// const [textInput, setTextInput] = useState("");

// const { transcript, resetTranscript, listening } = useSpeechRecognition();




// // In order to gain more control, we access the underlying object used by
// // the react-speech-recognition module to dynamically respond to audible
// // user input 
// const SpeechRecognitionObject = SpeechRecognition.getRecognition(); 


// SpeechRecognitionObject.onspeechstart = function() {

// console.log('Speech has been detected');
// };

// SpeechRecognitionObject.onspeechend = function() {

// setTextInput(textInput + transcript);

// resetTranscript();

// console.log('Speech has stopped being detected. Transcript: ' + transcript);
// };







export default class draftSpace extends Component {


  // const [textInput, setTextInput] = useState("");

  // const useStyles = makeStyles((theme) => ({
  //   root: {
  //     display: "flex",
  //     flexWrap: "wrap",
  //     "& > *": {
  //       margin: theme.spacing(1),
  //       width: theme.spacing(40),
  //       height: theme.spacing(50)
  //     }
  //   }
  // }));
  
  // const classes = useStyles();


  render() {

    return (
      <div className={classes.DraftSpace}>
        <Paper elevation={2} className={classes.DraftSpace}> 
  
        {/* <button onClick={ () => SpeechRecognition.startListening({ continuous: true }) }>Speech Mode</button>
        <button onClick={ () => SpeechRecognition.stopListening() }>Text Mode</button>
        <button onClick={resetTranscript}>Reset</button> */}
  
        <form>
          <textarea
            placeholder="Title"
          />
        </form>
  
        <hr/>
  
        <form>
          <textarea
            className={ classes.DraftContent }
            onChange={ this.props.handleChange }
            placeholder="Type or Copy/Paste your text here!"
            value= { this.props.draftSpaceContent }
            
          />
        </form>
        
        </Paper>
      </div>
    );
  }
}
