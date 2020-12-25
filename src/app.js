import * as yup from "yup";
import { setLocale } from "yup";
const onChange = require("on-change");
const axios = require('axios');

export default () => {
  const input = document.querySelector("input");
  const button = document.querySelector(".col-auto>button");
  const feedback = document.querySelector(".feedback");

  const state = {
    inputRss: {
      errors: [],
      websiteValid: "filling",
      websiteRss: [],
    },
  };

  const watchedValid = onChange(state, (path, value, previousValue) => {
    if (value === "valid") {
      button.removeAttribute("disabled");
      input.classList.add("is-valid");
      input.classList.remove("is-invalid");
      feedback.innerHTML = "";
    } else if (value === "invalid") {
      button.setAttribute("disabled", "disabled");
      feedback.innerHTML = "must be valid";
      feedback.classList.add("text-danger");
      input.classList.add("is-invalid");
      input.classList.remove("is-valid");
    }
  });

  const watchedPath = onChange(state, (path, value, previousValue) => {
    input.value = ''
    input.classList.remove("is-valid");
    value.map(path => axios.get(`${path}`)
      .then((response) => {
      let parser = new DOMParser()
      let doc = parser.parseFromString(response, 'text/xml')
      console.log(response);
        console.log(doc);
        
      return response;
     })
    .then((article) => {
      console.log(article);
    })
    .catch(console.error))
  })

  const validate = (e) => {
    const path = e.target.value;

    setLocale({
      number: {
        min: ({ min }) => ({ key: "field_too_short", values: { min } }),
      },
    });

    const schema = yup.object().shape({
      path: yup.string().min(5).url(),
    });

    schema
      .isValid({
        path: `${path}`,
      })
      .then((valid) => {
        if (valid) {
          watchedValid.inputRss.websiteValid = "valid";
          const form = document.querySelector(".rss-form");
          form.addEventListener("submit", (event) => {
            event.preventDefault();
            const formData = new FormData(event.target);
            const url = formData.get("url");
            if (!state.inputRss.websiteRss.includes(url)) {
              watchedPath.inputRss.websiteRss.push(url);
            }
          });
        } else {
          watchedValid.inputRss.websiteValid = "invalid";
        }
      });
  };

  input.addEventListener("input", validate);
};
