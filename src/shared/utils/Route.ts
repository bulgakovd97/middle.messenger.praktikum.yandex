import { Block } from './Block';

function isEqual(lhs: string, rhs: string): boolean {
  return lhs === rhs;
}

function render(query: string, block: Block) {
  const root = document.querySelector(query);

  if (root === null) {
    throw new Error(`root not found by selector "${query}"`);
  }

  root.innerHTML = '';

  root.append(block.getContent()!);

  return root;
}

export default class Route {
  private block: Block | null = null;

  constructor(
    private pathname: string,
    private readonly BlockClass: typeof Block,
    private readonly query: string,
  ) { }

  get path() {
    return this.pathname;
  }

  navigate(pathname: string) {
    if (this.match(pathname)) {
      this.pathname = pathname;
      this.render();
    }
  }

  leave() {
    this.block = null;
  }

  match(pathname: string) {
    return isEqual(pathname, this.pathname);
  }

  render() {
    if (!this.block) {
      this.block = new this.BlockClass();

      render(this.query, this.block);

      this.block.dispatchComponentDidMount();
    }
  }
}
