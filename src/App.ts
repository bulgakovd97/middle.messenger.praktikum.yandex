import { Main } from './pages/main';
import { Error500 } from './pages/500';
import { Error404 } from './pages/404';
import { Profile } from './pages/profile';
import { EditPassword } from './pages/edit-password';
import { Chats } from './pages/chats';

export const App = () => {
  const { pathname } = window.location;

  switch (pathname) {
    case '/500':
      return Error500();

    case '/404':
      return Error404();

    case '/profile':
      return Profile();

    case '/edit-password':
      return EditPassword();

    case '/chats':
      return Chats();

    default:
      return Main();
  }
};
