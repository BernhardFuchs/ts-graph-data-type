# Graph Abstract Data Type

## Install

```bash
npm install devfox-graph
```

## Usage

### Graph

#### Create a `Graph` with primitive data-type as key

```typescript
import { Graph, Direction } from "devfox-ts-adt-graph";

// Default Graph is a non-directed Graph
const graph: Graph<string> = new Graph();
// If the graph should be directed pass Direction.DIRECTED to the constructor
const graph: Graph<number> = new Graph(Direction.DIRECTED);
```

#### Create a `Graph` with complex data-type as key

```typescript
import { Graph } from "devfox-ts-adt-graph";

type ComplexKeyType = {
  accountNumber: number;
  accountHolder: string;
};

const graph: Graph<ComplexKeyType> = new Graph();
```

#### Create Nodes

```typescript
import { Entities } from "devfox-ts-adt-graph";
import Node = Entities.Node;

// Node with primitive number as key type
const node: Node<number> = { key: 1, [] }
graph.add(node);

// Node with complex data-type as key type
const complexKey: ComplexKeyType = { accountNumber: 1, accountHolder: "Person1" };
const node: Node<ComplexKeyType> = { key: complexKey, children: [] }
graph.addNode(node);

// Node with additional data
type NodeWithData<T> = Node<T> & {
  accountNumber: number;
  transactions: string[];
};

const complexNode: NodeWithData<number> = {
  key: 0,
  children: [],
  accountNumber: 123,
  transactions: ["trx1", "trx2"]
};

graph.addNode(complexNode);
```

#### Add Edges

```typescript
const node1 = { key: 1, children: [] };
const node2 = { key: 2, children: [] };

graph.addNode(node1);
graph.addNode(node2);
graph.addEdge(node1.key, node2.key);

// Non-directed graph
node1.children; // will contain node2
node2.children; // will contain node1

// Directed graph
node1.children; // will contain node2
node2.children; // will be empty
```

### Search Operations

#### Get descendants of a `Node`

```typescript
import { getDescendants } from "devfox-ts-adt-graph";

// Get an array with all descendants for a given node
const network: Node<T>[] = getDescendants(graph, startingNode);

// Apply SearchOptions example
const searchOptions: SearchOptions = {
  algorithm: Algorithm.BREADTH_FIRST,
  level: 1
};

// Returns Descendants One Level deep and uses Breadth-first algorithm
const network: Node<T>[] = getDescendants(graph, startingNode, searchOptions);
```
