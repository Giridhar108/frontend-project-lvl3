import i18next from 'i18next';

export default () => {
  const renderFeeds = (feed, elements) => {
    elements.flow.classList.remove('disabled');
    const li = document.createElement('li');
    li.classList.add('list-group-item');
    li.innerHTML = `<h3>${feed.title}</h3>
  <p>${feed.description}</p>`;
    elements.feedsTitle.prepend(li);
  };

  const renderPosts = (item, index, elements) => {
    const li = document.createElement('li');
    li.classList.add(
      'list-group-item',
      'd-flex',
      'justify-content-between',
      'align-items-start',
    );
    li.innerHTML += `
  <a
    href="${item.link}"
    class="postLink font-weight-bold"
    data-id="${index + 1}"
    target="_blank"
    rel="noopener noreferrer"
  >${item.title}</a>
  <button
    type="button"
    class="btn btn-primary btn-sm"
    data-id="${index + 1}"
    data-toggle="modal"
    data-target="#modal"
  >Preview</button>`;
    elements.posts.prepend(li);
  };

  const renderFeedback = (value, initState, elements) => {
    console.log(value);
    switch (value) {
      case 'valid':
        elements.button.removeAttribute('disabled');
        elements.input.classList.add('is-valid');
        elements.input.classList.remove('is-invalid');
        elements.feedback.innerHTML = i18next.t('valid');
        elements.feedback.classList.remove('text-danger');
        elements.feedback.classList.add('text-success');
        break;
      case 'invalid':
        elements.button.setAttribute('disabled', 'disabled');
        elements.feedback.innerHTML = i18next.t('notValid');
        elements.feedback.classList.add('text-danger');
        elements.feedback.classList.remove('text-success');
        elements.input.classList.add('is-invalid');
        elements.input.classList.remove('is-valid');
        break;
      case 'was':
        elements.button.setAttribute('disabled', 'disabled');
        elements.feedback.innerHTML = i18next.t('was');
        elements.feedback.classList.add('text-danger');
        elements.feedback.classList.remove('text-success');
        elements.input.classList.add('is-invalid');
        elements.input.classList.remove('is-valid');
        break;
      case '':
        elements.button.setAttribute('disabled', 'disabled');
        elements.feedback.innerHTML = i18next.t('processing');
        break;
      case 'processed':
        // button.setAttribute('disabled', 'disabled');
        elements.feedback.classList.remove('text-danger');
        elements.feedback.classList.add('text-success');
        elements.feedback.innerHTML = i18next.t('processed');
        break;
      case 'failed':
        // button.setAttribute('disabled', 'disabled');
        elements.feedback.innerHTML = i18next.t('falied');
        elements.feedback.classList.add('text-danger');
        elements.feedback.classList.remove('text-success');
        break;
      case 'processing':
        initState.main.forEach((feed) => {
          if (!initState.added.includes(feed.date)) renderFeeds(feed, elements);
        });
        initState.items
          .flat()
          .reverse()
          .forEach((item, index) => {
            if (!initState.added.includes(item.pubDate)) renderPosts(item, index, elements);
          });
        break;
      default:
        throw new Error(`Unknown ${value}`);
    }
  };

  const renderValidUrlSubmit = (elements) => {
    elements.input.value = '';
    elements.input.classList.remove('is-valid');
  };

  const renderOpenModal = (state, value, elements) => {
    const { btn } = value;
    if (btn.classList[0] === 'btn') {
      elements.modalTitle.textContent = `${
        state.items.flat()[btn.dataset.id - 1].title
      }`;
      elements.modalBody.textContent = `${
        state.items.flat()[btn.dataset.id - 1].description
      }`;
      elements.modalLind.setAttribute(
        'href',
        `${state.items.flat()[btn.dataset.id - 1].link}`,
      );
      elements.modal.style.display = 'block';
      elements.body.classList.add('modal-open');
      btn.previousSibling.previousSibling.classList.add('font-weight-normal');
    }
    if (btn.classList[0] === 'postLink') {
      elements.btn.classList.add('font-weight-normal');
    }
  };

  const renderClodseModal = (value, elements) => {
    const { kindBtn } = value;
    if (
      kindBtn.classList[0] === 'close'
      || kindBtn.classList[0] === 'modal'
      || kindBtn.textContent.trim() === 'Close'
      || kindBtn.textContent.trim() === 'x'
    ) {
      elements.modal.style.display = '';
      elements.body.classList.remove('modal-open');
    }
  };
  return {
    renderFeedback,
    renderValidUrlSubmit,
    renderFeeds,
    renderPosts,
    renderOpenModal,
    renderClodseModal,
  };
};
