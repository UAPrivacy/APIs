const nodeSummary = require("node-summary");
const SAMPLE_DATA = require("./data");

function fetchTextPromise(title, text, website, input) {
  nodeSummary.summarize(title, text, function(err, summaries) {
    if (err) logError(err, website, input);
    else logResults(summaries, website, input);
  });
}

function fetchURLPromise(url, website, input) {
  nodeSummary.summarizeFromUrl(url, function(err, summaries) {
    if (err) logError(err, website, input);
    else logResults(summaries, website, input);
  });
}

function logError(error, website, input) {
  console.log(`${website} > ${input}`);
  console.log(error);
}

function logResults(summaries, website, input) {
  console.log(`${website} > ${input}`);
  console.log(summaries);
}

async function main() {
  const promises = SAMPLE_DATA.map(async ({ website, getText, url }) => {
    const text = await getText;
    const fetchText = fetchTextPromise(text, website, "text");
    const fetchURL = fetchURLPromise(url, website, "url");
    return Promise.all([fetchText, fetchURL]);
  });
  await Promise.all(promises);
}

main();

module.exports = main;
