const axios = require("axios");
const SAMPLE_DATA = require("./data");
const { SMMRY } = require("../secrets.json");
const { createQueryString } = require("./utils");

const ENDPOINT_URL = "http://api.smmry.com";

function fetchSummaries(url, website) {
  const options = {
    SM_API_KEY: SMMRY,
    SM_URL: url
  };
  axios
    .post(`${ENDPOINT_URL}?${createQueryString(options)}`, {
      params: {
        headers: { Expect: "100-continue" }
      }
    })
    .then(res => {
      console.log(`${website} > url`);
      return console.log(res.data.sm_api_content + "\n");
    })
    .catch(err => console.error(err.response));
}

function main() {
  for (const { url, website } of SAMPLE_DATA) {
    setTimeout(() => {
      fetchSummaries(url, website);
    }, 1000 * 10);
  }
}

(async () => await main())();
