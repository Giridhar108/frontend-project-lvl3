import onChange from 'on-change';
import {
  renderValidUrl,
  renderInvalidUrl,
  renderValidUrlSubmit,
  renderFeeds,
  renderPosts,
  renderOpenModal,
  renderClodseModal,
} from './renderers';
import { getData, pushAdded } from './controlers';

const state = {
  inputUrl: {
    status: '',
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
    renderValidUrl();
  } else if (value === 'invalid') {
    renderInvalidUrl();
  } else if (value === 'ready') {
    state.main.forEach((feed) => {
      if (!state.added.includes(feed.date)) renderFeeds(feed);
    });
    state.items.flat().forEach((item, index) => {
      if (!state.added.includes(item.pubDate)) renderPosts(item, index);
    });

    pushAdded(state.main, state.items, state);
  }
});

export const watchedPath = onChange(state, () => {
  renderValidUrlSubmit();
  getData(state);
});

export const watchedPostStatus = onChange(state, (path, value) => {
  const { btn } = value;
  renderOpenModal(state, btn);
});

export const watchedModalStatus = onChange(state, (path, value) => {
  const { kindBtn } = value;
  renderClodseModal(kindBtn);
});
