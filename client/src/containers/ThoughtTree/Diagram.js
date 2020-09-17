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


cytoscape.use(cxtmenu);


// Root Thesis
// Center on Graph




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

        const commands = [this.DesignateAsThesis, this.printToConsole, this.OpenInPanel, this.AddSupportNode, this.AddOpposeNode];

        const ctxMenuConfigObjectWithCmds = { ...ctxMenuConfigObject, commands: commands };

        this.setState({ ctxMenuConfiguration: ctxMenuConfigObjectWithCmds });

        this.setState({ cyCoreListeners: this.myCyRef._private.emitter.listeners });

        // Grab thesis
        this.myCyRef.add({
            group: 'nodes',
            data: {
                id: 'thesis',
                label: this.props.thesis.title,
                type: this.props.thesis.type,
                title: this.props.thesis.title,
                content: this.props.thesis.content
            }
        });

        // // Grab qualifying arguments
        for (let i = 0; i < this.props.qual_arguments.length; i++) {
            this.addNode('thesis', 'qualify', this.props.qual_arguments[i])
        }

        // // Grab pro arguments
        for (let i = 0; i < this.props.pro_arguments.length; i++) {
            this.addNode('thesis', 'support', this.props.pro_arguments[i])
        }

        // Grab con arguments 
        for (let i = 0; i < this.props.con_arguments.length; i++) {
            this.addNode('thesis', 'oppose', this.props.con_arguments[i])
        }

        // TODO: figure out how to get leaves 
        const leaves = this.myCyRef.$('#thesis').leaves();
        console.log(`There are ${leaves.length} open threads remaining`);

        // create new layout
        let layout = this.myCyRef.$().layout(graphLayoutOptions);

        layout.run();

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

        this.setState({ panelContent: newPanelContent, mapGridSize: 7, showPanel: true, currentEleInPanel: ele });

    }

    closePanelHandler = () => {

        this.setState({ panelContent: null, mapGridSize: 12, showPanel: false });
    }


    /**
     * 
     * @param {*} targetEleID  The id of the node to be added 
     * @param {string} type 
     * @param {object} content 
     */
    addNode = (targetEleID, type, content) => {

        console.log('in addNode', content);

        const edgeColor =
            type === 'support' ? 'green'
                : type === 'oppose' ? 'red'
                    : 'blue';


        const newNodeID = `node-${uuidv4()}`;

        this.myCyRef.add({
            group: 'nodes',
            data: {
                id: newNodeID,
                label: content.title,
                type: content.type,
                title: content.title,
                content: content.content
            },
        });

        const newEdgeID = `edge-${uuidv4()}`;

        this.myCyRef.add({
            group: 'edges',
            data: { id: newEdgeID, source: newNodeID, target: targetEleID },
            style: { 'line-color': edgeColor }
        });




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


    /**
     * Here we define the commands that we pass to the cxtmenu. There is alot of repeated
     * code here. It would be better to  
     */
    printToConsole = {
        // example command
        fillColor: 'rgba(200, 200, 200, 0.75)', // optional: custom background color for item
        content: 'Print to console', // html/text content to be displayed in the menu
        contentStyle: {}, // css key:value pairs to set the command's css in js if you want
        select: (ele) => { // a function to execute when the command is selected
            alert('clicked a node:  ' + ele.id()) // `ele` holds the reference to the active element
        },
        enabled: true // whether the command is selectable
    }

    OpenInPanel = {
        // example command
        fillColor: 'rgba(100, 100, 100, 0.75)', // optional: custom background color for item
        content: 'Open in Panel', // html/text content to be displayed in the menu
        contentStyle: {}, // css key:value pairs to set the command's css in js if you want
        select: (ele) => { // a function to execute when the command is selected
            console.log('clicked open panel in ctxmenu');
            this.nodeClickedHandler(ele._private.data.text, ele);
        },
        enabled: true // whether the command is selectable
    }

    AddSupportNode = {

        // example command
        fillColor: 'rgba(20, 200, 40, 0.75)', // optional: custom background color for item
        content: 'Defend', // html/text content to be displayed in the menu
        contentStyle: {}, // css key:value pairs to set the command's css in js if you want
        select: (ele) => { // a function to execute when the command is selected
            console.log('clicked add supporting ideas in ctxmenu');
            this.addNode(ele.id(), 'support', {
                label: 'new node',
                type: 'pro',
                title: 'new node title',
                content: 'new node content'
            });
        },
        enabled: true // whether the command is selectable
    }

    AddOpposeNode = {

        // example command
        fillColor: 'rgba(200, 20, 20, 0.75)', // optional: custom background color for item
        content: 'Attack', // html/text content to be displayed in the menu
        contentStyle: {}, // css key:value pairs to set the command's css in js if you want
        select: (ele) => { // a function to execute when the command is selected
            console.log('clicked add supporting ideas in ctxmenu');
            this.addNode(ele.id(), 'oppose', {
                label: 'new node',
                type: 'con',
                title: 'new node title',
                content: 'new node content'
            });
        },
        enabled: true // whether the command is selectable
    }

    DesignateAsThesis = {

        // example command
        fillColor: 'rgba(200, 200, 0, 0.75)', // optional: custom background color for item
        content: 'Make Thesis', // html/text content to be displayed in the menu
        contentStyle: {}, // css key:value pairs to set the command's css in js if you want
        select: (ele) => { // a function to execute when the command is selected
            console.log('clicked designate as thesis in ctxmenu');
            this.tagThesis(ele);
        },
        enabled: true // whether the command is selectable

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
                            />
                        </Grid>
                        : null
                    }

                </Grid>
            </React.Fragment>
        )
    }
}

const mapStateToProps = state => {
    return {
        pro_arguments: state.pro_arguments,
        con_arguments: state.con_arguments,
        qual_arguments: state.qual_arguments,
        thesis: state.thesis
    };
};


export default connect(mapStateToProps)(Diagram); 