import i18next from 'i18next';
import {
  validate, getUrl, openModal, listenModal, fetchNewPosts,
} from './controlers';
import watchState from './watchers';
import english from './locales/en';

export default () => {
  const state = {
    status: 'filling',
    url: [],
    checkedUrl: [],
    main: [],
    items: [],
    added: [],
    postActive: {},
    modalBtn: {},
  };

  const elements = {
    input: document.querySelector('input'),
    button: document.querySelector('.col-auto>button'),
    feedback: document.querySelector('.feedback'),
    feedbackTwo: document.querySelector('.feedback__two'),
    flow: document.querySelector('.flow'),
    feedTitle: document.querySelector('.feeds > ul'),
    posts: document.querySelector('.posts > ul'),
    modal: document.querySelector('#modal'),
    body: document.querySelector('body'),
    modalTitle: document.querySelector('.modal-title'),
    modalBody: document.querySelector('.modal-body'),
    modalLind: document.querySelector('.full-article'),
    feedsTitle: document.querySelector('.feeds > h2'),
    postsTitle: document.querySelector('.posts > h2'),
  };

  const texts = () => {
    document.querySelector('.full-article').innerHTML = i18next.t('key');
    document.querySelector('h1.display-3').innerHTML = i18next.t('mainTitle');
    document.querySelector('p.lead').innerHTML = i18next.t('smallMainTitle');
    document.querySelector('#mainBtn').innerHTML = i18next.t('mainBtn');
    document.querySelector('p.text-muted').innerHTML = i18next.t('example');
    document.querySelector('.feeds > h2').innerHTML = i18next.t('feeds');
    document.querySelector('.posts > h2').innerHTML = i18next.t('posts');
    document.querySelector('.text-center').innerHTML = i18next.t('createdBy');
  };

  // getWatchedState(state);
  const input = document.querySelector('input');
  const form = document.querySelector('.rss-form');
  const postClick = document.querySelector('.posts');
  const modalClick = document.querySelector('#modal');
  const watchedState = watchState(state, elements);

  form.addEventListener('submit', (event) => getUrl(event, watchedState));
  input.addEventListener('input', (event) => validate(event, watchedState));
  postClick.addEventListener('click', (event) => openModal(event, watchedState));
  modalClick.addEventListener('click', (event) => listenModal(event, watchedState));

  setTimeout(fetchNewPosts, 5000, watchedState);

  return i18next
    .init({
      lng: 'en',
      resources: {
        en: english,
      },
    })
    .then(texts);
};
