import Handlebars from 'handlebars';
import { error500 } from './500';

export const Error500 = () => {
  return Handlebars.compile(error500)({});
};
