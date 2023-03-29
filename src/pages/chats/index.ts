import Handlebars from 'handlebars';
import { chats } from './chats';

export const Chats = () => {
  return Handlebars.compile(chats)({});
};
