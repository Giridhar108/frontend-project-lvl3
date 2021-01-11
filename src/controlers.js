import * as yup from 'yup';
import { setLocale } from 'yup';
import axios from 'axios';
import i18next from 'i18next';
import parsing from './parsing';

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
  state.url.map((url) => axios
    .get(`https://api.allorigins.win/get?url=${encodeURIComponent(url)}`)
    // axios.get(`https://cors-anywhere.herokuapp.com/${url}`)
    .then((response) => {
      const feedData = parsing(response.data.contents);
      if (feedData === 'Error') {
        state.status = 'failed';
        throw new Error(`Wrong ${document}`);
      }
      state.checkedUrl.push(response.config.url);
      state.main.push(feedData.main);
      state.items.push(feedData.items);
      state.status = 'processing';
      pushAdded(state.main, state.items, state);
    })
    .catch(() => {
      state.url = [];
      state.status = 'failed';
    }));
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
  validate(e, state)
  e.preventDefault();
  const formData = new FormData(e.target);
  const url = formData.get('url');
  if (!state.checkedUrl.includes(url) && state.status !== 'invalid') {
    state.status = '';
    state.url.push(url.trim());
    getData(state);
  }
};

export const openModal = (event, state) => {
  console.log(event.path);
  const btn = event.path[0];
  state.postActive = { btn };
};

export const listenModal = (event, state) => {
  const btn = event.path[0];
  state.modalBtn = { kindBtn: btn };
};

export const fetchNewPosts = (watchedState) => {
  const promises = watchedState.url.map((url) => axios
    .get(`https://cors-anywhere.herokuapp.com/${url}`)
    .then((response) => {
      const feedData = parsing(response.data);
      watchedState.items.push(feedData.items);
      watchedState.status = 'processing';
      pushAdded(watchedState.main, watchedState.items, watchedState);
      console.log(feedData);
    })
    .catch((e) => {
      console.log(e);
    }));
  Promise.all(promises).finally(() => {
    setTimeout(() => fetchNewPosts(watchedState), 5000);
  });
};
