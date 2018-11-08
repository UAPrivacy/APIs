const fs = require('fs');
const util = require('util');
const { join } = require('path');

const readFile = util.promisify(fs.readFile);

async function getSampleText() {
  return await readFile(join(__dirname, 'sample.txt'));
}
const SAMPLE_URL = 'https://policies.google.com/terms';

module.exports = {
  getSampleText,
  SAMPLE_URL
};
