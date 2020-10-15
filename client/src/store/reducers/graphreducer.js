import * as actionTypes from "../actions/actionTypes";

const initialState = {
    ideaTress : [],
    cyCoreRef : null
}

const graphReducer = (state = initialState, action) => {

    if (action.type === 'PUSH') {
        return {
            state,
            ideaTrees : state.ideaTress.concat(action.payload)
        }
    }

    if (action.type === actionTypes.SET_CY_CORE_REF) {

        console.log('called SET_CY_CORE_REF');

        console.log(action); 
        return {
            ...state,
            cyCoreRef : action.cyCoreRef
        }
    }


    return state; 
}

export default graphReducer; 