import { Graph } from "./graph";
import { GraphEntities } from "./graph.entities";
import Node = GraphEntities.Node;

export const nodeFactory = <T>(key: T): Node<T> => {
  return { key, children: new Array<Node<T>>() };
};

const graphFactory = (
  numberOfNodes: number,
  isDirected: boolean
): Graph<number> => {
  const graph = new Graph<number>(isDirected);
  for (let i = 0; i < numberOfNodes; i++) {
    const node: Node<number> = nodeFactory(i);
    graph.addNode(node);
  }
  return graph;
};

export const circularGraph = (isDirected: boolean): Graph<number> => {
  const graph = graphFactory(7, isDirected);
  graph.addEdge(0, 1);
  graph.addEdge(0, 3);
  graph.addEdge(0, 4);
  graph.addEdge(1, 2);
  graph.addEdge(1, 3);
  graph.addEdge(2, 6);
  graph.addEdge(3, 5);
  graph.addEdge(4, 5);
  graph.addEdge(5, 6);
  return graph;
};
