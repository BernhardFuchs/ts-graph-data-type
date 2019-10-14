import { GraphEntities } from "./graph.entities";
import Node = GraphEntities.Node;
import { Graph } from "./graph";
import { Queue } from "devfox-ts-adt-queue";

export const enum Algorithm {
  BREADTH_FIRST,
  DEEPEST_FIRST
}
export interface SearchOptions {
  readonly algorithm?: Algorithm | undefined;
  readonly level?: number | undefined;
}
const defaultOptions: SearchOptions = {
  algorithm: Algorithm.BREADTH_FIRST,
  level: null
};

const isDefaultAlgorithm = (searchOptions: SearchOptions) =>
  searchOptions.algorithm === defaultOptions.algorithm;
const isInfiniteSearch = (searchOptions: SearchOptions) =>
  searchOptions.level === null;
const isSearchLevelValid = (searchOptions: SearchOptions) =>
  searchOptions.level <= 0;
const isQueueEmpty = <T>(_q: Queue<Node<T>>) => _q.size === 0;
const increaseDepth = (nodesTillDepthIncrease: number) =>
  nodesTillDepthIncrease === 0;

const endSearch = <T>(graph: Graph<T>, visited: Map<T, boolean>) =>
  graph.nodes.filter(node => visited.get(node.key));

export const search = <T>(
  graph: Graph<T>,
  startingNodeKey: T,
  searchOptions?: SearchOptions
): Node<T>[] => {
  const _searchOptions = searchOptions || defaultOptions;
  const _startingNode: Node<T> = graph.findNode(startingNodeKey);

  if (!isInfiniteSearch(_searchOptions) && isSearchLevelValid(_searchOptions)) {
    return [_startingNode];
  }

  if (!isDefaultAlgorithm(_searchOptions)) {
    console.log("At the moment only Breadth First Algorithm available.");
  }

  const _visited: Map<T, boolean> = new Map();
  graph.nodes.map(node => _visited.set(node.key, false));

  const _q = new Queue<Node<T>>();
  _q.push(_startingNode);

  let currentDepth = 0,
    nodesTillDepthIncrease = 1,
    nodeChildren = 0;

  while (!isQueueEmpty(_q)) {
    const currentNode = _q.pop();
    _visited.set(currentNode.key, true);
    nodeChildren = currentNode.children.length;

    currentNode.children.map(childNode => {
      if (_visited.get(childNode.key) === false) {
        _q.push(childNode);
        _visited.set(childNode.key, true);
      }
    });

    if (
      !isInfiniteSearch(_searchOptions) &&
      increaseDepth(--nodesTillDepthIncrease)
    ) {
      if (++currentDepth === _searchOptions.level) {
        return endSearch(graph, _visited);
      }
      nodesTillDepthIncrease = nodeChildren;
      nodeChildren = 0;
    }
  }
  return endSearch(graph, _visited);
};
