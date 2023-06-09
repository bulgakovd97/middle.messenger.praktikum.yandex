import Router from '@/shared/utils/Router/Router';
import { ProfileButton } from './index';
import sinon from 'sinon';
import { expect } from 'chai';

describe('profile button', () => {
  it('should render', () => {
    new ProfileButton({ to: '/profile' });
  });

  it('shoul go to profile page on click', () => {
    const instance = new ProfileButton({ to: '/profile' });
    const element = instance.element;
    const spy = sinon.spy(Router, 'go');

    const link = element?.querySelector('span') as HTMLSpanElement;

    link.click();

    expect(spy.calledOnce).to.eq(true);
  });
});
