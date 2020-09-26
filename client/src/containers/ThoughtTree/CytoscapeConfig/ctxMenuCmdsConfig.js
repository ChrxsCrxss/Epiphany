import { v4 as uuidv4 } from 'uuid';


const ctxMenuCmdsConfig = (callbacks) => {

       /**
     * Here we define the commands that we pass to the cxtmenu. There is alot of repeated
     * code here. It would be better to  
     */

    const OpenInPanel = {
        // example command
        fillColor: 'rgba(100, 100, 100, 0.75)', // optional: custom background color for item
        content: 'Open in Panel', // html/text content to be displayed in the menu
        contentStyle: {}, // css key:value pairs to set the command's css in js if you want
        select: (ele) => { // a function to execute when the command is selected
            console.log('clicked open panel in ctxmenu');
            callbacks.openInPanelCallback(ele._private.data.text, ele);
        },
        enabled: true // whether the command is selectable
    }

    const AddSupportNode = {

        // example command
        fillColor: 'rgba(20, 200, 40, 0.75)', // optional: custom background color for item
        content: 'Defend', // html/text content to be displayed in the menu
        contentStyle: {}, // css key:value pairs to set the command's css in js if you want
        select: (ele) => { // a function to execute when the command is selected
            console.log('clicked add supporting ideas in ctxmenu');
            callbacks.defendCallback({
                creationMethod: 'dynamic',
                targetEleID: ele.id(),
                edgeType: 'support',
                argumentData: {
                    id: uuidv4(),
                    type: 'pro_arguments',
                    title: 'new node title',
                    content: 'new node content',
                    degree: ele._private.data.degree + 1
                }
            });
        },
        enabled: true // whether the command is selectable
    }


    const AddOpposeNode = {

        // example command
        fillColor: 'rgba(200, 20, 20, 0.75)', // optional: custom background color for item
        content: 'Attack', // html/text content to be displayed in the menu
        contentStyle: {}, // css key:value pairs to set the command's css in js if you want
        select: (ele) => { // a function to execute when the command is selected
            console.log('clicked add supporting ideas in ctxmenu');
            callbacks.attackCallback({
                creationMethod: 'dynamic',
                targetEleID: ele.id(),
                edgeType: 'oppose',
                argumentData: {
                    id: uuidv4(),
                    type: 'con_arguments',
                    title: 'new node title',
                    content: 'new node content',
                    degree: ele._private.data.degree + 1
                }
            });
        },
        enabled: true // whether the command is selectable
    }

    const DesignateAsThesis = {

        // example command
        fillColor: 'rgba(200, 200, 0, 0.75)', // optional: custom background color for item
        content: 'Make Thesis', // html/text content to be displayed in the menu
        contentStyle: {}, // css key:value pairs to set the command's css in js if you want
        select: (ele) => { // a function to execute when the command is selected
            console.log('clicked designate as thesis in ctxmenu');
            callbacks.makeThesisCallback(ele);
        },
        enabled: true // whether the command is selectable
    }

    return [DesignateAsThesis, OpenInPanel, AddSupportNode, AddOpposeNode];

}

export default ctxMenuCmdsConfig; 