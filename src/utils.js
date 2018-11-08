const fs = require("fs");
const util = require("util");
const { join } = require("path");

const readFile = util.promisify(fs.readFile);

function read(filename) {
  return readFile(join(__dirname, "textFiles", filename), "utf-8");
}
const getTwitterText = read("twitter.txt");
const getGoogleText = read("google.txt");
const getFacebookText = read("facebook.txt");

const GOOGLE_URL = "https://policies.google.com/terms";
const FACEBOOK_URL = "https://www.facebook.com/terms.php";
const TWITTER_URL = "https://twitter.com/en/tos";

const SAMPLES = [
  {
    name: "facebook",
    getText: getFacebookText,
    url: FACEBOOK_URL
  },
  {
    name: "twitter",
    getText: getTwitterText,
    url: TWITTER_URL
  },
  {
    name: "google",
    getText: getGoogleText,
    url: GOOGLE_URL
  }
];

module.exports = {
  SAMPLES
};
