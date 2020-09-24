import React, { Component } from "react";
import Card from '@material-ui/core/Card';
import cytoscape from 'cytoscape';
import cxtmenu from 'cytoscape-cxtmenu';
import CytoscapeComponent from 'react-cytoscapejs';
import Grid from '@material-ui/core/Grid';
import * as cyStyles from './CytoscapeStyles'
import Panel from "../../components/UI/Panel/Panel";
import { v4 as uuidv4 } from 'uuid';
import { connect } from 'react-redux';
import ctxMenuConfigObject from "./CytoscapeConfig/ctxMenuConfiguration";
import graphLayoutOptions from "./CytoscapeConfig/graphLayoutOptions";
import classes from './Diagram.module.css';
import * as actionTypes from "../../store/actions/actionsTypes";
import ctxMenuCmdsConfig from "./CytoscapeConfig/ctxMenuCmdsConfig"; 

cytoscape.use(cxtmenu);


/**
 * This component desperately needs to be refactored: 
 * (1) Move the cytoscapeComponent into its own class component 
 * (2) Attempt to move the ctxMenuCommands elsewhere and do just-in-time binding or something 
 */

class Diagram extends Component {

    constructor(props) {
        super(props);
    }

    state = {
        panelContent: null,
        showPanel: false,
        mapGridSize: 12,
        panelGridSize: 5,
        currentEleInPanel: null,
        currentThesisNodeID: null,
        ctxMenuConfiguration: null,
        cyCoreListeners: []
    }

    myCyRef = React.createRef();

    componentDidMount() {

        // const commands = [this.DesignateAsThesis, this.printToConsole, this.OpenInPanel, this.AddSupportNode, this.AddOpposeNode];

        const commands = ctxMenuCmdsConfig({
            defendCallback : this.addNode,
            attackCallback : this.addNode,
            makeThesisCallback : this.tagThesis,
            openInPanelCallback : this.nodeClickedHandler
        })
        
        const ctxMenuConfigObjectWithCmds = { ...ctxMenuConfigObject, commands: commands };

        this.setState({ ctxMenuConfiguration: ctxMenuConfigObjectWithCmds });

        this.setState({ cyCoreListeners: this.myCyRef._private.emitter.listeners });

        // Grab thesis
        this.myCyRef.add({
            group: 'nodes',
            data: {
                id: this.props.thesis[0].id,
                label: this.props.thesis[0].title,
                type: this.props.thesis[0].type,
                title: this.props.thesis[0].title,
                content: this.props.thesis[0].content
            }
        });

        this.setState({ currentThesisNodeID: this.props.thesis[0].id }, () => this.loadNodes());

    }

    // refactor method to reduce repetition and remove two other functions 
    loadNodes = () => {

        // // Grab qualifying arguments
        for (let i = 0; i < this.props.qual_arguments.length; i++) {
            this.addNode({
                creationMethod: 'static',
                targetEleID: this.state.currentThesisNodeID,
                edgeType: 'qualify',
                argumentData: this.props.qual_arguments[i]
            });
        }

        // // Grab pro arguments
        for (let i = 0; i < this.props.pro_arguments.length; i++) {
            this.addNode({
                creationMethod: 'static',
                targetEleID: this.state.currentThesisNodeID,
                edgeType: 'support',
                argumentData: this.props.pro_arguments[i]
            });
        }
        // Grab con arguments 
        for (let i = 0; i < this.props.con_arguments.length; i++) {
            this.addNode({
                creationMethod: 'static',
                targetEleID: this.state.currentThesisNodeID,
                edgeType: 'oppose',
                argumentData: this.props.con_arguments[i]
            });
        }


        // TODO: figure out how to get leaves 
        // const leaves = this.myCyRef.$('#thesis').leaves();
        // console.log(`There are ${leaves.length} open threads remaining`);

        this.runLayout();
    }



