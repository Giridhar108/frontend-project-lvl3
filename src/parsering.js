export default (data) => {
  const document = new DOMParser().parseFromString(data, 'text/xml');
  const error = document.querySelector('parsererror');
  if (error) {
    return 'Error';
  }
  const title = document.querySelector('title').textContent;
  const description = document.querySelector('description').textContent;
  const date = document.querySelector('pubDate').textContent;

  const items = [...document.querySelectorAll('item')].map((item) => ({
    title: item.querySelector('title').textContent,
    description: item.querySelector('description').textContent,
    link: item.querySelector('link').textContent,
    pubDate: item.querySelector('pubDate').textContent,
  }));

  return {
    main: {
      title,
      description,
      date,
    },
    items,
  };
};
