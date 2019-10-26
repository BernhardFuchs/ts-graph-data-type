import { Entities } from "./entities";
import Node = Entities.Node;
import Edge = Entities.Edge;

export class Graph<T> {
  private _nodes: Node<T>[] = [];
  private _edges: Edge<T>[] = [];
  private _isDirected: boolean;
  private readonly DIRECTED: string = "DIRECTED";

  constructor(private direction: string = "") {
    this._isDirected = this.direction.toUpperCase().match(this.DIRECTED)
      ? true
      : false;
  }

  public get nodes(): Node<T>[] {
    return this._nodes;
  }

  public get edges(): Edge<T>[] {
    return this._edges;
  }

  public addNode(node: Node<T>): void {
    this._nodes.push(node);
  }

  public findNode(key: T): Node<T> {
    return this._nodes.find(n => n.key === key);
  }

  public addEdge(node1Key: T, node2Key: T) {
    const node1 = this.findNode(node1Key);
    const node2 = this.findNode(node2Key);

    node1.children.push(node2);

    if (!this._isDirected) {
      node2.children.push(node1);
    }

    this._edges.push({ node1Key, node2Key });
  }
}
