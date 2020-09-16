
const initialState = {
    selectedPointType: null,
    title: '',
    content: '',
    thesis: {},
    pro_arguments: [],
    con_arguments: [],
    qual_arguments: [],

}

const draftSpaceReducer = (state = initialState, action) => {

    console.log(action);
    switch (action.type) {
        case 'SELECT_TYPE':
            return {
                ...state,
                selectedPointType: action.pointType
            }
            break;
        case 'UPDATE_DRAFT':
            if (action.field === 'title') {
                return {
                    ...state,
                    title: action.value
                }
            }
            if (action.field === 'content') {
                return {
                    ...state,
                    content: action.value
                }
            }
            break;
        case 'SAVE':

            const newState = 
            state.selectedPointType === 'thesis' ?
            {
                ...state,
                thesis : {
                    type: state.selectedPointType,
                    title: state.title,
                    content: state.content
                }
            }
            : {
                ...state,
                [state.selectedPointType] : state[state.selectedPointType].concat({
                    type: state.selectedPointType,
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