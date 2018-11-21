const axios = require("axios");
const SAMPLE_DATA = require("./data");
const { SMMRY } = require("../secrets.json");
const { createQueryString } = require("./utils");

// A limit of 100 free API requests can be made daily, and each request must be at least 10 seconds apart.
const ENDPOINT_URL = "http://api.smmry.com";

const NUM_SENTENCES = 7;

function fetch(url) {
  const OPTIONS = {
    SM_API_KEY: SMMRY,
    SM_URL: url,
    SM_LENGTH: NUM_SENTENCES,
    SM_KEYWORD_COUNT: 0,
    SM_WITH_BREAK: "\n",
    SM_IGNORE_LENGTH: true
  };
  axios
    .post(`${ENDPOINT_URL}/${createQueryString(OPTIONS)}`, {
      params: {
        headers: { Expect: "" }
      }
    })
    .then(res => console.log(res.data))
    .catch(err => console.error(err));
}

function catchError(website, input, { response: { status, statusText } }) {
  console.log(`${website} > ${input}`);
  console.error(status, statusText);
}

function fetchWrapper(fetch, param, website, input) {
  return fetch(param, website, input).catch(err =>
    catchError(website, input, err)
  );
}

async function main() {
  const promises = SAMPLE_DATA.map(async ({ website, getText, url }) => {
    const text = await getText;
    const fetchTextPromise = fetchWrapper(fetch, text, website, "text");
    const fetchURLPromise = fetchWrapper(fetch, url, website, "url");
    return Promise.all([fetchTextPromise, fetchURLPromise]);
  });
  await Promise.all(promises);
}

module.exports = main;
