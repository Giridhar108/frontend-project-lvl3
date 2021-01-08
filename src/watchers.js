import onChange from 'on-change';
import render from './renderers';

const {
  renderFeedback,
  renderValidUrlSubmit,
  renderOpenModal,
  renderClodseModal,
} = render();

export default (initState, elements) => {
  // const handlePosts = (state) => {};

  // const handleModal = (state) => {};

  // const watchedState = onChange(initState, (path) => {
  //   switch (path) {
  //     case 'status':
  //       handleModal(initState);
  //       break;
  //     case 'ui.seenPosts':
  //       handlePosts(initState);
  //       break;
  //     default:
  //       break;
  //   }
  // });

  const watchedState = onChange(initState, (path, value) => {
    switch (path) {
      case 'status':
        renderFeedback(initState.status, initState, elements);
        break;
      case 'checkedUrl':
        renderValidUrlSubmit(elements);
        break;
      case 'postActive':
        renderOpenModal(initState, initState.postActive, elements);
        break;
      case 'modalBtn':
        renderClodseModal(value, elements);
        break;
      default:
        break;
    }
  });
  return watchedState;
};

// export default (state) => {
// const watchedValid = onChange(state, (path, value) => {
//   if (value === 'valid') {
//     renderFeedback(value);
//   } else if (value === 'invalid') {
//     renderFeedback(value);
//   } else if (value === 'was') {
//     renderFeedback(value);
//   } else if (value === '') {
//     renderFeedback(value);
//   } else if (value === 'processing') {
//     // console.log(state);
//     state.main.forEach((feed) => {
//       if (!state.added.includes(feed.date)) renderFeeds(feed);
//     });
//     state.items
//       .flat()
//       .reverse()
//       .forEach((item, index) => {
//         if (!state.added.includes(item.pubDate)) renderPosts(item, index);
//       });
//     // pushAdded(state.main, state.items, state);
//   } else if (value === 'processed') {
//     renderFeedback(value);
//   } else if (value === 'failed') {
//     renderFeedback(value);
//   }
// });

// const watchedPath = onChange(state, () => {
//   renderValidUrlSubmit();
//   // if (!state.checkedUrl.includes(state.inputUrl.url)) {
//   // getData(state);
//   // }
// });

// const watchedPostStatus = onChange(state, (path, value) => {
//   const { btn } = value;
//   renderOpenModal(state, btn);
// });

// const watchedModalStatus = onChange(state, (path, value) => {
//   const { kindBtn } = value;
//   renderClodseModal(kindBtn);
// });
// }
