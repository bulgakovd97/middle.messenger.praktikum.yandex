export const InputBlock = `
<div class="input-block">
  <label class="input-block__label" for="{{ for }}">{{ label }}</label>
  <input class="input-block__input" type="{{ type }}" id="{{ id }}" name="{{ name }}" placeholder="{{ placeholder }}" required />
  <p class="input-block__error">{{ errorMessage }}</p>
</div>
`;
