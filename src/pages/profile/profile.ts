export const profile = `
{{> back/back }}

<main class="profile-main">
  <div class="profile">
    {{> avatar/avatar class="profile__avatar" }}

    <h2 class="profile__name">Денис</h2>

    <form class="profile__form edit-form">
      <fieldset class="profile__fiedlset edit-form__fieldset">
        {{> profile-input-block/profile-input-block for="email" label="Почта" type="email" id="email" name="email"
        placeholder="bulgakovd97@yandex.ru"}}

        {{> profile-input-block/profile-input-block for="login" label="Логин" type="text" id="login" name="login"
        placeholder="bulgakovd"}}

        {{> profile-input-block/profile-input-block for="first_name" label="Имя" type="text" id="first_name"
        name="first_name"
        placeholder="Денис"}}

        {{> profile-input-block/profile-input-block for="second_name" label="Фамилия" type="text" id="second_name"
        name="second_name"
        placeholder="Булгаков"}}

        {{> profile-input-block/profile-input-block for="display_name" label="Имя в чате" type="text"
        id="display_name" name="display_name"
        placeholder="Денис"}}

        {{> profile-input-block/profile-input-block for="phone" label="Телефон" type="tel" id="phone" name="phone"
        placeholder="+7 (999) 999 99 99"}}

        <div class="profile__button-group edit-form__button-group">
          <button class="profile__button edit-form__button edit-form__button_type_edit" type="button">
            Изменить данные
          </button>
          {{!-- <button class="profile__button edit-form__button edit-form__button_type_edit" type="button">
            Изменить пароль
          </button> --}}

          {{!-- Временное решение --}}
          <a class="profile__button edit-form__button edit-form__button_type_edit"
            href="../edit-password/edit-password.hbs">Изменить пароль</a>
          <button class="profile__button edit-form__button edit-form__button_type_logout" type="button">
            Выйти
          </button>
        </div>
      </fieldset>
    </form>
  </div>
</main>
`;
