import SummaryTool from 'node-summary';

export default function main() {
  const url = 'https://policies.google.com/terms';
  SummaryTool.summarizeFromUrl(url, function(err, summary) {
    if (err) {
      console.log('err is ', result);
    } else {
      console.log(summary);
    }
  });
}
