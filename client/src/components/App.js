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

    state = {

        nodeDataArray: [
            { data: { id: 'one', label: `Node 1`, text: "Immutable benefits performance here by reducing the total number of diff() calls needed. For example, an unchanged element requires only one diff with Immutable whereas it would require many diffs with the default JSON diff() implementation. Basically, Immutable make diffs minimal-depth searche" }},
            { data: { id: 'two', label: `Node 2`, text: "I hope this post will be an important milestone in your journey into Functional Programming, as well as a source of information to go back to when needed." }}
        ],

        linkDataArray: [
            { data: { source: 'one', target: 'two', label: 'Edge from Node1 to Node2' } }
        ],

        newNodeContent: ''

    }

    componentDidUpdate() {

        // Either the user has submitted an empty draft or
        // create new node has already been called and this check
        // prevents the indefinite loop 
        if (!this.state.newNodeContent) { return; }

        this.createNewNode(this.props.newNodeContent);

        console.log('[Diagram.js]: componentDidUpdate');

    }


    createNewNode = (newNodeContent) => {

        let newNodeDataArray = [...this.state.nodeDataArray];

        const newNode = {
            data: {
                id: 'three',
                label: 'Node 3',
                text: newNodeContent,
            },
            position: { x: 400, y: 400 }
        }

        let newLinkDataArray = [...this.state.linkDataArray];

        const newLink = {
            data: {
                source: 'one',
                target: newNode.data.id,
                label: 'new label for new edge'
            }
        }

        newNodeDataArray.push(newNode);

        newLinkDataArray.push(newLink);


        this.setState({
            nodeDataArray: newNodeDataArray,
            linkDataArray: newLinkDataArray,

            // Very important to update this value to null to prevent 
            // an indefinite loop. 
            newNodeContent: null,
        });


        console.log('new node created');


    }



    liftNewNodeContent = (newContent) => {
        this.setState({ newNodeContent: newContent });
    }



    render() {


        return (
            <BrowserRouter>
                <Layout>
                    <Switch>
                        <Route path='/' exact render={
                            () => {
                                return (
                                    <DraftDeck
                                        liftNewNodeContent={this.liftNewNodeContent
                                        }
                                    />
                                )
                            }
                        } />
                        <Route path='/login' exact component={SignUp} />
                        <Route path='/test' exact render={() => (<h1>Test Routing Page</h1>)} />
                        <Route path='/about' exact component={AboutBlurb} />
                        <Route path='/thoughtTree' exact render={() => {
                            return (
                                <Diagram
                                    nodeDataArray={this.state.nodeDataArray}
                                    linkDataArray={this.state.linkDataArray}

                                />
                            )
                        }} />
                    </Switch>
                </Layout>
            </BrowserRouter>

        )
    }

}
