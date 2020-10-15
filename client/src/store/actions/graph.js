import * as actionTypes from './actionTypes';

export const saveDiagram = ( payload ) => {
    return {
        type : actionTypes.SAVE_DIAGRAM,
        payload : payload
    }; 
};