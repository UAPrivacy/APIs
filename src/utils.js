const fs = require("fs");
const util = require("util");
const { join } = require("path");

const readFile = util.promisify(fs.readFile);

function read(filename) {
  return readFile(join(__dirname, filename), "utf-8");
}
const getTwitterText = read("twitter.txt");
const getGoogleText = read("google.txt");
const getFacebookText = read("facebook.txt");

const GOOGLE_URL = "https://policies.google.com/terms";
const FACEBOOK_URL = "https://www.facebook.com/terms.php";
const TWITTER_URL = "https://twitter.com/en/tos";

const SAMPLES = {
  facebook: {
    text: getFacebookText,
    url: FACEBOOK_URL
  },
  twitter: {
    text: getTwitterText,
    url: TWITTER_URL
  },
  google: {
    text: getGoogleText,
    url: GOOGLE_URL
  }
};

module.exports = {
  SAMPLES
};
