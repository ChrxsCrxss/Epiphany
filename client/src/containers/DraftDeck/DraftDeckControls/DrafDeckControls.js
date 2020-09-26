import React from "react";
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import KeyboardVoiceIcon from '@material-ui/icons/KeyboardVoice';
import SaveIcon from '@material-ui/icons/Save';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import InsertChartOutlinedRoundedIcon from '@material-ui/icons/InsertChartOutlinedRounded';
import { connect } from "react-redux"; 

/*

| Delete | Save | Talk | Share |

*/


const draftDeckControls = (props) => {

    const gotoMindMap = () => {
        props.history.push('/thoughtTree'); 
    }

    return (

        <div>



            <Button
                variant="contained"
                color="secondary"
                size="small"
                startIcon={<KeyboardVoiceIcon />}
                onClick={props.talked}
            >
                Talk
            </Button>


            <Button
                variant="contained"
                color="primary"
                disabled={ props.thesis === null }
                size="small"
                startIcon={<SaveIcon />}
                onClick={gotoMindMap}
            >
                Goto MindMap 
            </Button>

            <Button
                variant="contained"
                color="primary"
                size="small"
                startIcon={<MenuBookIcon />}
                onClick={props.submitted}
            >
                See Recommendations
            </Button>

            <Button
                variant="contained"
                color="secondary"
                size="small"
                startIcon={<DeleteIcon />}
                onClick={props.deleted}
            >
                Delete
            </Button>


        </div>


    )
}

const mapStateToProps = state => {
    return {
        thesis : state.thesis[0] || null
    }
}


export default connect(mapStateToProps)(draftDeckControls); 