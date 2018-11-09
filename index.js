const {
  main: textAnalysis,
  name: textAnalysisName
} = require("./src/textAnalysis");
const {
  main: summarizeBot,
  name: summarizeBotName
} = require("./src/summarizeBot");

console.log(textAnalysisName);
textAnalysis();

console.log(summarizeBotName);
summarizeBot();
