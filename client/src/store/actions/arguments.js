import * as actionTypes from './actionTypes';



export const addArgument = ( payload ) => {
    return {
        type : actionTypes.ADD_ARGUMENT,
        payload : {...payload}
    }; 
};


export const updateArgument = ( ele, updatedArgument ) => {
    return     {
        type: actionTypes.UPDATE_ARGUMENT,
        targetArgumentId: ele.id,
        updatedArgumentType: ele.type,
        updatedArgument: {
            id: ele.id,
            type: ele.type,
            ...updatedArgument
        }
    };
};

