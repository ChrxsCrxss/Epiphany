import React from "react";
import DraftDeck from "../components/containers/DraftDeck/DraftDeck";
import AboutBlurb from "./AboutBlurb/AboutBlurb";
import Layout from "../components/containers/Layout/Layout";
import { BrowserRouter } from "react-router-dom";
import { Route, Switch } from "react-router-dom";


// The app container returns the draft-space (user input area),
// wrapped in the high-order Layout Component. 

const App = () => {

    return (

        <BrowserRouter>
            <Layout>
                <Switch>
                    <Route path='/' exact component={ DraftDeck } />
                    <Route path='/login' exact render={ () => ( <h1>Registration/Login Page</h1> )} />
                    <Route path='/test' exact render={ () => ( <h1>Test Routing Page</h1> )} />
                    <Route path='/about' exact component={ AboutBlurb } />
                </Switch>
            </Layout>
        </BrowserRouter>

    )

}

export default App; 
