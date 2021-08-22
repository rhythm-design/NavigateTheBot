import React from "react";
import "./Specifications.css";

function Specifications(){
    return(
        <div className="spec-bg-color">
       <div className="node-block alig"> <div className="node node-start-spec"></div><h4 className="node-block">Start Node</h4></div>
       <div className="node-block alig"> <div className="node node-finish-spec"></div><h4 className="node-block">Finish Node</h4></div>
       <div className="node-block alig"> <div className="node node-wall-spec"></div><h4 className="node-block">Walls[click on the node and drag and drop to make walls]</h4></div>
       <div className="node-block alig"> <div className="node node-shortest-path-spec"></div><h4 className="node-block">Shortest Path</h4></div>
    </div>
    );
}
export default Specifications;