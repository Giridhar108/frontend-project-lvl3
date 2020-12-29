import * as yup from 'yup';
import { setLocale } from 'yup';
import axios from 'axios';
import { watchedValid, watchedPath } from './watchers';
import parser from './parser';

export const validate = (e) => {
  const url = e.target.value;
  setLocale({
    number: {
      min: ({ min }) => ({ key: 'field_too_short', values: { min } }),
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
    watchedPath.inputUrl.url.push(url);
  }
};

export const getData = (value, state) => {
  console.log(value);
  value.map((pathRss) => axios(`https://api.allorigins.win/get?url=${encodeURIComponent(pathRss)}`)
    .then((response) => {
      if (!state.checkedUrl.includes(response.config.url)) {
        state.checkedUrl.push(response.config.url);
        const result = parser(response);
        console.log(result.items);
        state.main.push(result.main);
        state.items.push(result.items);
        watchedValid.inputUrl.status = 'ready';
      } else {
        console.log(parser(response).items);
      }
    })
    .then(() => setTimeout(getData, 5000, state.inputUrl.url, state))
    .catch(console.error));
};

export const pushAdded = (main, items, state) => {
  main.map((a) => {
    if (!state.added.includes(a.date)) {
      state.added.push(a.date);
    }
  });
  items.flat().map((a) => {
    if (!state.added.includes(a.pubDate)) {
      state.added.push(a.pubDate);
    }
  });
};
