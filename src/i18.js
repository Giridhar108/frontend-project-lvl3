import i18next from 'i18next';

export default i18next.init({
  lng: 'en',
  resources: {
    en: {
      translation: {
        key: 'Full article',
        mainTitle: 'RSS Render',
        smallMainTitle: 'Start reading RSS today! It is easy, it is nicely.',
        mainBtn: 'Add',
        example: 'Example: https://ru.hexlet.io/lessons.rss or http://lorem-rss.herokuapp.com/feed?unit=second&interval=30',
        feeds: 'Feeds',
        posts: 'Posts',
        createdBy: 'created by',
        setLocale: 'field_too_short',
        notValid: 'must be valid',
        valid: 'valid RSS',
        processing: 'processing...',
        processed: 'Done!',
        failed: 'failed',
      },
    },
  },
}).then(() => {
  document.querySelector('.full-article').innerHTML = i18next.t('key');
  document.querySelector('h1.display-3').innerHTML = i18next.t('mainTitle');
  document.querySelector('p.lead').innerHTML = i18next.t('smallMainTitle');
  document.querySelector('#mainBtn').innerHTML = i18next.t('mainBtn');
  document.querySelector('p.text-muted').innerHTML = i18next.t('example');
  document.querySelector('.feeds > h2').innerHTML = i18next.t('feeds');
  document.querySelector('.posts > h2').innerHTML = i18next.t('posts');
  document.querySelector('.text-center').innerHTML = i18next.t('createdBy');
});
