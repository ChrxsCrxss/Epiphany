import React, { Component } from "react";
import DraftDeck from "../containers/DraftDeck/DraftDeck";
import AboutBlurb from "./AboutBlurb/AboutBlurb";
import Layout from "../containers/Layout/Layout";
import { BrowserRouter } from "react-router-dom";
import { Route, Switch } from "react-router-dom";
import Diagram from "../containers/ThoughtTree/Diagram.js";
import SignUp from "../containers/Authentication/SignUp/SignUp"; 

// The app container returns the draft-space (user input area),
// wrapped in the high-order Layout Component. 

export default class App extends Component {

    componentDidUpdate() {

        console.log('[Diagram.js]: componentDidUpdate');

    }




    render() {


        return (
            <BrowserRouter>
                <Layout>
                    <Switch>
                        <Route path='/' exact component={DraftDeck}/>
                        <Route path='/login' exact component={SignUp} />
                        <Route path='/test' exact render={() => (<h1>Test Routing Page</h1>)} />
                        <Route path='/about' exact component={AboutBlurb} />
                        <Route path='/thoughtTree' exact component={Diagram} />
                    </Switch>
                </Layout>
            </BrowserRouter>

        )
    }

}
