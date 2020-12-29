export default (response) => {
  const document = new DOMParser().parseFromString(response.data.contents, "text/xml");
  const error = document.querySelector('parsererror');
  if (error) {
    throw new Error(`Wrong ${document}`)
  }
  const title = document.querySelector('title').textContent
  const description = document.querySelector('description').textContent
  const date = document.querySelector('pubDate').textContent

  const items = [...document.querySelectorAll('item')].map(item => {
      return {
        title: item.querySelector('title').textContent,
        description: item.querySelector('description').textContent,
        link: item.querySelector('link').textContent,
        pubDate: item.querySelector('pubDate').textContent,
      }
    })

  return {
    main: {
      title,
      description,
      date,
    },
    items
  }
};
