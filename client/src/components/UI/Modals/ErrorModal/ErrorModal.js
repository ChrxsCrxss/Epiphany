import React, { memo } from "react";
import classes from "./ErrorModal.module.css";
import Aux from "../../../hoc/Aux";
import Backdrop from "../../Backdrop/Backdrop"

const modal = (props) => (

    <Aux>
        <Backdrop show={props.show} clicked={props.clicked}/>
        <div className={classes.Modal}
            onClick={props.clicked}
            style={{
                transform: props.show ? 'translate(0)' : 'translate(100vh)',
                opacity: props.show ? '1' : '0'
            }}>
            {props.children}
        </div>

    </Aux>

)


export default React.memo(modal); 