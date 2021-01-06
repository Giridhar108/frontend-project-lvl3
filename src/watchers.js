import onChange from 'on-change';
import
// {
//   renderFeedback,
//   renderValidUrlSubmit,
//   renderFeeds,
//   renderPosts,
//   renderOpenModal,
//   renderClodseModal,
// }
 render from './renderers';
// import { pushAdded } from './controlers';

const { renderFeedback,
  renderValidUrlSubmit,
  renderFeeds,
  renderPosts,
  renderOpenModal,
  renderClodseModal,} = render()

const state = {
  status: 'filling',
  url: '',
  checkedUrl: [],
  main: [],
  items: [],
  added: [],
  postActive: {},
  modalBtn: {},
};

// export default (state) => {
//   const watchedState = onChange(state, (path, value) => {
//     switch (path) {
//       case 'status':
//         if (value === 'processing') {
//           state.main.forEach((feed) => {
//             if (!state.added.includes(feed.date)) renderFeeds(feed);
//           });
//           state.items
//             .flat()
//             .reverse()
//             .forEach((item, index) => {
//               if (!state.added.includes(item.pubDate)) renderPosts(item, index);
//             });
//           // pushAdded(state.main, state.items, state);
//         }
//         renderFeedback(value);
//         break;
//       case 'url':
//         renderFeedback(value);
//         break;
//       case 'checkedUrl':
//         renderValidUrlSubmit();
//         // getData(state);
//         break;
//       case 'postActive':
//         renderOpenModal(state, value);
//         break;
//       case 'modalBtn':
//         renderClodseModal(value);
//         break;
//       default:
//         break;
//     }
//   });
//   return watchedState;
// };

export const watchedValid = onChange(state, (path, value) => {
  if (value === 'valid') {
    renderFeedback(value);
  } else if (value === 'invalid') {
    renderFeedback(value);
  } else if (value === 'was') {
    renderFeedback(value);
  } else if (value === '') {
    renderFeedback(value);
  } else if (value === 'processing') {
    // console.log(state);
    state.main.forEach((feed) => {
      if (!state.added.includes(feed.date)) renderFeeds(feed);
    });
    state.items
      .flat()
      .reverse()
      .forEach((item, index) => {
        if (!state.added.includes(item.pubDate)) renderPosts(item, index);
      });
    // pushAdded(state.main, state.items, state);
  } else if (value === 'processed') {
    renderFeedback(value);
  } else if (value === 'failed') {
    renderFeedback(value);
  }
});

export const watchedPath = onChange(state, () => {
  renderValidUrlSubmit();
  // if (!state.checkedUrl.includes(state.inputUrl.url)) {
  // getData(state);
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
