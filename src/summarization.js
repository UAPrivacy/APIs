const SAMPLE_DATA = require("./data");
const { SMMRY } = require("../secrets.json");

function fetchSummaries() {
  unirest
    .get(
      "https://meaningcloud-summarization-v1.p.mashape.com/summarization-1.0?sentences=5&url=http%3A%2F%2Fen.wikipedia.org%2Fwiki%2FStar_Trek"
    )
    .header(
      "X-Mashape-Key",
      "n4uDm4302GmshrAjrxTiwEO2gBETp1izP1Ljsn8vkEjdUbSqia"
    )
    .header("Accept", "application/json")
    .end(function(result) {
      console.log(result.status, result.headers, result.body);
    });
}

async function main() {
  const promises = SAMPLE_DATA.map(async ({ website, getText, url }) => {
    const text = await getText;
    const fetchTextPromise = fetchSummaries(fetch, text, website, "text");
    const fetchURLPromise = fetchSummaries(fetch, url, website, "url");
    return Promise.all([fetchTextPromise, fetchURLPromise]);
  });
  await Promise.all(promises);
}
