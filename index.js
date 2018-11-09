const textAnalysis = require("./src/textAnalysis");
const summarizeBot = require("./src/summarizeBot");

async function main() {
  console.log("text analysis:");
  await textAnalysis();
  console.log("");
  console.log("summarize bot:");
  await summarizeBot();
}

main();