    /**
     * 
     * @param {*} id The id associated with the argument node that is being updated
     * @param {string} type The type of argument being updated. Used to traverse the correct array. 
     */
    updateNode = (id, type) => {

        console.log(type); 


        let targetArray;
        switch (type) {
            case 'thesis':
                targetArray = this.props.thesis;
                break;
            case 'pro_arguments':
                targetArray = this.props.pro_arguments;
                break;
            case 'con_arguments':
                targetArray = this.props.con_arguments;
                break; 
            case 'qual_arguments' :
                targetArray = this.props.qual_arguments;
            default:
                throw Error("no target array found"); 
                break;
        }

        for (let i = 0; i < targetArray.length; ++i) {
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


    nodeClickedHandler = (newPanelContent, ele) => {

        console.log('in nodeClickedHandler', ele);

        this.setState({
            panelContent: newPanelContent,
            mapGridSize: 7, showPanel: true,
            currentEleInPanel: ele
        });

    }

    closePanelHandler = () => {
        this.setState({ panelContent: null, mapGridSize: 12, showPanel: false });
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
            this.props.onAddNode(nodeInitInfo.argumentData)

            console.log(nodeInitInfo.argumentData.type); 

            let targetArray;
            switch (nodeInitInfo.argumentData.type) {
                case 'pro_arguments':
                    targetArray = this.props.pro_arguments;
                    break;
                case 'con_arguments':
                    targetArray = this.props.con_arguments;
                    break; 
                case 'qual_arguments' :
                    targetArray = this.props.qual_arguments;
                default:
                    throw Error("no target array found"); 
                    break;
            }


            for (let i = 0; i < targetArray.length; ++i) {
                const arg = targetArray[i]; 
                console.log("checking that store was updated: ", arg); 
                if (arg.id === nodeInitInfo.argumentData.id) {
                    console.log('successfully added argument to store'); 
                    nodeInitInfo.argumentData = {...arg};
                    break; 
                }
            }


        }



        console.log('in addNode', nodeInitInfo.argumentData);

        let edgeColor; 
        switch (nodeInitInfo.edgeType) {
            case 'support':
                edgeColor = 'green';
                break;
            case 'oppose':
                edgeColor = 'red';
                break;
            case 'qualify': 
                edgeColor = 'blue'
            default:
                edgeColor = 'gray'
                console.warn('no edge type specified in the nodeInitInfo object: ', nodeInitInfo); 
                break;
        }


        this.myCyRef.add({
            group: 'nodes',
            data: {
                ...nodeInitInfo.argumentData,
                label : nodeInitInfo.argumentData.title
            },
        });

        const newEdgeID = `edge-${uuidv4()}`;

        this.myCyRef.add({
            group: 'edges',
            data: { id: newEdgeID, source: nodeInitInfo.argumentData.id, target: nodeInitInfo.targetEleID },
            style: { 'line-color': edgeColor }
        });


        this.runLayout()
    }

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

            <React.Fragment>
                <Grid container direction="row">
                    <Grid item sm={this.state.mapGridSize}>

                        <Card>
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
                        </Card>
                    </Grid>

                    {this.state.showPanel ?
                        <Grid item sm={this.state.panelGridSize}>
                            <Panel
                                title={"Panel"}
                                content={this.state.panelContent}
                                close={this.closePanelHandler}
                                ele={this.state.currentEleInPanel}
                                onEditUpdate={this.updateNode}
                            />
                        </Grid>
                        : null
                    }

                </Grid>
            </React.Fragment>
        )
    }
}


const mapDispatchToProps = dispatch => {
    return {

        /**
         * @param {object} payload The object holding the values
         * for the argument object. Has the following values: 
         * { id, type, title, content }
         */
        onAddNode: (payload) => dispatch(
            {
                type: actionTypes.ADD_ARGUMENT,
                payload: payload
            }
        )


    };
}

const mapStateToProps = state => {
    return {
        pro_arguments: state.pro_arguments,
        con_arguments: state.con_arguments,
        qual_arguments: state.qual_arguments,
        thesis: state.thesis
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(Diagram); 