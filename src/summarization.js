const unirest = require("unirest");
const SAMPLE_DATA = require("./data");
const { createQueryString } = require("./utils");
const { MASHAPE } = require("../secrets.json");

const NUM_SENTENCES = 5;

function fetchSummaries(url) {
  const options = {
    sentences: NUM_SENTENCES,
    url
  };
  return new Promise(resolve => {
    unirest
      .get(
        `https://meaningcloud-summarization-v1.p.mashape.com/summarization-1.0?${createQueryString(
          options
        )}`
      )
      .header("X-Mashape-Key", MASHAPE)
      .header("Accept", "application/json")
      .end(function(result) {
        resolve(result.body.summary + "\n");
      });
  });
}

async function main() {
  for (const { website, url } of SAMPLE_DATA) {
    console.log(`${website} > url`);
    const text = await fetchSummaries(url, website);
    console.log(text);
  }
}

(async () => await main())();
