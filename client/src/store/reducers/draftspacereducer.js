import * as actionTypes from "../actions/actionTypes";
import { v4 as uuidv4 } from 'uuid';

const initialState = {
    selectedArgumentType: null,
    title: '',
    content: '',
    /**
     * The thesis is not *really* an array: it can only hold one 
     * thesis object. This is enforced in the reducer by always checking
     * if the argument type is 'thesis' and then popping the array. 
     * 
     * We use a thesis to simplify state management and to provide 
     * extensibility
     */
    thesis: [],
    pro_arguments: [],
    con_arguments: [],
    qual_arguments: [],

};

const draftSpaceReducer = (state = initialState, action) => {

    console.log(action);
    switch (action.type) {
        case actionTypes.UPDATE_DRAFT:
            return {
                ...state,
                [action.field]: action.value
            }
            break;

        case actionTypes.UPDATE_ARGUMENT:

            console.log(action.updatedArgumentType);

            // To update the thesis while allowing only one thesis, we pop
            // the old thesis, then add an object with the id passed in 
            // the action, so the map function will contain the target id
            if (state.selectedArgumentType === 'thesis') {
                state.thesis.pop();
                state.push({ id : action.targetArgumentId})
            }

            return (
                {
                    ...state,
                    [action.updatedArgumentType]: state[action.updatedArgumentType].map(argument => {

                        // If the argument object's id does not match the target id,
                        // simply return that object unaltered 
                        if (argument.id !== action.targetArgumentId) {
                            return
                        }

                        // If the argument object's id does match the target id,
                        // replace the entire object with the new updatedArgument 
                        return {
                            ...action.updatedArgument
                        }
                    })
                }

            )
            break;
        case actionTypes.ADD_ARGUMENT:

            if (action.payload.type === 'thesis') {
                state.thesis.pop();
            }

            return (
                {
                    ...state,
                    [action.payload.type]: state[action.payload.type].concat({
                        ...action.payload
                    }),
                    title: '',
                    content: ''
                }
            );
            break;

        // return { ...newState, title: '', content: '' };
        default:
            console.log('unknown action type');
    }
    return state;
}


export default draftSpaceReducer; 