import {
  ChatsPage,
  EditPasswordPage,
  ErrorPage,
  LoginPage,
  SignUpPage,
  MainPage,
  NotFoundPage,
  ProfilePage,
} from '@/pages/index';
import { Routes } from './shared/lib';
import { Block } from './shared/utils/Block';

const {
  LOGIN,
  SIGN_UP,
  PROFILE,
  EDIT_PASSWORD,
  CHATS,
  ERROR_PAGE,
  NOT_FOUND,
} = Routes;

let page: Block;

window.addEventListener('DOMContentLoaded', () => {
  const { pathname } = window.location;

  console.log(window.location);

  const root = document.querySelector('#root');

  switch (pathname) {
    case ERROR_PAGE:
      page = new ErrorPage();
      break;

    case NOT_FOUND:
      page = new NotFoundPage();
      break;

    case PROFILE:
      page = new ProfilePage();
      break;

    case EDIT_PASSWORD:
      page = new EditPasswordPage();
      break;

    case CHATS:
      page = new ChatsPage();
      break;

    case LOGIN:
      page = new LoginPage();
      break;

    case SIGN_UP:
      page = new SignUpPage();
      break;

    default:
      page = new MainPage();
      break;
  }

  root?.append(page.getContent()!);

  page.dispatchComponentDidMount();
});
