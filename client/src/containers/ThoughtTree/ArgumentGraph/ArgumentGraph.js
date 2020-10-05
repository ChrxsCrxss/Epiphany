import React, { Component } from "react";

import cytoscape from 'cytoscape';
import cxtmenu from 'cytoscape-cxtmenu';
import CytoscapeComponent from 'react-cytoscapejs';
import * as cyStyles from '../CytoscapeStyles';
import { v4 as uuidv4 } from 'uuid';
import { connect } from 'react-redux';
import ctxMenuConfigObject from "../CytoscapeConfig/ctxMenuConfiguration";
import graphLayoutOptions from "../CytoscapeConfig/graphLayoutOptions";
import * as actions from '../../../store/actions/index';
import ctxMenuCmdsConfig from "../CytoscapeConfig/ctxMenuCmdsConfig";
import assert from 'assert';

cytoscape.use(cxtmenu);



class ArgumentGraph extends Component {


    state = {
        currentThesisNodeID: null,
        ctxMenuConfiguration: null,
        cyCoreListeners: []
    }

    myCyRef = React.createRef();

    componentDidMount() {

        /**
         * We will need to initialize the ArgumentGraphController BEFORE
         * this, and pass those arguments as callbacks, i.e., 
         * defendCallback: ArgumentGraphInterface.addNode 
         */
        const commands = ctxMenuCmdsConfig({
            defendCallback: this.addNode,
            attackCallback: this.addNode,
            makeThesisCallback: this.tagThesis,
            openInPanelCallback: this.props.nodeClickedHandler
        })

        const ctxMenuConfigObjectWithCmds = { ...ctxMenuConfigObject, commands: commands };

        this.setState({ ctxMenuConfiguration: ctxMenuConfigObjectWithCmds });

        this.setState({ cyCoreListeners: this.myCyRef._private.emitter.listeners });


        /**
         * Add a check to see if there is a thesis. Useful for development: allows access
         * of the page without adding a thesis 
         */
        let initThesisID = 'null thesis id value';
        if (this.props.thesis[0]) {
            initThesisID = this.props.thesis[0].id;
        }

        /**
         * We load the nodes in the callback because all original arguments either
         * support, oppose, or qualify the thesis. Since the id of the thesis is used
         * as the id of the target node, currentThesisNodeID must be set before the 
         * nodes can be loaded.
         */
        this.setState({ currentThesisNodeID: initThesisID }, () => this.loadNodes());

        this.runLayout();

        /**
         * Finally, pass callbacks up to parent. This will eventually be
         * ArgumentGraphInterface.updateNode and ArgumentGraphInterface.deleteNode
         */
        this.props.setNodeCallbacks('updateNode', this.updateNode);
        this.props.setNodeCallbacks('deleteNode', this.deleteNode);


    }


    componentDidUpdate() {

        /**
         * Note created on September 14, 2020: 
         * This is a quick workaround to the issue of the doubling listener calls in the cy model. 
         * Inspection of the cy object revealed that after each ctxmenu event, duplicate listeners
         * were pushed to the listeners array. To observe this phenomena, comment out out the 
         * next three lines and log this.myCyRef._private.emitter.listeners.
         * 
         * 
         * This solution simply empties the listeners array after each ctxmenu event and reconfigures 
         * the menu with the ctxMenuConfiguration state property.
         * 
         * To preserve the default functionality of the core, the listeners on the core are saved 
         * after the CytoscapeComponent mounts. These listeners are then added back to the core along
         * with listeners for hte ctxmenu. 
         * 
         * This is not the best solution, since it is O(n). But so long as the number of listeners
         * is small, it should work. This lifecycle props is also a good location to implement dynamic
         * ctxmenu logic (i.e, special commands for the thesis node). 
         * 
         * 
         * https://stackoverflow.com/questions/59981646/see-the-list-of-event-listeners-currently-attached
         */

        this.myCyRef._private.emitter.listeners = [];
        this.myCyRef._private.emitter.listeners = [...this.state.cyCoreListeners];

        this.myCyRef.cxtmenu(this.state.ctxMenuConfiguration);


        this.myCyRef.on('tap', 'node', (event) => {

            const elem = this.myCyRef.$id(event.target.id());

            console.log(elem._private.data.text);

            this.myCyRef.center(elem);

            // this.nodeClickedHandler(elem._private.data.text, elem.id());

        });


        console.log(this.myCyRef);

        console.log(this.myCyRef._private.emitter.listeners);

        this.render();
    }




    //////////////////////////////////////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////////////////////////////////////////


