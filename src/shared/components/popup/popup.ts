export const Popup = `
<div class="popup {{ class }}">
  <h2 class="popup__title">{{ title }}</h2>
  {{#if @partial-block}}
  {{> @partial-block }}
  {{/if}}
</div>
`;
