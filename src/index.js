import { createWriteStream, createReadStream } from 'fs';
import csv2 from 'csv2';
import through2 from 'through2';
import { join } from 'path';
import { Readable } from 'stream';

const fileName = join(__dirname, 'data', 'list-1m');

const arr = [];
createReadStream(`${fileName}.csv`)
  .pipe(csv2())
  .pipe(
    through2({ objectMode: true }, function(chunk, enc, callback) {
      this.push({
        Rank: chunk[0],
        URL: chunk[1]
      });
      callback();
    })
  )
  .on('data', data => {
    arr.push(data);
  })
  .on('end', () => {
    console.log(`${arr.length} items in arr. Now writing...`);
    const readStream = Readable({
      read(size) {
        this.push(JSON.stringify(arr));
        this.push(null);
      }
    });
    const writeStream = createWriteStream(`${fileName}.json`);
    writeStream.on('finish', () =>
      console.log(`writing to JSON file complete`)
    );
    readStream.pipe(writeStream);
  });
