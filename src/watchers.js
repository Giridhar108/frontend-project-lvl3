import onChange from 'on-change';
import {
  renderFeedback,
  renderValidUrlSubmit,
  renderFeeds,
  renderPosts,
  renderOpenModal,
  renderClodseModal,
} from './renderers';
import { getData, pushAdded } from './controlers';

const state = {
  inputUrl: {
    status: 'filling',
    url: '',
  },
  checkedUrl: [],
  main: [],
  items: [],
  added: [],
  postActive: {},
  modalBtn: {},
};

export const watchedValid = onChange(state, (path, value) => {
  if (value === 'valid') {
    renderFeedback(value);
  } else if (value === 'invalid') {
    renderFeedback(value);
  } else if (value === 'processing') {
    renderFeedback(value);
    console.log(state.items);
    state.main.forEach((feed) => {
      if (!state.added.includes(feed.date)) renderFeeds(feed);
    });
    state.items.flat().reverse().forEach((item, index) => {
      if (!state.added.includes(item.pubDate)) renderPosts(item, index);
    });
    pushAdded(state.main, state.items, state);
  } else if (value === 'processed') {
    renderFeedback(value);
  } else if (value === 'failed') {
    renderFeedback(value);
  }
});

export const watchedPath = onChange(state, () => {
  renderValidUrlSubmit();
  // if (!state.checkedUrl.includes(state.inputUrl.url)) {
  getData(state);
  // }
});

export const watchedPostStatus = onChange(state, (path, value) => {
  const { btn } = value;
  renderOpenModal(state, btn);
});

export const watchedModalStatus = onChange(state, (path, value) => {
  const { kindBtn } = value;
  renderClodseModal(kindBtn);
});
