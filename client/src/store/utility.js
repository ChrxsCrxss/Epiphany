
/**
 * Utility function for updating old object with new properties
 * using ESG spread operator syntax 
 * @param {*} oldObject Old object
 * @param {*} updatedProperties New properties 
 */
export const updateObject = (oldObject, updatedProperties) => {
    return {
        ...oldObject,
        ...updatedProperties
    };
};