    // refactor method to reduce repetition and remove two other functions 
    loadNodes = () => {

        /**
         * We have to insert nodes in a particular order. The thesis
         * must come before all 1st degree arguments, all 2nd degree
         * arguments before 3rd degree arguments, etc.
         */
        const staticArguments = []
            .concat(this.props.thesis)
            .concat(this.props.qual_arguments)
            .concat(this.props.pro_arguments)
            .concat(this.props.con_arguments)
            .sort((arga, argb) => arga.degree - argb.degree);

        if (staticArguments.length === 0) {

            const id  = uuidv4()
            this.addNode({
                creationMethod: 'dynamic',
                targetEleID: id,
                edgeType: 'qualify',
                argumentData: {
                    id: id,
                    type: 'thesis',
                    title: 'This is your thesis statement',
                    content: 'Begin your analysis here'
                }
            });
            return
        }



        for (let idx = 0; idx < staticArguments.length; ++idx) {

            const argType = staticArguments[idx].type;
            switch (argType) {
                case 'thesis':
                    this.addNode({
                        creationMethod: 'static',
                        targetEleID: staticArguments[idx].targetArgument || this.state.currentThesisNodeID,
                        edgeType: 'qualify',
                        argumentData: staticArguments[idx]
                    });
                    break;
                case 'qual_arguments':
                    this.addNode({
                        creationMethod: 'static',
                        targetEleID: staticArguments[idx].targetArgument || this.state.currentThesisNodeID,
                        edgeType: 'qualify',
                        argumentData: staticArguments[idx]
                    });
                    break;
                case 'pro_arguments':
                    this.addNode({
                        creationMethod: 'static',
                        targetEleID: staticArguments[idx].targetArgument || this.state.currentThesisNodeID,
                        edgeType: 'support',
                        argumentData: staticArguments[idx]
                    });
                    break;
                case 'con_arguments':
                    this.addNode({
                        creationMethod: 'static',
                        targetEleID: staticArguments[idx].targetArgument || this.state.currentThesisNodeID,
                        edgeType: 'oppose',
                        argumentData: staticArguments[idx]
                    });
                    break;
                default:
                    console.log('static argument type:', argType);
                    throw Error('Cannot load static argument data: unknown argument type');
            }
        }

    }

    getArgumentArrayByType = (type) => {
        switch (type) {
            case 'thesis': return this.props.thesis;
            case 'pro_arguments': return this.props.pro_arguments;
            case 'con_arguments': return this.props.con_arguments;
            case 'qual_arguments': return this.props.qual_arguments;
            default: throw Error("no target array found");
        }
    }
    /**
 * 
 * @param {*} id The id associated with the argument node that is being updated
 * @param {string} type The type of argument being updated. Used to traverse the correct array. 
 */
    updateNode = (id, type) => {

        console.log(type);


        let targetArray = this.getArgumentArrayByType(type);

        for (let i = 0; i < targetArray.length; ++i) {
            assert(targetArray[i] !== undefined);
            if (id === targetArray[i].id) {
                this.myCyRef.$(`#${id}`).data({
                    label: targetArray[i].title,
                    type: targetArray[i].type,
                    title: targetArray[i].title,
                    content: targetArray[i].content
                });
            }
        }

    }




    updateStoreAndGetData = (nodeInitInfo) => {

        console.log('adding argument to store');
        this.props.onDynamicAddNode(nodeInitInfo.argumentData)

        console.log(nodeInitInfo.argumentData.type);

        let targetArray = this.getArgumentArrayByType(nodeInitInfo.argumentData.type);


        for (let i = 0; i < targetArray.length; ++i) {
            const arg = targetArray[i];
            console.log("checking that store was updated: ", arg);
            if (arg.id === nodeInitInfo.argumentData.id) {
                console.log('successfully added argument to store');

                return { ...nodeInitInfo, argumentData: { ...arg } }
            }
        }

        console.alert('Could not successfully get data from store');
        return nodeInitInfo;
    }


    onSetTargetArgumentAndGetData = (nodeInitInfo) => {

        const ele = {
            id: nodeInitInfo.argumentData.id,
            type: nodeInitInfo.argumentData.type
        };

        const updatedArgument = {
            ...nodeInitInfo.argumentData,
            targetArgument: nodeInitInfo.targetEleID

        }

        this.props.onSetTargetArgument(ele, updatedArgument);


        let targetArray = this.getArgumentArrayByType(nodeInitInfo.argumentData.type);

        for (let i = 0; i < targetArray.length; ++i) {
            const arg = targetArray[i];
            console.log("checking that store was updated: ", arg);
            if (arg.id === nodeInitInfo.argumentData.id) {
                console.log('successfully added argument to store');

                return { ...nodeInitInfo, argumentData: { ...arg } }
            }
        }

        console.log('Could not successfully get data from store');
        return nodeInitInfo;


    }


    getEdgeColorFromEdgeType = (edgeType) => {

        switch (edgeType) {
            case 'support': return 'green';
            case 'oppose': return 'red';
            case 'qualify': return 'blue';
            default: return 'gray';
        }

    }

