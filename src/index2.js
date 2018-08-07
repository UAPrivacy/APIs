import { createWriteStream, createReadStream } from 'fs';

import { join } from 'path';
// import { get } from 'request';
// import { Parse } from 'unzip';
// import csv2 from 'csv2';
const csv = require('csvtojson');

// function fetch() {
//   const fileName = join(__dirname, 'data', 'list-1m.json');
//   const file = createWriteStream(fileName);
//   file.on('finish', () => console.log(`writing to ${fileName} complete!`));
//   file.on('error', function(err) {
//     console.error(`could not complete write: ${err}`);
//     throw err;
//   });
//   get('http://s3.amazonaws.com/alexa-static/top-1m.csv.zip')
//     .pipe(Parse())
//     .on('entry', entry => {
//       entry.pipe(csv2()).on('data', data => {
//         console.log(data);
//         file.write(
//           JSON.parse({
//             [data[0]]: data[1]
//           })
//         );
//       });
//     });
//   file.end();
// }

// fetch();

async function main() {
  const arr = await csv().fromFile('./data/list-1m.csv');
  const writeStream = createWriteStream(
    join(__dirname, 'data', 'list-1m.json')
  );
  const readstream = createReadStream(arr);
  readstream.pipe(writeStream);
  // file.on('finish', () => console.log(`writing complete!`));
  // file.on('error', function(err) {
  //   // console.error(`could not complete write: ${err}`);
  //   throw err;
  // });
  // jsonArray.forEach(function(v) {
  //   file.write(v.join(', ') + '\n');
  // });
  // file.end();
}

main()
  .then(() => console.log(`processing complete`))
  .catch(err => {
    console.error(err);
  });
