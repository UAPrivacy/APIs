import { createWriteStream } from 'fs';
import { get } from 'request';
import { Parse } from 'unzip';
import csv2 from 'csv2';
import { join } from 'path';

const fileName = join(__dirname, 'data', 'data.json');
const writeStream = createWriteStream(fileName);
writeStream.on('finish', () => console.log(`writing to ${fileName} complete`));
const contentToWrite = [];

get('http://s3.amazonaws.com/alexa-static/top-1m.csv.zip')
  .pipe(Parse())
  .on('entry', (entry) => {
    entry.pipe(csv2()).on('data', (data) => {
      contentToWrite.push(data[1]);
    });
  });