    deleteNode = (id) => {

        /**
         * We want to prevent parititions, so we need to get all neighbors
         * the edge type.
         * 
         * Cases: 
         * A) elementToBeRemoved => parent( elementToBeRemoved ) is of same type
         *    as neighbor(elementToBeRemoved) => elementToBeRemoved
         */

        /**
         * Get edges (and their sources) coming into the nodes in the collection.
         * This call will return an array of edges and source nodes. We can get the
         * type of edge and the source from each source. We won't need to use the 
         * nodes themselves to update the UI. 
         * 
         * HOWEVER, there are cases where the argument type of the node changes, and
         * we will therefore have to switch arguments between arrays. 
         * 
         * 
         */

        const Incomers = this.myCyRef.$(`#${id}`).incomers();
        const Outgoers = this.myCyRef.$(`#${id}`).outgoers();

        const elementToBeRemoved = this.myCyRef.$(`#${id}`);
        this.myCyRef.remove(elementToBeRemoved);

    }


    /**
 * 
 * @param {*} nodeInitInfo
 */
    addNode = (nodeInitInfo) => {

        // IMPORTANT: to enable in-panel editing, we must also update the store with 
        // the new argument when we add a new node. Do this BEFORE adding nodes and edges 
        // so store is the only truthmaker. The best thing to do might be to acces the store
        // after pushing the new argument, filtering on ids to get the new argument, and 
        // using its values to populate the data object of the new node. This way, we can 
        // immmediately verify that the argument is in the store, and the store remains the 
        // only truthmaker. Otherwise you risk adding nodes to the graph whose state is not
        // recorded or managed. Again the problem will be passing id: modify the reducer to 
        // accept action.id or uuidv4() depending on where the node was created ; save the 
        // id locally, and filter on it... or just change the dispatch to require an id so 
        // the component that created the node gets to know what the id is... 


        if (nodeInitInfo.creationMethod === 'dynamic') {
            console.log('adding argument to store');
            // this.props.onDynamicAddNode(nodeInitInfo.argumentData)
            nodeInitInfo = this.updateStoreAndGetData(nodeInitInfo);
        }

        if (nodeInitInfo.argumentData.targetArgument === null) {
            nodeInitInfo = this.onSetTargetArgumentAndGetData(nodeInitInfo);
        }

        this.myCyRef.add({
            group: 'nodes',
            data: {
                ...nodeInitInfo.argumentData,
                label: nodeInitInfo.argumentData.title
            },
        });





        let edgeColor = this.getEdgeColorFromEdgeType(nodeInitInfo.edgeType)

        const newEdgeID = `edge-${uuidv4()}`;

        if (nodeInitInfo.argumentData.type !== 'thesis') {
            this.myCyRef.add({
                group: 'edges',
                data: {
                    id: newEdgeID,
                    type: nodeInitInfo.edgeType,
                    source: nodeInitInfo.argumentData.id,
                    target: nodeInitInfo.argumentData.targetArgument || this.state.currentThesisNodeID
                },
                style: { 'line-color': edgeColor }
            });
        }


        this.runLayout();
    }



    //////////////////////////////////////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////////////////////////////////////////


    runLayout = () => {
        // create new layout
        let layout = this.myCyRef.$().layout(graphLayoutOptions);
        layout.run();
    }

    tagThesis = (ele) => {

        if (this.state.currentThesisNodeID) {
            this.myCyRef.$(this.state.currentThesisNodeID).css({ backgroundColor: 'white' });
        }

        console.log(ele.id());
        const eleID = `#${ele.id()}`;

        this.setState({ currentThesisNodeID: eleID });

        this.myCyRef.$(eleID).css({ backgroundColor: 'red' });

    }

    render() {
        return (
            <CytoscapeComponent
                style={cyStyles.cyStyle}
                stylesheet={cyStyles.eleStyles}

                // The default action of the cytoscape package seems to be to place two
                // nodes in the graph if no application data is provided. This call to
                // normalizeElements prevents that action. 
                elements={CytoscapeComponent.normalizeElements({ nodes: [], edges: [] })}

                // use extensions by accessing the core object using the cy prop 
                cy={cy => {

                    this.myCyRef = cy;
                    // Pan the graph to the centre of a collection. If no collection is 
                    // specified, then the graph is centred on all nodes and edges in the graph.
                    cy.centre( /* Center of graph */);
                }}
            />
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onDynamicAddNode: (payload) => dispatch(actions.addArgument(payload)),
        onSetTargetArgument: (ele, updatedArgument) => dispatch(actions.updateArgument(ele, updatedArgument)),
    };
}

const mapStateToProps = state => {
    return {
        pro_arguments: state.pro_arguments,
        con_arguments: state.con_arguments,
        qual_arguments: state.qual_arguments,
        thesis: state.thesis,
        isAuthenticated: state.isAuthenticated
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ArgumentGraph); 