export namespace Entities {
  export type Node<T> = {
    key: T;
    children: Array<Node<T>>;
  }

  export type Edge<T> = {
    node1Key: T;
    node2Key: T;
  }
}
