import axios from 'axios';

const SUMMARIZEBOT = '736c194ce5d840ddafebd2d46b43a839';

async function summarizeText(text) {
  const endpoint = 'https://www.summarizebot.com/api/summarize';
  //   const blob = new Blob([text], { type: 'application/octet-stream' });
  const blob = Buffer.from([text]);
  const { data, status } = await axios.post(endpoint, blob, {
    params: {
      apiKey: SUMMARIZEBOT,
      size: 10,
      keywords: 10,
      fragments: 10,
      language: 'English'
    },
    headers: {
      'Content-Type': 'application/octet-stream'
    }
  });

  if (status >= 400) {
    throw Error(`status: ${status}`);
  }
  if (data.error) {
    throw Error(data.error.message);
  }
  return data;
}

async function summarizeURL(url) {
  const endpoint = 'https://www.summarizebot.com/api/summarize';
  const { data, status } = await axios.get(endpoint, {
    params: {
      apiKey: SUMMARIZEBOT,
      size: 10,
      keywords: 10,
      fragments: 10,
      language: 'English',
      url
    }
  });

  if (status >= 400) {
    throw Error(`status: ${status}`);
  }
  if (data.error) {
    throw Error(data.error.message);
  }
  return data;
}

const selector = data => data[0].summary.map(obj => obj.sentence);

const fetch = (param, summarizer) => {
  return new Promise((resolve, reject) => {
    summarizer(param)
      .then(data => resolve(selector(data)))
      .catch(err => reject(err));
  });
};

const init = async ({ url, text }) => {
  const [summaryURL, summaryText] = await Promise.all([
    // fetch(text, summarizeText),
    fetch(url, summarizeURL)
  ]).catch(err => console.error(err));

  console.log(`summary from text: ${summaryURL}`);
  console.log(`summary from URL: ${summaryText}`);
};

const url = 'https://www.starwoodhotels.com/preferredguest/legal/privacy.html';
const text = '';
init({ url, text });
