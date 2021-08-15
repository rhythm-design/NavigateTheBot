import React from "react";
import "./Node.css";
const Node = React.memo(   
  ({ col, isFinish, isStart, isWall, row, isVisited,onMouseDown,onMouseEnter,onMouseUp }) => {
    const extraClassName = isFinish
      ? "node-finish"
      : isStart
      ? "node-start"
      : isWall
      ? "node-wall"
      : isVisited
      ? "node-visited"
      : "";

    return (
      <div id={`node-${row}-${col}`} className={`node ${extraClassName}`}
       onMouseDown={e => onMouseDown(e, row, col)}
      onMouseEnter={() => onMouseEnter(row, col)}
      onMouseUp={() => onMouseUp()}
      ></div>
     
    );
  }
);

export default Node;
