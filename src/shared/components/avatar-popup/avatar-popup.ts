export const AvatarPopup = `
{{#> popup/popup title="Загрузите файл" }}

<form class="avatar-popup-form">
  <fieldset class="avatar-popup-form__fieldset">
    <label class="avatar-popup-form__label" for="avatar">Выбрать файл на&nbsp;компьютере</label>
    <input class="avatar-popup-form__input" type="file" id="avatar" name="avatar" />

    {{> submit-button/submit-button class="avatar-popup-form__button" buttonText="Поменять" }}
  </fieldset>

  <p class="avatar-popup-form__error">Нужно выбрать файл</p>
</form>

{{/popup/popup }}
`;
