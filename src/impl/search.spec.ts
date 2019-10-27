import { Entities } from "./entities";
import Node = Entities.Node;
import { circularGraph } from "./graph.spec";
import { getDescendants } from "./search";
import { Direction } from './graph';

describe("Graph search non directed graph", () => {
  const nonDirectedGraph = circularGraph();

  test("should return correct nodes for infinite depth", () => {
    const startingNode: number = 0;
    const network: Node<number>[] = getDescendants(
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
    const network: Node<number>[] = getDescendants(
      nonDirectedGraph,
      startingNode,
      {
        level: level
      }
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
    const network: Node<number>[] = getDescendants(
      nonDirectedGraph,
      startingNode,
      {
        level: level
      }
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
    const network: Node<number>[] = getDescendants(
      nonDirectedGraph,
      startingNode,
      {
        level: level
      }
    );

    expect(network).toContain(nonDirectedGraph.findNode(startingNode));
    expect(network).toHaveLength(1);
  });

  test("should return correct nodes for negative depth", () => {
    const startingNode: number = 0;
    const level: number = -1;
    const network: Node<number>[] = getDescendants(
      nonDirectedGraph,
      startingNode,
      {
        level: level
      }
    );

    expect(network).toContain(nonDirectedGraph.findNode(startingNode));
    expect(network).toHaveLength(1);
  });

  test("should return correct nodes for null depth", () => {
    const startingNode: number = 0;
    const level: number = null;
    const network: Node<number>[] = getDescendants(
      nonDirectedGraph,
      startingNode,
      {
        level: level
      }
    );

    expect(network).toContain(nonDirectedGraph.findNode(startingNode));
    expect(network).toHaveLength(1);
  });
});

describe("Graph search directed graph", () => {
  const directedGraph = circularGraph(Direction.DIRECTED);

  test("should return correct nodes for infinite depth", () => {
    const startingNode: number = 0;
    const network: Node<number>[] = getDescendants(directedGraph, startingNode);

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
    const network: Node<number>[] = getDescendants(
      directedGraph,
      startingNode,
      {
        level: level
      }
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
    const network: Node<number>[] = getDescendants(
      directedGraph,
      startingNode,
      {
        level: level
      }
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
    const network: Node<number>[] = getDescendants(
      directedGraph,
      startingNode,
      {
        level: level
      }
    );

    expect(network).toContain(directedGraph.findNode(startingNode));
    expect(network).toHaveLength(1);
  });

  test("should return correct nodes for negative depth", () => {
    const startingNode: number = 0;
    const level: number = -1;
    const network: Node<number>[] = getDescendants(
      directedGraph,
      startingNode,
      {
        level: level
      }
    );

    expect(network).toContain(directedGraph.findNode(startingNode));
    expect(network).toHaveLength(1);
  });

  test("should return correct nodes for null depth", () => {
    const startingNode: number = 0;
    const level: number = null;
    const network: Node<number>[] = getDescendants(
      directedGraph,
      startingNode,
      {
        level: level
      }
    );

    expect(network).toContain(directedGraph.findNode(startingNode));
    expect(network).toHaveLength(1);
  });
});
