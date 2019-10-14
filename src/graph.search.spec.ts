import { GraphEntities } from "./graph.entities";
import Node = GraphEntities.Node;
import { circularGraph } from "./graph.spec.helper";
import { search } from "./graph.search";

describe("Graph search non directed graph", () => {
  const nonDirectedGraph = circularGraph(false);

  test("should return correct nodes for infinite depth", () => {
    const startingNode: number = 0;
    const network: Node<number>[] = search(
      nonDirectedGraph,
      startingNode
    );

    expect(network).toContain(nonDirectedGraph.findNode(startingNode));
    expect(network).toContain(nonDirectedGraph.findNode(startingNode + 1));
    expect(network).toContain(nonDirectedGraph.findNode(startingNode + 2));
    expect(network).toContain(nonDirectedGraph.findNode(startingNode + 3));
    expect(network).toContain(nonDirectedGraph.findNode(startingNode + 4));
    expect(network).toContain(nonDirectedGraph.findNode(startingNode + 5));
    expect(network).toContain(nonDirectedGraph.findNode(startingNode + 6));
    expect(network).toHaveLength(7);
  });

  test("should return correct nodes for level 2 search", () => {
    const startingNode: number = 0;
    const level: number = 2;
    const network: Node<number>[] = search(
      nonDirectedGraph,
      startingNode,
      { level: level }
    );

    expect(network).toContain(nonDirectedGraph.findNode(startingNode));
    expect(network).toContain(nonDirectedGraph.findNode(startingNode + 1));
    expect(network).toContain(nonDirectedGraph.findNode(startingNode + 2));
    expect(network).toContain(nonDirectedGraph.findNode(startingNode + 3));
    expect(network).toContain(nonDirectedGraph.findNode(startingNode + 4));
    expect(network).toContain(nonDirectedGraph.findNode(startingNode + 5));
    expect(network).toHaveLength(6);
  });

  test("should return correct nodes for 1 depth", () => {
    const startingNode: number = 0;
    const level: number = 1;
    const network: Node<number>[] = search(
      nonDirectedGraph,
      startingNode,
      { level: level }
    );

    expect(network).toContain(nonDirectedGraph.findNode(startingNode));
    expect(network).toContain(nonDirectedGraph.findNode(startingNode + 1));
    expect(network).toContain(nonDirectedGraph.findNode(startingNode + 3));
    expect(network).toContain(nonDirectedGraph.findNode(startingNode + 4));
    expect(network).toHaveLength(4);
  });

  test("should return correct nodes for 0 depth", () => {
    const startingNode: number = 0;
    const level: number = 0;
    const network: Node<number>[] = search(
      nonDirectedGraph,
      startingNode,
      { level: level }
    );

    expect(network).toContain(nonDirectedGraph.findNode(startingNode));
    expect(network).toHaveLength(1);
  });

  test("should return correct nodes for negative depth", () => {
    const startingNode: number = 0;
    const level: number = -1;
    const network: Node<number>[] = search(
      nonDirectedGraph,
      startingNode,
      { level: level }
    );

    expect(network).toContain(nonDirectedGraph.findNode(startingNode));
    expect(network).toHaveLength(1);
  });
});

describe("Graph search directed graph", () => {
  const directedGraph = circularGraph(true);

  test("should return correct nodes for infinite depth", () => {
    const startingNode: number = 0;
    const network: Node<number>[] = search(
      directedGraph,
      startingNode
    );

    expect(network).toContain(directedGraph.findNode(startingNode));
    expect(network).toContain(directedGraph.findNode(startingNode + 1));
    expect(network).toContain(directedGraph.findNode(startingNode + 2));
    expect(network).toContain(directedGraph.findNode(startingNode + 3));
    expect(network).toContain(directedGraph.findNode(startingNode + 4));
    expect(network).toContain(directedGraph.findNode(startingNode + 5));
    expect(network).toContain(directedGraph.findNode(startingNode + 6));
    expect(network).toHaveLength(7);
  });

  test("should return correct nodes for level 2 search", () => {
    const startingNode: number = 0;
    const level: number = 2;
    const network: Node<number>[] = search(
      directedGraph,
      startingNode,
      { level: level }
    );

    expect(network).toContain(directedGraph.findNode(startingNode));
    expect(network).toContain(directedGraph.findNode(startingNode + 1));
    expect(network).toContain(directedGraph.findNode(startingNode + 2));
    expect(network).toContain(directedGraph.findNode(startingNode + 3));
    expect(network).toContain(directedGraph.findNode(startingNode + 4));
    expect(network).toContain(directedGraph.findNode(startingNode + 5));
    expect(network).toHaveLength(6);
  });

  test("should return correct nodes for 1 depth", () => {
    const startingNode: number = 0;
    const level: number = 1;
    const network: Node<number>[] = search(
      directedGraph,
      startingNode,
      { level: level }
    );

    expect(network).toContain(directedGraph.findNode(startingNode));
    expect(network).toContain(directedGraph.findNode(startingNode + 1));
    expect(network).toContain(directedGraph.findNode(startingNode + 3));
    expect(network).toContain(directedGraph.findNode(startingNode + 4));
    expect(network).toHaveLength(4);
  });

  test("should return correct nodes for 0 depth", () => {
    const startingNode: number = 0;
    const level: number = 0;
    const network: Node<number>[] = search(
      directedGraph,
      startingNode,
      { level: level }
    );

    expect(network).toContain(directedGraph.findNode(startingNode));
    expect(network).toHaveLength(1);
  });

  test("should return correct nodes for negative depth", () => {
    const startingNode: number = 0;
    const level: number = -1;
    const network: Node<number>[] = search(
      directedGraph,
      startingNode,
      { level: level }
    );

    expect(network).toContain(directedGraph.findNode(startingNode));
    expect(network).toHaveLength(1);
  });
});