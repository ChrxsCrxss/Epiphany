import React, { Component } from "react";
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import Panel from "../../components/UI/Panel/Panel";
import ArgumentGraph from './ArgumentGraph/ArgumentGraph';
import axios from "axios";
import withErrorHandler from '../../components/hoc/withErrorHandler'

const instance = axios.create();


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

        updateNode: () => { throw Error('callback undefined'); },
        deleteNode: () => { throw Error('callback undefined'); },
    }



    async componentDidMount() {

        console.log('fetching data');

        // Make an async request to the backend using this method 
        const response = await instance.post(`http://localhost:5000/userData`, {
            request : 'hello'
        });

        alert(response);
    }


    setNodeCallbacks = (type, func) => {

        if (type === 'updateNode') {
            this.setState({ updateNode: func });
        } else if (type === 'deleteNode') {
            this.setState({ deleteNode: func });
        } else {
            throw Error('unknown callback type ');
        }


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
        this.setState({
            panelContent: null,
            mapGridSize: 12,
            showPanel: false
        });
    }

    render() {


        return (

            <React.Fragment>
                <Grid container direction="row">
                    <Grid item sm={this.state.mapGridSize}>

                        <Card>
                            <ArgumentGraph
                                nodeClickedHandler={this.nodeClickedHandler}
                                setNodeCallbacks={this.setNodeCallbacks}
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
                                onEditUpdate={this.state.updateNode}
                                onDelete={this.state.deleteNode}
                            />
                        </Grid>
                        : null
                    }

                </Grid>
            </React.Fragment>
        )
    }
}


export default withErrorHandler(Diagram, instance); 