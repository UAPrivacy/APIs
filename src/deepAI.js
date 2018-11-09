const request = require("request");
const { DEEPAI } = require("../secrets.json");

const SAMPLE_DATA = "./data.js";

function getSummaries(text) {
  request.post(
    {
      url: "https://api.deepai.org/api/summarization",
      headers: {
        "Api-Key": DEEPAI
      },
      formData: {
        text
      }
    },
    function callback(err, httpResponse, body) {
      if (err) {
        console.error("request failed:", err);
        return;
      }
      const response = JSON.parse(body);
      console.log(response);
    }
  );
}

async function main() {
  const sampleText = await SAMPLE_DATA[0].getText;
  console.log(sampleText);
  getSummaries(sampleText);
}

main();
