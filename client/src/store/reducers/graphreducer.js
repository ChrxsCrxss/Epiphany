import * as actionTypes from "../actions/actionTypes";

const initialState = {
    /**
     * An array of object arrays. Each inner array represents 
     * an argument diagram that can be render via the Cytoscape
     * component. Each element inside each inne array is an 
     * argument 
     */
    argumentDiagrams : [],
    cyCoreRef : null
}

// argumentDiagrams : [ 
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
            argumentDiagrams : state.argumentDiagrams.concat(action.payload)
        }
    }

    if (action.type === actionTypes.SAVE_DIAGRAM) {

        console.log('called SAVE_DIAGRAM');

        console.log(action); 
        return {
            ...state,
            argumentDiagrams : state.argumentDiagrams.concat(action.payload)
        }
    }


    return state; 
}

export default graphReducer; 