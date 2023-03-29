export const UserPopup = `
{{#> popup/popup title="Добавить пользователя" }}

<form class="user-popup-form">
  <fieldset class="user-popup-form__fieldset">
    {{> input-block/input-block for="login" label="Логин" type="text" id="login" name="login" placeholder="Логин"
    errorMessage="Неверный логин" }}

    {{> submit-button/submit-button buttonText="Добавить" }}
  </fieldset>
</form>

{{/popup/popup }}
`;
