

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
export const eleStyles = [
    {
        selector: 'node',
        style: {
            width: 120,
            height: 120,
            shape: 'round-hexagon',
            backgroundColor: 'grey',
            borderWidth: 3,
            backgroundFit: 'cover',
            backgroundImage: 'text.png',

            'text-wrap': 'wrap',
            "text-max-width": 300,

            "border-color": "blue",
            'label': 'data(label)',
            'text-halign': "center",
            'text-valign': 'bottom',
            "text-border-color": 'blue',
            "text-border-width": 3,
            "text-margin-y": 10,
            "text-transform": "uppercase",
            "text-outline-color" : "white",
            "text-outline-width" : 10,
            "text-outline-opacity" : 0.6,
            "text-events": "yes"

        }
    },

    {
        selector: 'edge',
        style: {
            width: 5,
            "curve-style": 'unbundled-bezier',
            "target-arrow-shape": 'circle',
            "mid-target-arrow-shape": 'triangle',
            'line-color': 'blue',
            'source-endpoint': 'outside-to-node-or-label',
            'target-endpoint': 'outside-to-node-or-label'
        }
    },
]

export const cyStyle = {
    width: '100%',
    height: '800px',
    backgroundColor: 'yellow',
    borderWidth: '3px',
}

 