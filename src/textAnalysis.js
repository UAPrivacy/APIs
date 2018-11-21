const axios = require("axios");
const SAMPLE_DATA = require("./data");
const { MASHAPE } = require("../secrets.json");

const ENDPOINT_URL =
  "https://textanalysis-text-summarization.p.mashape.com/text-summarizer";
const SENT_NUM = 12;

async function fetch({ url = "", text = "" }, website, input) {
  const res = await axios.post(
    ENDPOINT_URL,
    {
      url,
      sentnum: SENT_NUM,
      text
    },
    {
      headers: {
        "X-Mashape-Key": MASHAPE,
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    }
  );
  console.error(`${website} > ${input}`);
  console.log(res.data.sentences);
}

function catchError(website, input, { response: { status, statusText } }) {
  console.error(`${website} > ${input}`);
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
    const fetchText = fetchWrapper(fetch, { text }, website, "text");
    const fetchURL = fetchWrapper(fetch, { url }, website, "url");
    return Promise.all([fetchText, fetchURL]);
  });
  await Promise.all(promises);
}

main();
