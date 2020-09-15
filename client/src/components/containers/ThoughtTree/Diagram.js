import React, { Component } from "react";
import Card from '@material-ui/core/Card';
import cytoscape from 'cytoscape';
import cxtmenu from 'cytoscape-cxtmenu';
import navigator from 'cytoscape-navigator';
import CytoscapeComponent from 'react-cytoscapejs';
import Grid from '@material-ui/core/Grid';
import cytoscapeStylesArray from './CytoscapeStyles'
import Panel from "../../UI/Panel/Panel";


cytoscape.use(cxtmenu);






/**
 * the default values of each option are outlined below:
 * Three commands for the cirle wheel: 
 * (1) Open in panel ( open panel, display text, other info )
 * (2) Add Supporting Ideas ( create green node )
 * (3) Add Opposing Ideas ( create red node )
 * (4) Piggyback off these Ideas ( create node )
 * (5) Print to console
 */


let options = {
    name: 'circle',

    fit: true, // whether to fit the viewport to the graph
    padding: 30, // the padding on fit
    boundingBox: undefined, // constrain layout bounds; { x1, y1, x2, y2 } or { x1, y1, w, h }
    avoidOverlap: true, // prevents node overlap, may overflow boundingBox and radius if not enough space
    nodeDimensionsIncludeLabels: false, // Excludes the label when calculating node bounding boxes for the layout algorithm
    spacingFactor: undefined, // Applies a multiplicative factor (>0) to expand or compress the overall area that the nodes take up
    radius: undefined, // the radius of the circle
    startAngle: 3 / 2 * Math.PI, // where nodes start in radians
    sweep: undefined, // how many radians should be between the first and last node (defaults to full circle)
    clockwise: true, // whether the layout should go clockwise (true) or counterclockwise/anticlockwise (false)
    sort: undefined, // a sorting function to order the nodes; e.g. function(a, b){ return a.data('weight') - b.data('weight') }
    animate: false, // whether to transition the node positions
    animationDuration: 500, // duration of animation in ms if enabled
    animationEasing: undefined, // easing of animation if enabled
    animateFilter: function (node, i) { return true; }, // a function that determines whether the node should be animated.  All nodes animated by default on animate enabled.  Non-animated nodes are positioned immediately when the layout starts
    ready: undefined, // callback on layoutready
    stop: undefined, // callback on layoutstop
    transform: function (node, position) { return position; } // transform a given node position. Useful for changing flow direction in discrete layouts 

};

var navdefaults = {
    container: false // html dom element
    , viewLiveFramerate: 0 // set false to update graph pan only on drag end; set 0 to do it instantly; set a number (frames per second) to update not more than N times per second
    , thumbnailEventFramerate: 30 // max thumbnail's updates per second triggered by graph updates
    , thumbnailLiveFramerate: false // max thumbnail's updates per second. Set false to disable
    , dblClickDelay: 200 // milliseconds
    , removeCustomContainer: true // destroy the container specified by user on plugin destroy
    , rerenderDelay: 100 // ms to throttle rerender updates to the panzoom for performance
};


export default class Diagram extends Component {

    constructor(props) {
        super(props);
    }

