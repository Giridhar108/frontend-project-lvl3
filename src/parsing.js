export default (data) => {
  const document = new DOMParser().parseFromString(data, 'text/xml');
  const error = document.querySelector('parsererror');
  if (error) {
    console.log('pars')
    return 'Error';
  }

  const title = document.querySelector('title').textContent;
  const description = document.querySelector('description').textContent;
  const pubDate = document.querySelector('pubDate').textContent;

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
      pubDate,
    },
    items,
  };
};
