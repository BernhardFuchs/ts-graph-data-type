import { Graph } from "./graph";
import { GraphEntities } from "./graph.entities";
import Node = GraphEntities.Node;
import { nodeFactory } from "./graph.spec.helper";

describe("Graph tests", () => {
  test("should create a non directed graph by default", () => {
    const graph: Graph<number> = new Graph();
    graph.addNode(nodeFactory(1));
    graph.addNode(nodeFactory(2));
    graph.addEdge(1, 2);
    expect(graph.findNode(1).children).toContain(graph.findNode(2));
    expect(graph.findNode(2).children).toContain(graph.findNode(1));
  });

  test("should create a correct directed graph", () => {
    const graph: Graph<number> = new Graph(true);
    graph.addNode(nodeFactory(1));
    graph.addNode(nodeFactory(2));
    graph.addEdge(1, 2);
    expect(graph.findNode(1).children).toContain(graph.findNode(2));
    expect(graph.findNode(2).children).toHaveLength(0);
  });

  test("should create graph with complex data type", () => {
    type NodeWithData<T> = Node<T> & {
      accountNumber: number;
      transactions: Array<string>;
    };
    const complexNode1: NodeWithData<number> = {
      key: 0,
      children: [],
      accountNumber: 123,
      transactions: ["trx1", "trx2"]
    };
    const complexNode2: NodeWithData<number> = {
      key: 1,
      children: [],
      accountNumber: 456,
      transactions: ["trx3", "trx4"]
    };

    const graph = new Graph<number>();
    graph.addNode(complexNode1);
    graph.addNode(complexNode2);
    graph.addEdge(complexNode1.key, complexNode2.key);

    expect(graph.nodes.length).toBe(2);
    expect(graph.edges.length).toBe(1);
    expect(graph.findNode(complexNode1.key)).toBe(complexNode1);
    expect(graph.findNode(complexNode2.key)).toBe(complexNode2);
    const foundNode1 = <NodeWithData<number>>graph.findNode(complexNode1.key);
    expect(foundNode1.accountNumber).toBe(complexNode1.accountNumber);
    expect(foundNode1.transactions).toBe(complexNode1.transactions);
    const foundNode2 = <NodeWithData<number>>graph.findNode(complexNode2.key);
    expect(foundNode2.accountNumber).toBe(complexNode2.accountNumber);
    expect(foundNode2.transactions).toBe(complexNode2.transactions);
  });
});
