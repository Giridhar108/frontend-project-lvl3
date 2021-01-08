import {
  validate, getUrl, openModal, listenModal,
} from './controlers';
// import getWatchedState from './watchers';
import watchState from './watchers'

export default () => {

  const state = {
    status: 'filling',
    url: '',
    checkedUrl: [],
    main: [],
    items: [],
    added: [],
    postActive: {},
    modalBtn: {},
  };

  const elements = {
    input: document.querySelector("input"),
    button: document.querySelector(".col-auto>button"),
    feedback: document.querySelector(".feedback"),
    flow: document.querySelector(".flow"),
    feedsTitle: document.querySelector(".feeds > ul"),
    posts: document.querySelector(".posts > ul"),
    modal: document.querySelector("#modal"),
    body: document.querySelector("body"),
    modalTitle: document.querySelector(".modal-title"),
    modalBody: document.querySelector(".modal-body"),
    modalLind: document.querySelector(".full-article"),
  };

  // getWatchedState(state);
  const input = document.querySelector('input');
  const form = document.querySelector('.rss-form');
  const postClick = document.querySelector('.posts');
  const modalClick = document.querySelector('#modal');
  const watchedState = watchState(state, elements)

  form.addEventListener('submit', (event) => getUrl(event, watchedState));
  input.addEventListener('input', (event) => validate(event, watchedState));
  postClick.addEventListener('click', (event) => openModal(event, watchedState));
  modalClick.addEventListener('click', (event) => listenModal(event, watchedState));

};
