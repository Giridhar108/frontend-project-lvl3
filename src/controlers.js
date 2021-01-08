import * as yup from 'yup';
import { setLocale } from 'yup';
import axios from 'axios';
import i18next from 'i18next';
import parsering from './parsering';

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
  state.status = 'processed';
};

export const getData = (state) => {
  const promises = state.url.map(url => {

  axios.get(`https://api.allorigins.win/raw?url=${url}`)
  // axios.get(`https://cors-anywhere.herokuapp.com/${url}`)
    .then((response) => {
      if (!state.checkedUrl.includes(response.config.url)) {
        if (parsering(response.data) === 'Error') {
          state.status = 'failed';
          throw new Error(`Wrong ${document}`);
        }
        state.checkedUrl.push(response.config.url);
        state.main.push(parsering(response.data).main);
        state.items.push(parsering(response.data).items);
        state.status = 'processing';
      } else {
        parsering(response.data).items.forEach((item) => {
          if (!state.added.includes(item.pubDate)) {
            state.items[0].push(item);
            state.status = 'processing';
          }
        });
      }
      pushAdded(state.main, state.items, state);
    })
    // .then(() => setTimeout(getData, 5000, state))
    .catch(() => {
        state.url = '';
        state.status = 'failed';
    });
  })
    Promise.all(promises).finally(() => {
      setTimeout(getData, 5000, state);
    });
};




export const validate = (e, state) => {
  const url = e.target.value;
  setLocale({
    number: {
      min: ({ min }) => ({ key: i18next.t('setLocale'), values: { min } }),
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
      if (valid && !state.url.includes(url)) {
        state.status = 'valid';
      } else if (valid && state.url.includes(url)) {
        state.status = 'was';
      } else {
        state.status = 'invalid';
      }
    });
};

export const getUrl = (e, state) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  const url = formData.get('url');
  state.status = '';
  if (!state.checkedUrl.includes(url)) {
    state.url.push(url.trim());
    getData(state);
  }
};

export const openModal = (event, state) => {
  const btn = event.path[0];
  state.postActive = { btn };
};

export const listenModal = (event, state) => {
  const btn = event.path[0];
  state.modalBtn = { kindBtn: btn };
};
