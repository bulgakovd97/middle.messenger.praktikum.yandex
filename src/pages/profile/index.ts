import Handlebars from 'handlebars';
import { profile } from './profile';

export const Profile = () => {
  return Handlebars.compile(profile)({});
};
