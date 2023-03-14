import React, { useState, useEffect ,useRef , useCallback} from "react";
import _ from "lodash";

import Node from "./Node/Node";
import NavbarReact from "../NavbarReact/NavbarReact";
import Specifications from "../Specifications/Specifications.jsx";
import NodeDiff from "./Node/NodeDiff";
import "./NavigateBot.css";

import { dijkstra, getNodesInShortestPathOrder } from "../algorithms/dijkstras";
import {astar,getNodesInShortestPathOrderAstar} from "../algorithms/astar.js";

let START_NODE_ROW = 5;
let START_NODE_COL = 5;
let FINISH_NODE_ROW = 11;
let FINISH_NODE_COL = 25;
const TOTAL_ROWS = 18;
const TOTAL_COLS = 54;
let animateSpeed=10;
let shortestAnimateSpeed=25;

// const animateSpeed={
//   low:10,
//   medium:20,
//   high:30
// }
function customSpeed(){
  animateSpeed=50;
  console.log(animateSpeed);
  return animateSpeed;
}


const NavigateBot = () => {
  const [nodeGrid, setNodeGrid] = useState({
    grid: []              
  });
  const mouseIsPressed=useRef(false);
  const specialNode=useRef("");

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
        if(row===START_NODE_ROW && col===START_NODE_COL){
          specialNode.current="START NODE";
        }else if(row===FINISH_NODE_ROW && col===FINISH_NODE_COL){
          specialNode.current="FINISH NODE";
        }else{
          specialNode.current="WALL NODE";
        }
        event.preventDefault();

  },[]);
  const handleMouseEnter=useCallback((row,col)=>{
    // alert("mouse enter the node at row:" + row +" and col : "+ col);
    if(mouseIsPressed.current===true){ 
      if( specialNode.current==="START NODE"){
        START_NODE_ROW=row;
        START_NODE_COL=col;
        const grid2 = getInitialGrid();
        setNodeGrid({ ...nodeGrid, grid: grid2 });
        document.getElementById("algo-data-astar").innerText=0   
        document.getElementById("algo-data-dijkstra").innerText=0
      }else if(specialNode.current==="FINISH NODE"){
        document.getElementById("algo-data-astar").innerText=0   
        document.getElementById("algo-data-dijkstra").innerText=0
        FINISH_NODE_COL=col;
    FINISH_NODE_ROW=row;
    const grid2 = getInitialGrid();
    setNodeGrid({ ...nodeGrid, grid: grid2 });
      }else{
        setNodeGrid((prevGrid)=>({
            ...prevGrid,
            grid:getNewGridwithWallToggled(prevGrid.grid,row,col)
        }));
      }
    }
},[]);
  const handleMouseUp = useCallback(() => {
    mouseIsPressed.current = false;
  }, []);

  const animateDijkstra = (visitedNodesInOrder, nodesInShortestPathOrder) => {  
    for (let i = 0; i <= visitedNodesInOrder.length; i++) {
        if(i===visitedNodesInOrder.length){  
          setTimeout(()=>{
               animatedShortestPath(nodesInShortestPathOrder,visitedNodesInOrder);  
          },shortestAnimateSpeed);
          return;
        }
      setTimeout(() => {
        const node = visitedNodesInOrder[i];
        document.getElementById("algo-data-dijkstra").innerText=parseInt( document.getElementById("algo-data-dijkstra").innerText)+1
        setNodeGrid((prevNodeGrid) => ({
          ...prevNodeGrid,
          grid: getNewGridWithVisited(prevNodeGrid.grid, node.row, node.col) // calls render
          
        }));
      },10);
    }
  };

  const animatedShortestPath=(nodesInShortestPathOrder,visitedNodesInOrder)=>{
     for(let i=1;i<nodesInShortestPathOrder.length-1;i++){
       setTimeout(() => {
        const node=nodesInShortestPathOrder[i];
          document.getElementById(`node-${node.row}-${node.col}`).className="node node-shortest-path";
       }, i*100);
     }
     document.getElementById("algo-data-dijkstra").innerText=visitedNodesInOrder.length
     const nodesVisitedByDijkstra=document.getElementById("algo-data-dijkstra").innerText
     const nodesVisitedByAstar= document.getElementById("algo-data-astar").innerText
     if( nodesVisitedByDijkstra!=0 && nodesVisitedByAstar!=0){
       document.getElementById("algo-data-diff").innerText= Math.abs(nodesVisitedByDijkstra-nodesVisitedByAstar)
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
   console.debug("dijkstra", visitedNodesInOrder);
  };


  // ---------------------------------------Astar Algo------------------------------------------------

  const animateAstar = (visitedNodesInOrder, nodesInShortestPathOrder) => {  
    for (let i = 0; i <= visitedNodesInOrder.length; i++) {
        if(i===visitedNodesInOrder.length){
          setTimeout(()=>{
               animatedShortestPathAstar(nodesInShortestPathOrder,visitedNodesInOrder);  
          },5);
          return;
        }
      setTimeout(() => {
        document.getElementById("algo-data-astar").innerText=parseInt(document.getElementById("algo-data-astar").innerText)+1
        const node = visitedNodesInOrder[i];
        setNodeGrid((prevNodeGrid) => ({
          ...prevNodeGrid,
          grid: getNewGridWithVisited(prevNodeGrid.grid, node.row, node.col) // calls render
        }));
      },5);
    }
  };

  const animatedShortestPathAstar=(nodesInShortestPathOrder,visitedNodesInOrder)=>{
     for(let i=1;i<nodesInShortestPathOrder.length-1;i++){
       setTimeout(() => {
        const node=nodesInShortestPathOrder[i];
          document.getElementById(`node-${node.row}-${node.col}`).className="node node-shortest-path";
       }, i*100);
     }
     document.getElementById("algo-data-astar").innerText=visitedNodesInOrder.length
    const nodesVisitedByDijkstra=document.getElementById("algo-data-dijkstra").innerText
    const nodesVisitedByAstar= document.getElementById("algo-data-astar").innerText
    if( nodesVisitedByDijkstra!=0 && nodesVisitedByAstar!=0){
      document.getElementById("algo-data-diff").innerText= Math.abs(nodesVisitedByDijkstra-nodesVisitedByAstar)
    }
  };

  const visualizeAstar = () => {
    const grid = _.cloneDeep(nodeGrid.grid);
    const startNode = grid[START_NODE_ROW][START_NODE_COL];
    const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
    const visitedNodesInOrder = astar(grid, startNode, finishNode);
    const nodesInShortestPathOrder = getNodesInShortestPathOrderAstar(finishNode);
    animateAstar(visitedNodesInOrder, nodesInShortestPathOrder);   
    console.debug("astar",visitedNodesInOrder)
  };


  const clearWall=()=>{
    const newGrid = [...nodeGrid.grid];  
    for(let row=0;row<TOTAL_ROWS;row++){
      for(let col=0;col<TOTAL_COLS;col++){
        
        const node1 = newGrid[row][col];
        const newNode = {
          ...node1,
          isWall: false ,
          isVisited: false
        };
        newGrid[row][col]=newNode;
      }
    }
    setNodeGrid((prevNodeGrid) => ({
      ...prevNodeGrid,
      grid: newGrid
    }));
    document.getElementById("algo-data-astar").innerText=0   
    document.getElementById("algo-data-dijkstra").innerText=0
    document.getElementById("algo-data-diff").innerText=0
  
  }
  const clearPath=()=>{
    const newGrid = [...nodeGrid.grid];  
    for(let row=0;row<TOTAL_ROWS;row++){
      for(let col=0;col<TOTAL_COLS;col++){
          const node1 = newGrid[row][col];
        const newNode = {
          ...node1,
          isVisited: false 
        };
        newGrid[row][col]=newNode;
      }
    }
    setNodeGrid((prevNodeGrid) => ({
      ...prevNodeGrid,
      grid: newGrid
    }));  
    if(document.getElementById("algo-data-astar").innerText!=0 && document.getElementById("algo-data-dijkstra").innerText!=0){
      document.getElementById("algo-data-astar").innerText=0   
      document.getElementById("algo-data-dijkstra").innerText=0
      document.getElementById("algo-data-diff").innerText=0
    }
  }

  const clearBoard=()=>{
    const grid1 = getInitialGrid();
    setNodeGrid({ ...nodeGrid, grid: grid1 });
    document.getElementById("algo-data-astar").innerText=0   
    document.getElementById("algo-data-dijkstra").innerText=0
    document.getElementById("algo-data-diff").innerText=0
  };

  //pfv
  return (
    <div>                                                
     <NavbarReact visualizeAstar={visualizeAstar}  visualizeDijkstra={visualizeDijkstra} clearWall={clearWall} clearPath={clearPath} clearBoard={clearBoard} />
     <Specifications/>
     <NodeDiff />
     {/* animateSpeed={customSpeed} shortestAnimateSpeed={shortestAnimateSpeed} */}
      <div className="grid-bot">
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
