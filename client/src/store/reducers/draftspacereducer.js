import * as actionTypes from "../actions/actionTypes";
import { v4 as uuidv4 } from 'uuid';

const initialState = {

    /**
     * We need an id to so that we can save and retrieve diagrams
     */
    id: null ,

    /**
     * The thesis is not *really* an array: it can only hold one 
     * thesis object. This is enforced in the reducer by always checking
     * if the argument type is 'thesis' and then popping the array. 
     * 
     * We use a thesis to simplify state management and to provide 
     * extensibility
     */
    thesis: [{
        id: uuidv4(),
        type: 'thesis',
        title: 'This is your thesis',
        content: 'Try to summarize your main point in a few sentences',
        degree: 0,
        targetArgument: null
    }],
    pro_arguments: [],
    con_arguments: [],
    qual_arguments: [],
    isAuthenticated: false,

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

            return (
                {
                    ...state,
                    [action.updatedArgumentType]: state[action.updatedArgumentType].map(argument => {

                        // If the argument object's id does not match the target id,
                        // simply return that object unaltered 
                        if (argument.id !== action.targetArgumentId) {
                            return argument;
                        }

                        // If the argument object's id does match the target id,
                        // replace the entire object with the new updatedArgument,
                        // while keeping the old values for the degree and 
                        // targetArgument keys
                        return {
                            ...action.updatedArgument,
                            degree : argument.degree,
                            targetArgument : argument.targetArgument
                        }
                    })
                }

            )
            break;
        case actionTypes.ADD_ARGUMENT:

            return (
                {
                    ...state,
                    [action.payload.type]: state[action.payload.type].concat({
                        ...action.payload,
                        targetArgument: action.payload.targetArgument 
                    }),
                }
            );
            break;
        case actionTypes.DELETE_ARGUMENT: {
            return (
                {
                    ...state,
                    [action.payload.argumentType]: state[action.payload.argumentType].filter(argument => {
                        return argument.id != action.payload.targetId
                    })
                }
            );
        }
        case actionTypes.CHANGE_ARGUMENT_TYPE:

            return (
                {
                    ...state,

                    [action.payload.newArgumentType]: state[action.payload.newArgumentType].concat(
                        state[action.payload.oldArgumentType].find(element => element.id = action.targetId)
                    ),

                    [action.payload.oldArgumentType]: state[action.payload.oldArgumentType].filter(argument => {
                        return argument.id != action.payload.targetId
                    })


                }
            )
            break;

        // return { ...newState, title: '', content: '' };
        default:
            console.log('unknown action type');
    }
    return state;
}


export default draftSpaceReducer; 