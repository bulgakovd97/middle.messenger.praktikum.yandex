import {
  Chats,
  EditPassword,
  Error404,
  Error500,
  Main,
  Profile,
} from './pages';
import { Routes } from '@/shared/lib';

const {
  CHATS,
  EDIT_PASSWORD,
  ERROR_PAGE,
  NOT_FOUND,
  PROFILE,
} = Routes;

export const App = () => {
  const { pathname } = window.location;

  switch (pathname) {
    case ERROR_PAGE:
      return Error500();

    case NOT_FOUND:
      return Error404();

    case PROFILE:
      return Profile();

    case EDIT_PASSWORD:
      return EditPassword();

    case CHATS:
      return Chats();

    default:
      return Main();
  }
};
