import { validate, getUrl } from './controlers';

export default () => {
  const input = document.querySelector('input');
  const form = document.querySelector('.rss-form');

  form.addEventListener('submit', (event) => getUrl(event));
  input.addEventListener('input', (event) => validate(event));

};
