const axios = require("axios");

const { SAMPLES } = require("./utils");
const { MASHAPE } = require("./secrets.json");

const ENDPOINT_URL =
  "https://textanalysis-text-summarization.p.mashape.com/text-summarizer";
const SENT_NUM = 12;

async function fetch({ url, text }, website) {
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
  console.log(website);
  console.log(res.data.sentences);
}

async function main() {
  try {
    for (const { name, getText, url } of SAMPLES) {
      await fetch({ url }, name);
      const text = await getText();
      await fetch({ text }, name);
    }
  } catch ({ response: { status, statusText, config } }) {
    console.log(status, statusText, config.data);
  }
}

main();

module.exports = {
  main,
  name: "text analysis"
};
