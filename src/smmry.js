const axios = require("axios");
const { SMMRY } = require("../secrets.json");

const ENDPOINT_URL = `http://api.smmry.com/&SM_API_KEY=${SMMRY}&URL=${"https://twitter.com/en/tos"}`;

axios
  .post(
    ENDPOINT_URL,
    { sm_api_input: "some text here" },
    {
      params: {
        headers: { Expect: "" }
      }
    }
  )
  .then(res => console.log(res.data))
  .catch(err => console.error(err));