    state = {
        showCard: false,
        cardContent: null,
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

    configureCTXMenu = (Commands) => {
        const ctxMenuConfiguration = {
            menuRadius: 100, // the radius of the circular menu in pixels
            selector: 'node', // elements matching this Cytoscape.js selector will trigger cxtmenus
            commands: Commands, // function( ele ){ return [ /*...*/ ] }, // a function that returns commands or a promise of commands
            fillColor: 'rgba(0, 0, 0, 0.75)', // the background colour of the menu
            activeFillColor: 'rgba(1, 105, 217, 0.75)', // the colour used to indicate the selected command
            activePadding: 20, // additional size in pixels for the active command
            indicatorSize: 24, // the size in pixels of the pointer to the active command
            separatorWidth: 3, // the empty spacing in pixels between successive commands
            spotlightPadding: 4, // extra spacing in pixels between the element and the spotlight
            minSpotlightRadius: 24, // the minimum radius in pixels of the spotlight
            maxSpotlightRadius: 38, // the maximum radius in pixels of the spotlight
            openMenuEvents: 'cxttapstart taphold', // space-separated cytoscape events that will open the menu; only `cxttapstart` and/or `taphold` work here
            itemColor: 'white', // the colour of text in the command's content
            itemTextShadowColor: 'transparent', // the text shadow colour of the command's content
            zIndex: 9999, // the z-index of the ui div
            atMouse: false // draw menu at mouse position
        };

        this.setState({ ctxMenuConfiguration : ctxMenuConfiguration }); 
    }
    
 

    componentDidMount() {

        const commands = [this.DesignateAsThesis, this.printToConsole, this.OpenInPanel, this.AddSupportNode]; 
        this.configureCTXMenu(commands); 

        this.setState({ cyCoreListeners : this.myCyRef._private.emitter.listeners }); 



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



        console.log(this.myCyRef); 

        console.log(this.myCyRef._private.emitter.listeners);

        this.render(); 
    }


    makeCardInvisible = () => {
        this.setState({ showCard: false });
    }

    makeCardVisible = (newCardContent) => {
        if (!this.state.showCard) {
            this.setState({ cardContent: newCardContent, showCard: true });
        }
    };

    nodeClickedHandler = (newPanelContent, ele) => {

        this.setState({ panelContent: newPanelContent, mapGridSize: 7, showPanel: true, currentEleInPanel: ele.id() });

    }

    closePanelHandler = () => {

        this.setState({ panelContent: null, mapGridSize: 12, showPanel: false });
    }



    addNode = (ele) => {

        this.myCyRef.add({
            group: 'nodes',
            data: { label: 'Node 3' },
            position: { x: 300, y: 50 }
        });


    }

    tagThesis = (ele) => {

        if ( this.state.currentThesisNodeID ) {
            this.myCyRef.$(this.state.currentThesisNodeID).css({backgroundColor : 'white'}); 
        }

        console.log(ele.id());
        const eleID = `#${ele.id()}`; 

        this.setState({ currentThesisNodeID: eleID }); 

        this.myCyRef.$(eleID).css({backgroundColor : 'red'});

    }


    /**
     * Here we define the commands that we pass to the cxtmenu 
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
        fillColor: 'rgba(200, 200, 100, 0.75)', // optional: custom background color for item
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
        fillColor: 'rgba(200, 20, 40, 0.75)', // optional: custom background color for item
        content: 'Add Supporting Ideas', // html/text content to be displayed in the menu
        contentStyle: {}, // css key:value pairs to set the command's css in js if you want
        select: (ele) => { // a function to execute when the command is selected
            console.log('clicked add supporting ideas in ctxmenu');
            this.addNode(ele);
        },
        enabled: true // whether the command is selectable
    }

    DesignateAsThesis = {

        // example command
        fillColor: 'rgba(20, 20, 200, 0.75)', // optional: custom background color for item
        content: 'Designate as Thesis', // html/text content to be displayed in the menu
        contentStyle: {}, // css key:value pairs to set the command's css in js if you want
        select: (ele) => { // a function to execute when the command is selected
            console.log('clicked designate as thesis in ctxmenu');
            this.tagThesis(ele);
        },
        enabled: true // whether the command is selectable

    }

    /**
 * the default values of each option are outlined below:
 * Three commands for the cirle wheel: 
 * (1) Open in panel ( open panel, display text, other info )
 * (2) Add Supporting Ideas ( create green node )
 * (3) Add Opposing Ideas ( create red node )
 * (4) Piggyback off these Ideas ( create node )
 * (5) Print to console
 */






    render() {


        return (

            <React.Fragment>


                {this.state.showCard ?
                    <Card>{this.state.cardContent}</Card>
                    : null}

                <Grid container direction="row">


                    <Grid item sm={this.state.mapGridSize}>

                        <Card>

                            <CytoscapeComponent

                                // initialize the diagram with data 
                                elements={CytoscapeComponent.normalizeElements({
                                    nodes: this.props.nodeDataArray,
                                    edges: this.props.linkDataArray
                                })}

                                // style 
                                style={{
                                    width: '100%',
                                    height: '400px',
                                    backgroundColor: 'yellow',
                                    borderWidth: '3px',
                                    boxShadow: '1px 1px 5px #555 inset'
                                }}


                                stylesheet={cytoscapeStylesArray}
                                // use extensions by accessing the core object using the cy prop 
                                cy={cy => {

                                    this.myCyRef = cy;

                                    // cy.cxtmenu(this.state.ctxMenuConfiguration);

                                    // cy.layout(options);


                                    // Pan the graph to the centre of a collection. If no collection is 
                                    // specified, then the graph is centred on all nodes and edges in the graph.
                                    // cy.centre( /* Center of graph */);

                                    // tap (click) callback function. I am using cy.one() instead of cy.on() because 
                                    // cy.on() doubles the number of calls to the handler such that on the 5th click 
                                    // on *any* node, the handler would be called 16 times, 32 on the 6th, and so forth. 
                                    // Using cy.one seems to solve the issue. 
                                    // cy.one('tap', 'node', (event) => {

                                    //     const elem = cy.$id(event.target.id());

                                    //     console.log(elem._private.data.text);

                                    //     cy.center(elem);

                                    //     this.nodeClickedHandler(elem._private.data.text);

                                    // });

                                }
                                }

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