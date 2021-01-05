import {
  validate, getUrl, openModal, listenModal,
} from './controlers';
// import getWatchedState from './watchers';

export default () => {
  // getWatchedState(state);
  const input = document.querySelector('input');
  const form = document.querySelector('.rss-form');
  const postClick = document.querySelector('.posts');
  const modalClick = document.querySelector('#modal');

  form.addEventListener('submit', (event) => getUrl(event));
  input.addEventListener('input', (event) => validate(event));
  postClick.addEventListener('click', (event) => openModal(event));
  modalClick.addEventListener('click', (event) => listenModal(event));
};
