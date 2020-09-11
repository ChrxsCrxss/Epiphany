

/**
 * The style prop of the CytoscapeComponent takes an array
 * as an argument. CytoscapeStylesArray is an array of objects,
 * each of which applies styling to elements of the cytoscape
 * model. It is basically used like a css modeule. A better way
 * to do this might be to seperate the selector and the style
 * declaration and save the style in a css module, i.e, 
 * selector: 'node'
 * style: { classes.Node }
 */
const CytoscapeStylesArray = [
    {
        selector: 'node',
        style: {
            width: 80,
            height: 80,
            shape: 'round-hexagon',
            backgroundColor: 'white',
            borderWidth: 3,

            'text-wrap': 'wrap',
            "text-max-width": 80,

            "border-color": "blue",
            'label': 'data(label)',
            'text-halign': "center",
            'text-valign': 'center',
            "text-border-color": 'blue',
            "text-border-width": 3

        }
    },

    {
        selector: 'edge',
        style: {
            width: 5,
            "curve-style": 'straight',
            "target-arrow-shape": 'circle',
            "mid-target-arrow-shape": 'triangle',
            'line-color': 'blue'
        }
    },
]

export default CytoscapeStylesArray; 