export const main = `
<nav>
  <ul style="display: flex; gap: 10px;">
    <li>
      <a href="/500" style="color: #0F3D97;">500</a>
    </li>
    <li>
      <a href="/404" style="color: #0F3D97;">404</a>
    </li>
    <li>
      <a href="/profile" style="color: #0F3D97;">Профиль</a>
    </li>
    <li>
      <a href="/edit-password" style="color: #0F3D97;">Пароль</a>
    </li>
    <li>
      <a href="/chats" style="color: #0F3D97;">Чаты</a>
    </li>
  </ul>
</nav>

<div style="display: flex; align-items: flex-start; gap: 10px; margin-top: 30px">
  {{> login-popup/login-popup }}
  {{> sign-up-popup/sign-up-popup }}
  {{> avatar-popup/avatar-popup }}
  {{> user-popup/user-popup }}
</div>
`;
