

/**
 * TODO: we need to bind the this from the ArgumentGraph, so we 
 * can access its state and props. 
 */
export default ArgumentGraphController = () => {

    const loadNodes = () => {

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

        for (let idx = 0; idx < staticArguments.length; ++idx) {

            const argType = staticArguments[idx].type;
            switch (argType) {
                case 'thesis':
                    addNode({
                        creationMethod: 'static',
                        targetEleID: staticArguments[idx].targetArgument || this.state.currentThesisNodeID,
                        edgeType: 'qualify',
                        argumentData: staticArguments[idx]
                    });
                    break;
                case 'qual_arguments':
                    addNode({
                        creationMethod: 'static',
                        targetEleID: staticArguments[idx].targetArgument || this.state.currentThesisNodeID,
                        edgeType: 'qualify',
                        argumentData: staticArguments[idx]
                    });
                    break;
                case 'pro_arguments':
                    addNode({
                        creationMethod: 'static',
                        targetEleID: staticArguments[idx].targetArgument || this.state.currentThesisNodeID,
                        edgeType: 'support',
                        argumentData: staticArguments[idx]
                    });
                    break;
                case 'con_arguments':
                    addNode({
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
    };

    /**
     * 
     * @param {*} nodeInitInfo
     */
    const addNode = (nodeInitInfo) => {

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
            nodeInitInfo = updateStoreAndGetData(nodeInitInfo);
        }

        if (nodeInitInfo.argumentData.targetArgument === null) {
            nodeInitInfo = onSetTargetArgumentAndGetData(nodeInitInfo);
        }

        this.myCyRef.add({
            group: 'nodes',
            data: {
                ...nodeInitInfo.argumentData,
                label: nodeInitInfo.argumentData.title
            },
        });





        let edgeColor = getEdgeColorFromEdgeType(nodeInitInfo.edgeType)

        const newEdgeID = `edge-${uuidv4()}`;

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


        runLayout();
    }




    const deleteNode = (id) => {

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
     * @param {*} id The id associated with the argument node that is being updated
     * @param {string} type The type of argument being updated. Used to traverse the correct array. 
     */
    const updateNode = (id, type) => {

        console.log(type);


        let targetArray = getArgumentArrayByType(type);

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



    const onSetTargetArgumentAndGetData = (nodeInitInfo) => {

        const ele = {
            id: nodeInitInfo.argumentData.id,
            type: nodeInitInfo.argumentData.type
        };

        const updatedArgument = {
            ...nodeInitInfo.argumentData,
            targetArgument: nodeInitInfo.targetEleID

        }

        this.props.onSetTargetArgument(ele, updatedArgument);


        let targetArray = getArgumentArrayByType(nodeInitInfo.argumentData.type);

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

    const runLayout = () => {
        // create new layout
        let layout = this.myCyRef.$().layout(graphLayoutOptions);
        layout.run();
    }

    // Utility functions 
    const updateStoreAndGetData = (nodeInitInfo) => {

        console.log('adding argument to store');
        this.props.onDynamicAddNode(nodeInitInfo.argumentData)

        console.log(nodeInitInfo.argumentData.type);

        let targetArray = getArgumentArrayByType(nodeInitInfo.argumentData.type);


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
    };

    const getEdgeColorFromEdgeType = (edgeType) => {

        switch (edgeType) {
            case 'support': return 'green';
            case 'oppose': return 'red';
            case 'qualify': return 'blue';
            default: return 'gray';
        }

    };

    const getArgumentArrayByType = (type) => {
        switch (type) {
            case 'thesis': return this.props.thesis;
            case 'pro_arguments': return this.props.pro_arguments;
            case 'con_arguments': return this.props.con_arguments;
            case 'qual_arguments': return this.props.qual_arguments;
            default: throw Error("no target array found");
        }
    };


    /**
     * The ArgumentGraphController exposes this interface to allow 
     * the  manipulation of the Cytoscape components. 
     */
    return {
        loadNodes : loadNodes,
        addNode : addNode,
        deleteNode : deleteNode, 
        deleteNode : deleteNode,
        runLayout : runLayout
    }











}