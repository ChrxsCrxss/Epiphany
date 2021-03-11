import React, { Component } from "react";

import { BrowserRouter, Route, Switch } from "react-router-dom";

import AboutBlurb from "./components/AboutBlurb/AboutBlurb";
import Layout from "./containers/Layout/Layout";
import asyncComponent from "./components/hoc/AsyncComponent/AsyncComponent";

// Lazy Loading Component 
const asyncDiagram = asyncComponent(() => {
    return import("./containers/ThoughtTree/Diagram.js");
});

const asyncProfile = asyncComponent(() => {
    return import("./containers/Profile/profile.js");
});

export default class App extends Component {

    render() {
        return (
            <BrowserRouter>
                <Layout>
                    <Switch>
                        <Route path='/' exact component={asyncDiagram} />
                        <Route path='/profile' exact component={asyncProfile} />
                        <Route path='/test' exact render={() => (<h1>Test Routing Page</h1>)} />
                        <Route path='/about' exact component={AboutBlurb} />
                    </Switch>
                </Layout>
            </BrowserRouter>

        )
    }

}
