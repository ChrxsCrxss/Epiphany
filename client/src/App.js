import React, { Component } from "react";
import { BrowserRouter } from "react-router-dom";
import { Route, Switch } from "react-router-dom";

import AboutBlurb from "./components/AboutBlurb/AboutBlurb";
import Layout from "./containers/Layout/Layout";
import asyncComponent from "./components/hoc/AsyncComponent/AsyncComponent"; 

const asyncDraftDeck = asyncComponent(() => {
    return import("./containers/DraftDeck/DraftDeck");
});

const asyncSignUp = asyncComponent(() => {
    return import("./containers/Authentication/SignUp/SignUp");
});

const asyncDiagram = asyncComponent(() => {
    return import("./containers/ThoughtTree/Diagram.js");
});

export default class App extends Component {

    render() {
        return (
            <BrowserRouter>
                <Layout>
                    <Switch>
                        <Route path='/' exact component={asyncDraftDeck}/>
                        <Route path='/login' exact component={asyncSignUp} />
                        <Route path='/test' exact render={() => (<h1>Test Routing Page</h1>)} />
                        <Route path='/about' exact component={AboutBlurb} />
                        <Route path='/thoughtTree' exact component={asyncDiagram} />
                    </Switch>
                </Layout>
            </BrowserRouter>

        )
    }

}
