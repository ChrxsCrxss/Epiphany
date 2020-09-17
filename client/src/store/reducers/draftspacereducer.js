import * as actionTypes from "../actions/actions";
import { v4 as uuidv4 } from 'uuid';

const initialState = {
    selectedArgumentType: null,
    title: '',
    content: '',
    thesis: {},
    pro_arguments: [],
    con_arguments: [],
    qual_arguments: [],

};

const draftSpaceReducer = (state = initialState, action) => {

    console.log(action);
    switch (action.type) {
        case actionTypes.SELECT_TYPE:
            return {
                ...state,
                selectedArgumentType: action.argumentType
            }
            break;
        case actionTypes.UPDATE_DRAFT:
            return {
                ...state,
                [action.field]: action.value
            }
            break;
        case actionTypes.ADD_ARGUMENT:

            const newState =
                state.selectedArgumentType === 'thesis' ?
                    {
                        ...state,
                        thesis: {
                            id: uuidv4(),
                            type: state.selectedArgumentType,
                            title: state.title,
                            content: state.content
                        }
                    }
                    : {
                        ...state,
                        [state.selectedArgumentType]: state[state.selectedArgumentType].concat({
                            id: uuidv4(),
                            type: state.selectedArgumentType,
                            title: state.title,
                            content: state.content
                        }),
                    };

            return { ...newState, title: '', content: '' };
        default:
            console.log('unknown action type');
    }
    return state;
}


export default draftSpaceReducer; 