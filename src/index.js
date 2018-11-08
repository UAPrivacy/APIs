const unirest = require('unirest');
const axios = require('axios');

function fetchUnirest() {
  unirest
    .post(
      'https://textanalysis-text-summarization.p.mashape.com/text-summarizer'
    )
    .header(
      'X-Mashape-Key',
      'n4uDm4302GmshrAjrxTiwEO2gBETp1izP1Ljsn8vkEjdUbSqia'
    )
    .header('Content-Type', 'application/json')
    .header('Accept', 'application/json')
    .send({
      url: 'http://en.wikipedia.org/wiki/Automatic_summarization',
      text: '',
      sentnum: 8
    })
    .end(function(result) {
      console.log(result.status, result.headers, result.body);
    });
}

async function fetchAxios() {
  const res = await axios.post(
    'https://textanalysis-text-summarization.p.mashape.com/text-summarizer',
    {
      url: 'http://en.wikipedia.org/wiki/Automatic_summarization',
      sentnum: 8,
      text: ''
    },
    {
      headers: {
        'X-Mashape-Key': 'n4uDm4302GmshrAjrxTiwEO2gBETp1izP1Ljsn8vkEjdUbSqia',
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    }
  );
  console.log(res.data.sentences);
}

fetchAxios();
