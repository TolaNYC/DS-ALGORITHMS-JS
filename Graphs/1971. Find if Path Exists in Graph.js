/*
1971. Find if Path Exists in Graph
There is a bi-directional graph with n vertices, where each vertex is labeled from 0 to n - 1 (inclusive). The edges in the graph are represented as a 2D integer array edges, where each edges[i] = [ui, vi] denotes a bi-directional edge between vertex ui and vertex vi. Every vertex pair is connected by at most one edge, and no vertex has an edge to itself.

You want to determine if there is a valid path that exists from vertex source to vertex destination.

Given edges and the integers n, source, and destination, return true if there is a valid path from source to destination, or false otherwise.



Example 1:


Input: n = 3, edges = [[0,1],[1,2],[2,0]], source = 0, destination = 2
Output: true
Explanation: There are two paths from vertex 0 to vertex 2:
- 0 → 1 → 2
- 0 → 2
Example 2:


Input: n = 6, edges = [[0,1],[0,2],[3,5],[5,4],[4,3]], source = 0, destination = 5
Output: false
Explanation: There is no path from vertex 0 to vertex 5.


Constraints:

1 <= n <= 2 * 105
0 <= edges.length <= 2 * 105
edges[i].length == 2
0 <= ui, vi <= n - 1
ui != vi
0 <= source, destination <= n - 1
There are no duplicate edges.
There are no self edges.


// UPA 
* no cycles
* bidirectional 
* gien v0 as the starting vertex and vd as the vertex destination

// EXE 


// ALG

Graph Representation:

Construct an adjacency list representation of the graph using the given edges. This representation allows efficient traversal of nodes and their neighbors.
Depth-First Search (DFS) Function:

Implement a recursive DFS function (dfs) to traverse the graph starting from the source node.
Use a visited set to keep track of nodes that have been visited during the traversal to avoid revisiting and potential infinite loops (cycles).
Base case: If the current node being visited is the destination, return True as a path has been found.
Recursive case: For each neighbor of the current node, if it has not been visited yet, recursively call dfs on that neighbor.
If any recursive call returns True, propagate True back up through the call stack indicating that a path to the destination has been found.
If the DFS traversal completes without finding a path to the destination, return False.
Execution:

Invoke the dfs function starting from the source node and return the result.

// 






*/


let edges = [[0,1],[1,2],[2,0]];
let n = 3;
let source = 0; 
let destination = 2;



function pathExistsInGraph(n, edges, source, destination){

   // --- Base Case ---
      if (source === destination) {
          return true;
      }

      // --- Step 1: Build Adjacency List, make an empty array of arrays
  const adjacencyList = [];
  for (let i = 0; i < n; i++) {
      adjacencyList.push([]); 
  }
   // another way:  const adjacencyList = Array(n).fill(null).map(() => []);

  // push the edges on the adjecency list 
      for (const [u, v] of edges) {
          adjacencyList[u].push(v);
          adjacencyList[v].push(u); // Bi-directional graph
      }


  
      // --- Step 2: Initialize Visited Set ---
      const visited = new Set();

  
      const dfs = (currentVertex) => {
          // Mark Current Vertex as Visited
          visited.add(currentVertex);

          // Goal Check
          if (currentVertex === destination) {
              return true;
          }

          // Explore Neighbors Recursively
          const neighbors = adjacencyList[currentVertex];
          for (const neighbor of neighbors) {
              if (!visited.has(neighbor)) {
                  // If the recursive call finds the destination, propagate 'true' back up.
                  if (dfs(neighbor)) { // No need to pass adjacencyList, visited, destination explicitly
                      return true;     // as they are available in the outer scope.
                  }
              }
          }

          return false;
      };

  
      return dfs(source);
  }


  

console.log(pathExistsInGraph(n, edges, source, destination));

