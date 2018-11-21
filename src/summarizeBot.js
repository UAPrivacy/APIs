const axios = require("axios");
const SAMPLE_DATA = require("./data");
const { SUMMARIZEBOT } = require("../secrets.json");

const ENDPOINT = "https://www.summarizebot.com/api/summarize";
const PERCENTAGE = 8;
const FILENAME = "#";

const selector = data => data[0].summary.map(data => data.sentence);

async function fetchText(text, website, input) {
  const { data } = await axios.post(ENDPOINT, Buffer.from(text), {
    params: {
      apiKey: SUMMARIZEBOT,
      size: PERCENTAGE,
      keywords: 0,
      fragments: 0,
      language: "English",
      filename: FILENAME
    },
    headers: {
      "Content-Type": "application/octet-stream"
    }
  });
  console.log(`${website} > ${input}`);
  console.log(selector(data));
}

async function fetchURL(url, website, input) {
  const { data } = await axios.get(ENDPOINT, {
    params: {
      apiKey: SUMMARIZEBOT,
      size: PERCENTAGE,
      keywords: 0,
      fragments: 0,
      language: "English",
      url
    }
  });
  console.log(`${website} > ${input}`);
  console.log(selector(data));
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
    const fetchTextPromise = fetchWrapper(fetchText, text, website, "text");
    const fetchURLPromise = fetchWrapper(fetchURL, url, website, "url");
    return Promise.all([fetchTextPromise, fetchURLPromise]);
  });

  await Promise.all(promises);
}

main();
