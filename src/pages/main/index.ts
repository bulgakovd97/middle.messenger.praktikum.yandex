import Handlebars from 'handlebars';
import { main } from './main';

export const Main = () => {
  return Handlebars.compile(main)({});
};
