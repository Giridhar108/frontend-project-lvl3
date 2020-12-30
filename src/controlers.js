import * as yup from 'yup';
import { setLocale } from 'yup';
import axios from 'axios';
import {
  watchedValid, watchedPath, watchedPostStatus, watchedModalStatus,
} from './watchers';
import parser from './parser';
import i18 from './i18';

export const validate = (e) => {
  const url = e.target.value;
  setLocale({
    number: {
      min: ({ min }) => ({ key: i18.t('setLocale'), values: { min } }),
    },
  });

  const schema = yup.object().shape({
    url: yup.string().min(5).url(),
  });

  schema
    .isValid({
      url: `${url}`,
    })
    .then((valid) => {
      if (valid) {
        watchedValid.inputUrl.status = 'valid';
      } else {
        watchedValid.inputUrl.status = 'invalid';
      }
    });
};

export const getUrl = (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  const url = formData.get('url');
  watchedValid.inputUrl.status = '';
  if (!watchedPath.inputUrl.url.includes(url)) {
    watchedPath.inputUrl.url = url;
  }
};

export const getData = (state) => {
  console.log(state.inputUrl.url);

  axios.get(`https://api.allorigins.win/get?url=${encodeURIComponent(state.inputUrl.url)}`)
    .then((response) => {
      console.log(response);
      console.log(parser(response).items[9].pubDate);
      if (!state.checkedUrl.includes(response.config.url)) {
        state.checkedUrl.push(response.config.url);
        state.main.push(parser(response).main);
        state.items.push(parser(response).items);
        watchedValid.inputUrl.status = 'ready';
      } else {
        parser(response).items.forEach((item) => {
          if (!state.added.includes(item.pubDate)) {
            state.items.push(item);
            console.log('b');
          }
        });
      }
    })
    .then(() => setTimeout(getData, 5000, state));
};

export const pushAdded = (main, items, state) => {
  main.forEach((a) => {
    if (!state.added.includes(a.date)) {
      state.added.push(a.date);
    }
  });
  items.flat().forEach((a) => {
    if (!state.added.includes(a.pubDate)) {
      state.added.push(a.pubDate);
    }
  });
};

export const openModal = (event) => {
  const btn = event.path[0];
  watchedPostStatus.postActive = { btn };
};

export const listenModal = (event) => {
  const btn = event.path[0];
  watchedModalStatus.modalBtn = { kindBtn: btn };
};
