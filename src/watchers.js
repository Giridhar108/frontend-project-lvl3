import onChange from 'on-change';
import {
  renderValidUrl,
  renderInvalidUrl,
  renderValidUrlSubmit,
  renderFeeds,
  renderPosts,
} from './renderers';
import { getData, pushAdded } from './controlers';

const state = {
  inputUrl: {
    status: '',
    url: [],
  },
  checkedUrl: [],
  main: [],
  items: [],
  added: [],
};

export const watchedValid = onChange(state, (path, value) => {
  if (value === 'valid') {
    renderValidUrl();
  } else if (value === 'invalid') {
    renderInvalidUrl();
  } else if (value === 'ready') {
    console.log('a');
    state.main.map((feed) => {
      if (!state.added.includes(feed.date)) renderFeeds(feed);
    });
    state.items.flat().map((item) => {
      if (!state.added.includes(item.pubDate)) renderPosts(item);
    });

    pushAdded(state.main, state.items, state);
  }
});

export const watchedPath = onChange(state, (path, value) => {
  renderValidUrlSubmit();
  getData(value, state);
});
