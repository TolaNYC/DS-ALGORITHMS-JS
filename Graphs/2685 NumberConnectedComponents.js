/*
You are given an integer n. There is an undirected graph with n vertices, numbered from 0 to n - 1. You are given a 2D integer array edges where edges[i] = [ai, bi] denotes that there exists an undirected edge connecting vertices ai and bi.

Return the number of complete connected components of the graph.

A connected component is a subgraph of a graph in which there exists a path between any two vertices, and no vertex of the subgraph shares an edge with a vertex outside of the subgraph.

A connected component is said to be complete if there exists an edge between every pair of its vertices.



Example 1:



Input: n = 6, edges = [[0,1],[0,2],[1,2],[3,4]]
Output: 3
Explanation: From the picture above, one can see that all of the components of this graph are complete.
Example 2:



Input: n = 6, edges = [[0,1],[0,2],[1,2],[3,4],[3,5]]
Output: 1
Explanation: The component containing vertices 0, 1, and 2 is complete since there is an edge between every pair of two vertices. On the other hand, the component containing vertices 3, 4, and 5 is not complete since there is no edge between vertices 4 and 5. Thus, the number of complete components in this graph is 1.


Constraints:

1 <= n <= 50
0 <= edges.length <= n * (n - 1) / 2
edges[i].length == 2
0 <= ai, bi <= n - 1
ai != bi
There are no repeated edges.


// UPA 
n - total nr of vertices
edges = edges array of all the edges connectin vertices 
connected component: is a subgraph where there is a path between any vertices

// EXE

 n = 6, edges = [[0,1],[0,2],[1,2],[3,4],[3,5]]

// AL

@param nrComponents  the nr of the conectec components 

* create a vriable called nrComponents
* build an empty adjecency list 
* add edges on the adjecency list 
* create a empty array called visited
* Iterate through the vertices 
* if unvisited do a dfs on its neighbours 
* increase nrComponents every time the dfs returns 

*/
let n = 6;
let edges = [[0,1],[0,2],[1,2],[3,4],[3,5]];

function nrConnectedComponents(n,edges){

  // Build the graph
  let graph = new Map();
  for (let i = 0; i < n; i++) {
      graph.set(i, []);
  }

  // Add edges
  for (const [a, b] of edges) {
      graph.get(a).push(b);
      graph.get(b).push(a);
  }

  // Track visited nodes and components
  let seen = new Array(n).fill(false);
  let completeCount = 0;

  // DFS to find connected components
  let dfs = start => {
      let component = [];
      let stack = [start];
      seen[start] = true;

      while (stack.length) {
          let node = stack.pop();
          component.push(node);

          for (const neighbor of graph.get(node)) {
              if (!seen[neighbor]) {
                  seen[neighbor] = true;
                  stack.push(neighbor);
              }
          }
      }

      // Check if component is complete
      let size = component.length;
      for (const node of component) {
          if (graph.get(node).length !== size - 1) {
              return false; // Not complete
          }
      }
      return true; // Complete
  }

  // Process each node
  for (let i = 0; i < n; i++) {
      if (!seen[i]) {
          if (dfs(i)) {
              completeCount++;
          }
      }
  }

  return completeCount;
}



console.log(nrConnectedComponents(n,edges));
