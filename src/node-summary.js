const SummaryTool = require('node-summary');

async function getText(filename) {}
SummaryTool.summarize(title, content, function(err, summary) {
  if (err) console.log('Something went wrong man!');

  console.log(summary);

  console.log('Original Length ' + (title.length + content.length));
  console.log('Summary Length ' + summary.length);
  console.log(
    'Summary Ratio: ' +
      (100 - 100 * (summary.length / (title.length + content.length)))
  );
});
var url =
  'https://www.forbes.com/sites/viviennedecker/2017/05/14/meet-the-23-year-old-innovating-the-nail-industry-with-static-nails/#4b48c203487d';

SummaryTool.summarizeFromUrl(url, function(err, summary) {
  if (err) {
    console.log('err is ', result);
  } else {
    console.log(summary);
  }
});
