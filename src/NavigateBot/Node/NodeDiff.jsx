import React from "react";
import "./NodeDiff.css";

function NodeDiff(){
    return(
        <div className="node-diff">
            <h5 id="algo-data">Nodes visited by Dijkstra:<h5 id="algo-data-dijkstra">0</h5></h5>
            <h5 id="algo-data">Nodes visited by Astar: <h5 id="algo-data-astar">0</h5></h5>
    </div>
    );
}
export default NodeDiff;