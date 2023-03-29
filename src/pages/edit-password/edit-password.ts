export const editPassword = `
{{> back/back }}

<main class="edit-password-main">
  <div class="edit-password">
    {{> avatar/avatar class="edit-password__avatar" }}

    <form class="edit-password__form edit-form">
      <fieldset class="edit-password__fiedlset edit-form__fieldset">
        {{> profile-input-block/profile-input-block for="oldPassword" label="Старый пароль" type="password"
        id="oldPassword" name="oldPassword"
        placeholder="•••••••••"}}

        {{> profile-input-block/profile-input-block for="newPassword" label="Новый пароль" type="password"
        id="newPassword" name="newPassword"
        placeholder="•••••••••••"}}

        {{> profile-input-block/profile-input-block for="newPassword-repeat" label="Повторите новый пароль"
        type="password"
        id="newPassword-repeat" name="newPassword-repeat"
        placeholder="•••••••••••"}}

        {{> submit-button/submit-button class="edit-password__button" buttonText="Сохранить" }}
      </fieldset>
    </form>
  </div>
</main>
`;
