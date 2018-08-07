import { createWriteStream } from 'fs';
import { get } from 'request';
import { Parse } from 'unzip';
import csv2 from 'csv2';
import { join } from 'path';

function writeToFile(arr) {
  const fileName = join(__dirname, 'data', 'list-1m.json');
  const file = createWriteStream(fileName);
  file.on('finish', () => console.log(`writing to ${fileName} complete`));
  file.on('error', function(err) {
    throw err;
  });
  arr.forEach(function(v) {
    file.write(v.join(', ') + '\n');
  });
  file.end();
}

function fetch() {
  return new Promise((resolve, reject) => {
    const arr = [];
    get('http://s3.amazonaws.com/alexa-static/top-1m.csv.zip')
      .pipe(Parse())
      .on('entry', entry => {
        entry.pipe(csv2()).on('data', data => {
          arr.push(data[1]);
        });
      });
    if (arr.length === 0) {
      reject(Error`unexpected empty array`);
    } else {
      resolve(arr);
    }
  });
}

function main() {
  fetch()
    .then(arr => writeToFile(arr))
    .catch(err => console.error(err));
}
main();
