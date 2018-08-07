import { createWriteStream, createReadStream } from 'fs';
import csv2 from 'csv2';
import through2 from 'through2';
import { join } from 'path';

const fileName = join(__dirname, 'data', 'list-1m');
const writeStream = createWriteStream(`${fileName}.json`);
createReadStream(`${fileName}.csv`)
  .pipe(csv2())
  .pipe(
    through2({ objectMode: true }, function(chunk, enc, callback) {
      this.push(
        JSON.stringify({
          rank: chunk[0],
          url: chunk[1]
        })
      );
      callback();
    })
  )
  .pipe(writeStream);