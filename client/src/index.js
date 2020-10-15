import React from "react";
import ReactDOM from "react-dom"; 
import App from "./App"

import { createStore, applyMiddleware, compose, combineReducers } from "redux"; 
import { Provider } from "react-redux"; 
import draftSpaceReducer from "./store/reducers/draftspacereducer"; 
import graphReducer from './store/reducers/graphreducer'; 

const rootReducer = combineReducers({
    draftSpaceReducer,
    graphReducer
});


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore( rootReducer, composeEnhancers(applyMiddleware())); 


ReactDOM.render(<Provider store={store}><App/></Provider>, document.getElementById("root"));

