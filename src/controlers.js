import * as yup from "yup";
import { setLocale } from "yup";
import { watchedValid, watchedPath } from "./watchers";
import axios from "axios";
import parser from "./parser";

export const validate = (e) => {
  const url = e.target.value;
  setLocale({
    number: {
      min: ({ min }) => ({ key: "field_too_short", values: { min } }),
    },
  });

  const schema = yup.object().shape({
    url: yup.string().min(5).url(),
  });

  schema
    .isValid({
      url: `${url}`,
    })
    .then((valid) => {
      if (valid) {
        watchedValid.inputUrl.status = "valid";
      } else {
        watchedValid.inputUrl.status = "invalid";
      }
    });
};

export const getUrl = (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  const url = formData.get("url");
  watchedValid.inputUrl.status = "";

  if (!watchedPath.inputUrl.url.includes(url)) {
    watchedPath.inputUrl.url.push(url);
  }
};

export const getData = (value, state) => {
  value.map((pathRss) =>
    axios.get(`https://api.allorigins.win/get?url=${encodeURIComponent(pathRss)}`)
      .then((response) => {
        if (!state.checkedUrl.includes(response.config.url)) {
          state.checkedUrl.push(response.config.url);

          state.main.push(parser(response).main);
          state.items.push(parser(response).items);

          watchedValid.inputUrl.status = "ready";
        } else {
          console.log(response.data.contents);
          parser(response).items.map((item) => {
            if (!state.added.includes(item.pubDate)) {
              state.items.push(item);
            }
          });
          console.log(parser(response))
        }
      })
      .then(() => setTimeout(getData, 5000, state.inputUrl.url, state))

  );
};

export const pushAdded = (main, items, state) => {
  main.map((a) => {
    if (!state.added.includes(a.date)) {
      state.added.push(a.date);
    }
  });
  items.flat().map((a) => {
    if (!state.added.includes(a.pubDate)) {
      state.added.push(a.pubDate);
    }
  });
};
