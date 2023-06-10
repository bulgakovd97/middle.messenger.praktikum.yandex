import {
  EditPasswordPage,
  ErrorPage,
  LoginPage,
  SignUpPage,
  NotFoundPage,
  ProfilePage,
  ChatsPage,
} from '@/pages/index';
import { Routes } from '@/shared/lib';
import router from '@/shared/utils/Router/Router';
import authController from '@/controllers/AuthController';
import './styles/index.scss';

// eslint-disable-next-line @typescript-eslint/no-misused-promises
window.addEventListener('DOMContentLoaded', async () => {
  router
    .use(Routes.LOGIN, LoginPage)
    .use(Routes.SIGN_UP, SignUpPage)
    .use(Routes.PROFILE, ProfilePage)
    .use(Routes.EDIT_PASSWORD, EditPasswordPage)
    .use(Routes.CHATS, ChatsPage)
    .use(Routes.ERROR_PAGE, ErrorPage)
    .use(Routes.NOT_FOUND, NotFoundPage);

  let isProtectedRoute = true;

  const { pathname } = window.location;

  switch (pathname) {
    case Routes.LOGIN:
    case Routes.SIGN_UP:
      isProtectedRoute = false;
      break;

    default:
      isProtectedRoute = true;
      break;
  }

  try {
    await authController.fetchUser();

    router.start();

    if (!isProtectedRoute) {
      router.go(Routes.CHATS);
    }
  } catch (error) {
    router.start();

    if (isProtectedRoute) {
      router.go(Routes.LOGIN);
    }
  }
});
