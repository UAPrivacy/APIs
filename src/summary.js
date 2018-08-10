var SummaryTool = require('node-summary');

const url = 'https://policies.google.com/terms';
SummaryTool.summarizeFromUrl(url, function(err, summary) {
  if (err) {
    console.log('err is ', result);
  } else {
    console.log(summary);
  }
});
