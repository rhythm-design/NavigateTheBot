// Performs Dijkstra's algorithm; returns *all* nodes in the order
// in which they were visited. Also makes nodes point back to their
// previous node, effectively allowing us to compute the shortest path
// by backtracking from the finish node.

import _ from "lodash";

export const dijkstra = (gridCopy, startNode, finishNode) => {
  //const gridCopy = _.cloneDeep(grid);
  const visitedNodesInOrder = [];
  startNode.distance = 0;
  const unvisitedNodes = getAllNodes(gridCopy);
  while (!!unvisitedNodes.length) {
    sortNodesByDistance(unvisitedNodes);
    const closestNode = unvisitedNodes.shift();
    // If we encounter a wall, we skip it.
    if (closestNode.isWall) continue;
    // If the closest node is at a distance of infinity,
    // we must be trapped and should therefore stop.
    if (closestNode.distance === Infinity) return visitedNodesInOrder;
    closestNode.isVisited = true;
    visitedNodesInOrder.push(closestNode);
    if (closestNode === finishNode) return visitedNodesInOrder;
    updateUnvisitedNeighbors(closestNode, gridCopy);
  }
};

const sortNodesByDistance = unvisitedNodes => {
  unvisitedNodes.sort((nodeA, nodeB) => nodeA.distance - nodeB.distance);
};

const updateUnvisitedNeighbors = (node, gridCopy) => {
  const unvisitedNeighbors = getUnvisitedNeighbors(node, gridCopy);
  for (const neighbor of unvisitedNeighbors) {
    neighbor.distance = node.distance + 1;
    neighbor.previousNode = node;
  }
};

const getUnvisitedNeighbors = (node, gridCopy) => {
  const neighbors = [];
  const { col, row } = node;
  if (row > 0) neighbors.push(gridCopy[row - 1][col]);
  if (row < gridCopy.length - 1) neighbors.push(gridCopy[row + 1][col]);
  if (col > 0) neighbors.push(gridCopy[row][col - 1]);
  if (col < gridCopy[0].length - 1) neighbors.push(gridCopy[row][col + 1]);
  return neighbors.filter(neighbor => !neighbor.isVisited);
};

const getAllNodes = gridCopy => {
  const nodes = [];
  // console.log(gridCopy);
  for (const row of gridCopy) {
    for (const node of row) {
      nodes.push(node);
    }
  }
  return nodes;
};

// Backtracks from the finishNode to find the shortest path.
// Only works when called *after* the dijkstra method above.
export const getNodesInShortestPathOrder = finishNode => {
  const nodesInShortestPathOrder = [];
  let currentNode = finishNode;
  while (currentNode !== null) {
    nodesInShortestPathOrder.unshift(currentNode);
    currentNode = currentNode.previousNode;
  }
  return nodesInShortestPathOrder;
};
