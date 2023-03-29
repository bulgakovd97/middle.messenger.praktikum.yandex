import Handlebars from 'handlebars';
import { error404 } from './404';

export const Error404 = () => {
  return Handlebars.compile(error404)({});
};
