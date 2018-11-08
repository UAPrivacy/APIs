const fs = require('fs');
const util = require('util');
const nodeSummary = require('node-summary');

function fetchWithContent() {
  const content = getText('sample.txt');
  const title = 'sample summaries';
  nodeSummary.summarize(title, content, function(err, summary) {
    if (err) console.error('Something went wrong!');
    // console.log('Original Length ' + (title.length + content.length));
    // console.log('Summary Length ' + summary.length);
    console.log(
      'Summary Ratio: ' +
        (100 - 100 * (summary.length / (title.length + content.length)))
    );
  });
}

function fetchWithURL(url) {
  nodeSummary.summarizeFromUrl(url, function(err, summary) {
    if (err) {
      console.error(err);
    } else {
      console.log(summary);
    }
  });
}

fetchWithContent();
fetchWithURL('https://policies.google.com/terms');
