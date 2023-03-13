import React from "react";
import "./NodeDiff.css";

function NodeDiff(){
    return(
        <div className="node-diff">
            <h5 id="algo-data">Nodes visited by Dijkstra: <div id="algo-div"><h5 id="algo-data-dijkstra">0</h5></div></h5>
            <h5 id="algo-data">Nodes visited by Astar:<div id="algo-div"> <h5 id="algo-data-astar">0</h5></div></h5>
            <h5 id="algo-data">Nodes Difference:<div id="algo-div"> <h5 id="algo-data-diff">0</h5></div></h5>
    </div>
    );
}
export default NodeDiff;