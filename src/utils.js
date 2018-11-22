const createQueryString = params =>
  Object.keys(params)
    .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(params[key]))
    .join("&");

module.exports = {
  createQueryString
};
