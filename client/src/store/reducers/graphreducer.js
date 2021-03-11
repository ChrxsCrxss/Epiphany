import * as actionTypes from "../actions/actionTypes";
import { v4 as uuidv4 } from 'uuid';

const initialState = {
    /**
     * An array of object arrays. Each inner array represents 
     * an argument diagram that can be render via the Cytoscape
     * component. Each element inside each inne array is an 
     * argument 
     */
    argumentGraphs: [],
}

// argumentGraphs : [ 
//     {
//         thesis : [{}],
//         pro_arguments: [{}],
//         con_arguments: [{}],
//         qual_arguments: [{}],
//     },
//     ...
// ]





const graphReducer = (state = initialState, action) => {

    if (action.type === 'PUSH') {
        return {
            state,
            argumentGraphs: state.argumentGraphs.concat(action.payload)
        }
    }

    if (action.type === actionTypes.SAVE_DIAGRAM) {

        console.log('called SAVE_DIAGRAM');


        console.log(action.payload);
        return {
            ...state,
            argumentGraphs: [...state.argumentGraphs, action.payload]
        }
    }


    return state;
}

export default graphReducer; 