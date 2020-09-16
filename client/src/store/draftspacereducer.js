
const initialState = {
    selectedPointType: null,
    currentContent: null,
    currentTitle: null,
    thesis: null,
    pro_arguments: [],
    con_arguments: [],
    qual_arguments: [],
}

const draftSpaceReducer = (state = initialState, action) => {

    console.log(action.pointType); 
    switch (action.type) {
        case 'SELECT_TYPE':
            return {
                ...state,
                selectedPointType: action.pointType
            }
        case 'SAVE': 
         switch (state.selectedPointType) {
            case 'pro_arguments': 
                return {
                    ...state,
                    pro_arguments : state.pro_arguments.concat({ type : 'pro arg' })
                }
            case 'con_arguments':
                return {
                    ...state,
                    con_arguments : state.con_arguments.concat({ type : 'con arg' })
                }
            case 'qual_arguments':
                return {
                    ...state,
                    qual_arguments : state.qual_arguments.concat({ type :'qual arg' })
                }
            case 'thesis': 
                return {
                    ...state, 
                    thesis : `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                    eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                    minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                    commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
                    cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                    sunt in culpa qui officia deserunt mollit anim id est laborum.`
                }

         }
    }

    return state; 

}

export default draftSpaceReducer; 