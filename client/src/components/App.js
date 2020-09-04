import React from "react";
import DraftDeck from "../components/containers/DraftDeck/DraftDeck";
import Layout from "../components/containers/Layout/Layout";


// The app container returns the draft-space (user input area),
// wrapped in the high-order Layout Component. 

const App = () => {

    return (

        <Layout>
            <DraftDeck/>       
        </Layout>

    )

}

export default App; 
