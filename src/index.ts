import { App } from './App';
import '@/shared/components';

window.addEventListener('DOMContentLoaded', () => {
  const root = document.querySelector('#root');

  root!.innerHTML = App();
});
