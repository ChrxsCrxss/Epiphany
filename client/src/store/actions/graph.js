import * as actionTypes from './actionTypes';

export const setCyCoreRef = ( cyCoreRef ) => {
    return {
        type : actionTypes.SET_CY_CORE_REF,
        cyCoreRef : cyCoreRef
    }; 
};