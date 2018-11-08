const fs = require('fs');
const util = require('util');

const readFile = util.promisify(fs.readFile);

async function getSampleText() {
  const filename = 'sample.txt';
  return await readFile(filename);
}
const SAMPLE_URL = 'https://policies.google.com/terms';

module.exports = {
  getSampleText,
  SAMPLE_URL
};
