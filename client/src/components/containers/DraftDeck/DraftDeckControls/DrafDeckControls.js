import React from "react";
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import KeyboardVoiceIcon from '@material-ui/icons/KeyboardVoice';
import SaveIcon from '@material-ui/icons/Save';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import InsertChartOutlinedRoundedIcon from '@material-ui/icons/InsertChartOutlinedRounded';


/*

| Delete | Save | Talk | Share |

*/


const draftDeckControls = (props) => {


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
                size="small"
                startIcon={<SaveIcon />}
                onClick={props.saved}
            >
                Save
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
                startIcon={<InsertChartOutlinedRoundedIcon/>}
                onClick={props.seeData}
            >
                See DashBoard
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


export default draftDeckControls; 