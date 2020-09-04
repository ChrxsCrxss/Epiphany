
// This is a high-order wrapper component that basically
// returns its children, which will be components. It allows
// us to place adjacent html elements without creating an 
// array and without wrapping these elements inside a 
// <div> tag. 
const aux = ( props ) => props.children;

export default  aux; 