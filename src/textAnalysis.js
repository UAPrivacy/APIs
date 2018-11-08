const axios = require("axios");

const {
  getSampleText,
  FACEBOOK_URL,
  TWITTER_URL,
  GOOGLE_URL
} = require("./utils");
const { MASHAPE } = require("./secrets.json");

const API = "text analysis";
const SENT_NUM = 12;
const ENDPOINT_URL =
  "https://textanalysis-text-summarization.p.mashape.com/text-summarizer";

async function fetch({ url, text }, context) {
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
  console.log(API, context);
  console.log(res.data.sentences);
}

async function main() {
  try {
    const text = await getSampleText();
    await fetch({ text }, "text");
    await fetch(
      { url: "http://en.wikipedia.org/wiki/Automatic_summarization" },
      "URL"
    );
  } catch (error) {
    console.log(error);
  }
}
main();
