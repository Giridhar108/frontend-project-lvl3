const input = document.querySelector('input');
const button = document.querySelector('.col-auto>button');
const feedback = document.querySelector('.feedback');
const flow = document.querySelector('.flow');
const feedsTitle = document.querySelector('.feeds > ul');
const posts = document.querySelector('.posts > ul');

export const renderValidUrl = () => {
  button.removeAttribute('disabled');
  input.classList.add('is-valid');
  input.classList.remove('is-invalid');
  feedback.innerHTML = '';
};

export const renderInvalidUrl = () => {
  button.setAttribute('disabled', 'disabled');
  feedback.innerHTML = 'must be valid';
  feedback.classList.add('text-danger');
  input.classList.add('is-invalid');
  input.classList.remove('is-valid');
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

export const renderPosts = (feed) => {
  posts.innerHTML += `<li
  class="list-group-item d-flex justify-content-between align-items-start"
>
  <a
    href="${feed.link}"
    class="postLink font-weight-bold"
    data-id="2"
    target="_blank"
    rel="noopener noreferrer"
  >${feed.title}</a>
  <button
    type="button"
    class="btn btn-primary btn-sm"
    data-id="2"
    data-toggle="modal"
    data-target="#modal"
  >Preview</button>
</li>`;
};
/*
export const renderRss = (main, items) => {
  flow.classList.remove("disabled");
  main.map((a) => {
    feedsTitle.append(a.title);
    feedsDescription.append(a.description);
  });

  items.flat().map((a, index) => {
    const li = document.createElement('li')
    const linkA = document.createElement('a')
    const text = document.createTextNode(`${a.title}`)
    linkA.setAttribute('href', `${a.link}`);
    linkA.classList.add('postLink', 'font-weight-bold')
    linkA.setAttribute('data-id', `${index + 1}`)
    linkA.setAttribute('target', `_blank`)
    linkA.setAttribute('rel', "noopener noreferrer")
    linkA.append(text)

    const button = document.createElement('button')
    button.classList.add('btn', 'btn-primary', 'btn-sm')
    button.setAttribute('data-id', `${index + 1}`)
    button.setAttribute('data-toggle', 'modal')
    button.setAttribute('data-target', '#modal')
    button.append('Preview')

    li.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-start')
    li.append(linkA)
    li.append(button)

    posts.append(li)

  });
};
 */
