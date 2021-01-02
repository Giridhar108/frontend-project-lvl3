import i18next from 'i18next';

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
export const renderFeedback = (value) => {
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
    case 'processing':
      button.setAttribute('disabled', 'disabled');
      feedback.innerHTML = i18next.t('processing');
      break;
    case 'processed':
      // button.setAttribute('disabled', 'disabled');
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
export const renderValidUrlSubmit = () => {
  input.value = '';
  input.classList.remove('is-valid');
};

export const renderFeeds = (feed) => {
  flow.classList.remove('disabled');
  feedsTitle.innerHTML += `<li class="list-group-item">
  <h3>${feed.title}</h3>
  <p>${feed.description}</p>
  </li>`;
};

export const renderPosts = (item, index) => {
  posts.innerHTML += `<li
  class="list-group-item d-flex justify-content-between align-items-start">
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
  >Preview</button>
</li>`;
};

export const renderOpenModal = (state, kind) => {
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

export const renderClodseModal = (kindBtn) => {
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
