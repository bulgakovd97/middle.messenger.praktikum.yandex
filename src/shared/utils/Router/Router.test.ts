import { expect } from 'chai';
import Router from './Router';
import sinon from 'sinon';
import { Block } from '../Block';

describe('Router', () => {
  const originalForward = window.history.forward;
  const originalBack = window.history.back;

  class Page1 extends Block {
    protected render(): DocumentFragment {
      return new DocumentFragment();
    }
  }

  class Page2 extends Block {
    protected render(): DocumentFragment {
      return new DocumentFragment();
    }
  }

  beforeEach(() => {
    Router.reset();
    window.history.forward = sinon.fake();
    window.history.back = sinon.fake();
  });

  after(() => {
    window.history.forward = originalForward;
    window.history.back = originalBack;
  });

  it('.use() should return Router instance', () => {
    const result = Router.use('/', Page1);

    expect(result).to.eq(Router);
  });

  it('.back()', () => {
    Router.back();

    expect((window.history.back as any).callCount).to.eq(1);
  });

  it('.forward()', () => {
    Router.forward();

    expect((window.history.forward as any).callCount).to.eq(1);
  });

  it('.go()', () => {
    let route: string | undefined;

    Router
      .use('/1', Page1)
      .use('/2', Page2)
      .start();

    route = '/2';

    Router.go('/1');

    route = Router.currentRoutePath;

    expect(route).to.eq('/1');
  });
});
