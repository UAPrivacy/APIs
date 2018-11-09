const textAnalysis = require("./src/textAnalysis");
const summarizeBot = require("./src/summarizeBot");
const nodeSummary = require("./src/nodeSummary");

async function main() {
  console.log("text analysis:");
  await textAnalysis();
  console.log("");
  console.log("summarize bot:");
  await summarizeBot();
  console.log("");
  console.log("node summary:");
  await nodeSummary();
}

main();
