import React, { useState, useEffect ,useRef , useCallback} from "react";
import _ from "lodash";

import Node from "./Node/Node";

import "./NavigateBot.css";

import { dijkstra, getNodesInShortestPathOrder } from "../algorithms/dijkstras";

const START_NODE_ROW = 5;
const START_NODE_COL = 5;
const FINISH_NODE_ROW = 8;
const FINISH_NODE_COL = 22;
const TOTAL_ROWS = 25;
const TOTAL_COLS = 40;

const NavigateBot = () => {
  const [nodeGrid, setNodeGrid] = useState({
    grid: []              
  });

  const mouseIsPressed=useRef(false);

  useEffect(() => {                             //varInUseEffect=null --> []
    const grid1 = getInitialGrid();
    setNodeGrid({ ...nodeGrid, grid: grid1 });
    window.addEventListener("mouseup",()=>{mouseIsPressed.current=false});
  }, []);

  const handleMouseDown=useCallback((event,row,col)=>{
       setNodeGrid((prevGrid)=>({
         grid: getNewGridwithWallToggled(prevGrid.grid,row,col)
       }));
        mouseIsPressed.current=true;
        event.preventDefault();

  },[]);
  const handleMouseEnter=useCallback((row,col)=>{
      if(mouseIsPressed.current===true){   // dragging
               setNodeGrid((prevGrid)=>({
                 ...prevGrid,
                  grid:getNewGridwithWallToggled(prevGrid.grid,row,col)
               }));
      }
  },[]);
  const handleMouseUp = useCallback(() => {
    mouseIsPressed.current = false;
  }, []);

  const animateDijkstra = (visitedNodesInOrder, nodesInShortestPathOrder) => {       
    for (let i = 0; i <= visitedNodesInOrder.length; i++) {
        if(i===visitedNodesInOrder.length){
          setTimeout(()=>{
               animatedShortestPath(nodesInShortestPathOrder);  
          },10);
          return;
        }
      setTimeout(() => {
        const node = visitedNodesInOrder[i];
        setNodeGrid((prevNodeGrid) => ({
          ...prevNodeGrid,
          grid: getNewGridWithVisited(prevNodeGrid.grid, node.row, node.col) // calls render
        }));
      }, 10 );
    }
  };

  const animatedShortestPath=(nodesInShortestPathOrder)=>{
     for(let i=0;i<nodesInShortestPathOrder.length;i++){
       setTimeout(() => {
        const node=nodesInShortestPathOrder[i];
          document.getElementById(`node-${node.row}-${node.col}`).className="node shortest-path";
       }, i*100);
     }
  };

  const visualizeDijkstra = () => {
    const grid = _.cloneDeep(nodeGrid.grid);
    // console.log(grid);
    const startNode = grid[START_NODE_ROW][START_NODE_COL];
    const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
    const visitedNodesInOrder = dijkstra(grid, startNode, finishNode);
    const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
    animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder);   
  };
  return (
    <div className="pfv">
      <button onClick={visualizeDijkstra} className="button-bot">
        Visualize Dijkstra´s Algorithm
      </button>
      <div className="grid-bot">
      { console.log(nodeGrid.grid) }
        {nodeGrid.grid.map((row, rowIdx) => {
          return (
            <div className="row-bot"  key={rowIdx}>
              {row.map((node, nodeIdx) => {
                const {row,col,isStart,isWall ,isFinish,isVisited } = node;
                return (
                  <Node
                    onMouseDown={handleMouseDown}
                    onMouseEnter={handleMouseEnter}
                    onMouseUp={handleMouseUp}
                    isWall={isWall}
                    row={row}
                    col={col}
                    key={nodeIdx}
                    isStart={isStart}
                    isFinish={isFinish}
                    isVisited={isVisited}
                  />
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default NavigateBot;

const getInitialGrid = () => {
  const grid = [];
  for (let row = 0; row < TOTAL_ROWS; row++) {
    const currentRow = [];
    for (let col = 0; col < TOTAL_COLS; col++) {
      currentRow.push(createNode(col, row));
    }
    grid.push(currentRow);
  }
  return grid;
};

const createNode = (col, row) => {
  return {
    col,
    row,
    isStart: row === START_NODE_ROW && col === START_NODE_COL,
    isFinish: row === FINISH_NODE_ROW && col === FINISH_NODE_COL,
    distance: Infinity,
    isVisited: false,
    isWall: false,
    previousNode: null
  };
};
const getNewGridWithVisited = (grid, row, col) => {
  // const newGrid = grid.slice();  
  const newGrid = [...grid];  
  const node1 = newGrid[row][col];
  const newNode = {
    ...node1,
    isVisited: true
  };
  newGrid[row][col] = newNode;
  return newGrid;
};

const getNewGridwithWallToggled=(grid,row,col)=>{
  const newGrid = [...grid];  
  const node1 = newGrid[row][col];
  const newNode = {
    ...node1,
    isWall: true  
  };
  newGrid[row][col]=newNode;
  return newGrid;
};
