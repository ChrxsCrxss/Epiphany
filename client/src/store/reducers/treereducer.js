const initialState = {
    ideaTress : []
}

const reducer = (state = initialState, action) => {

    if (action.type === 'PUSH') {
        return {
            state,
            ideaTrees : state.ideaTress.concat(action.payload)
        }
    }

    return state; 
}