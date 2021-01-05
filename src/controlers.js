import * as yup from 'yup';
import { setLocale } from 'yup';
import axios from 'axios';
import {
  watchedValid,
  watchedPath,
  watchedPostStatus,
  watchedModalStatus,
} from './watchers';
import parser from './parser';
import i18 from './i18';

const pushAdded = (main, items, state) => {
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
  watchedValid.status = 'processed';
};

// https://cors-anywhere.herokuapp.com/
export const getData = (state) => {
  // axios.get(`https://api.allorigins.win/raw?url=${state.url}`)
  axios.get(`https://cors-anywhere.herokuapp.com/${state.url}`)
    .then((response) => {
      // console.log(response);
      // console.log(parser(response).items[9].pubDate);
      if (!state.checkedUrl.includes(response.config.url)) {
        if (parser(response) === 'Error') {
          watchedValid.status = 'failed';
          throw new Error(`Wrong ${document}`);
        }
        state.checkedUrl.push(response.config.url);
        state.main.push(parser(response).main);
        state.items.push(parser(response).items);
        watchedValid.status = 'processing';
      } else {
        parser(response).items.forEach((item) => {
          if (!state.added.includes(item.pubDate)) {
            state.items[0].push(item);
            watchedValid.status = 'processing';
          }
        });
      }
      pushAdded(state.main, state.items, state);
    })
    .then(() => setTimeout(getData, 5000, state))
    .catch((reject) => {
      if (reject) {
        watchedPath.url = '';
        watchedValid.status = 'failed';
        console.log(reject);
      }
    });
};

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
      if (valid && !watchedPath.url.includes(url)) {
        watchedValid.status = 'valid';
      } else if (valid && watchedPath.url.includes(url)) {
        watchedValid.status = 'was';
      } else {
        watchedValid.status = 'invalid';
      }
    });
};

export const getUrl = (e) => {
  e.preventDefault();

  const formData = new FormData(e.target);
  const url = formData.get('url');
  watchedValid.status = '';
  if (!watchedPath.checkedUrl.includes(url)) {
    watchedPath.url = url.trim();
    getData(watchedPath);
  }
};

export const openModal = (event) => {
  const btn = event.path[0];
  watchedPostStatus.postActive = { btn };
};

export const listenModal = (event) => {
  const btn = event.path[0];
  watchedModalStatus.modalBtn = { kindBtn: btn };
};
