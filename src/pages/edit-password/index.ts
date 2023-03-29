import Handlebars from 'handlebars';
import { editPassword } from './edit-password';

export const EditPassword = () => {
  return Handlebars.compile(editPassword)({});
};
