import i18next from 'i18next';

export default () => {
  const input = document.querySelector('input');
  const button = document.querySelector('.col-auto>button');
  const feedback = document.querySelector('.feedback');
  const flow = document.querySelector('.flow');
  const feedsTitle = document.querySelector('.feeds > ul');
  const posts = document.querySelector('.posts > ul');
  const modal = document.querySelector('#modal');
  const body = document.querySelector('body');
  const modalTitle = document.querySelector('.modal-title');
  const modalBody = document.querySelector('.modal-body');
  const modalLind = document.querySelector('.full-article');

  const renderFeedback = (value) => {
    switch (value) {
      case 'valid':
        button.removeAttribute('disabled');
        input.classList.add('is-valid');
        input.classList.remove('is-invalid');
        feedback.innerHTML = i18next.t('valid');
        feedback.classList.remove('text-danger');
        feedback.classList.add('text-success');
        break;
      case 'invalid':
        button.setAttribute('disabled', 'disabled');
        feedback.innerHTML = i18next.t('notValid');
        feedback.classList.add('text-danger');
        feedback.classList.remove('text-success');
        input.classList.add('is-invalid');
        input.classList.remove('is-valid');
        break;
      case 'was':
        button.setAttribute('disabled', 'disabled');
        feedback.innerHTML = i18next.t('was');
        feedback.classList.add('text-danger');
        feedback.classList.remove('text-success');
        input.classList.add('is-invalid');
        input.classList.remove('is-valid');
        break;
      case '':
        button.setAttribute('disabled', 'disabled');
        feedback.innerHTML = i18next.t('processing');
        break;
      case 'processed':
      // button.setAttribute('disabled', 'disabled');
        feedback.classList.remove('text-danger');
        feedback.classList.add('text-success');
        feedback.innerHTML = i18next.t('processed');
        break;
      case 'failed':
      // button.setAttribute('disabled', 'disabled');
        feedback.innerHTML = i18next.t('falied');
        feedback.classList.add('text-danger');
        feedback.classList.remove('text-success');
        break;
      default: throw new Error(`Unknown ${value}`);
    }
  };

  const renderValidUrlSubmit = () => {
    input.value = '';
    input.classList.remove('is-valid');
  };

  const renderFeeds = (feed) => {
    flow.classList.remove('disabled');
    const li = document.createElement('li');
    li.classList.add('list-group-item');
    li.innerHTML = `<h3>${feed.title}</h3>
  <p>${feed.description}</p>`;
    feedsTitle.prepend(li);
  };

  const renderPosts = (item, index) => {
    const li = document.createElement('li');
    li.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-start');
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
    posts.prepend(li);
  };

  const renderOpenModal = (state, value) => {
    const { kind } = value;
    if (kind.classList[0] === 'btn') {
      modalTitle.textContent = `${state.items.flat()[kind.dataset.id - 1].title}`;
      modalBody.textContent = `${
        state.items.flat()[kind.dataset.id - 1].description
      }`;
      modalLind.setAttribute(
        'href',
        `${state.items.flat()[kind.dataset.id - 1].link}`,
      );
      modal.style.display = 'block';
      body.classList.add('modal-open');
      kind.previousSibling.previousSibling.classList.add('font-weight-normal');
    }
    if (kind.classList[0] === 'postLink') {
      kind.classList.add('font-weight-normal');
    }
  };

  const renderClodseModal = (value) => {
    const { kindBtn } = value;
    if (
      kindBtn.classList[0] === 'close'
    || kindBtn.classList[0] === 'modal'
    || kindBtn.textContent.trim() === 'Close'
    || kindBtn.textContent.trim() === 'x'
    ) {
      modal.style.display = '';
      body.classList.remove('modal-open');
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
