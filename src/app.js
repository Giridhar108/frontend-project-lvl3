import * as yup from "yup";

const state = {
  websiteValid: "wait",
  websiteRss: [],
};

const input = document.querySelector("input");
const button = document.querySelector(".col-auto>button");

const validate = (e) => {
  const website = e.target.value;
  let schema = yup.object().shape({
    website: yup.string().url(),
  });
  schema
    .isValid({
      website: `${website}`,
    })
    .then(function (valid) {
      if (valid) {
        button.removeAttribute("disabled");
        input.classList.add("is-valid");
        input.classList.remove("is-invalid");
        const form = document.querySelector(".rss-form");
        form.addEventListener("submit", (e) => {
          e.preventDefault();
          const formData = new FormData(e.target);
          const url = formData.get("url");
          state.websiteValid = "valid";
          console.log(url, "sdfg");
          console.log(state);
          if (!state.websiteRss.includes(url)) {
            state.websiteRss.push(url);
          }
        });
      } else {
        button.setAttribute("disabled", "disabled");
        input.classList.add("is-invalid");
        input.classList.remove("is-valid");
        state.websiteValid = "invalid";
        console.log(state);
      }
    });
};

export default () => {
  const input = document.querySelector("input");
  input.addEventListener("input", validate);
};
