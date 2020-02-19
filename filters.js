const metadata = require("./_data/metadata.json");

function twoDigits(number) {
  return String(number).padStart(2, "0");
}

/** Returns a directory string based on a date object. Note: This will not play nicely with timestamped dates; refactor this if you want exact publish times */
function dateToUrl(date) {
  // Month + 1 – JS months are 0 indexed
  // Date + 1 – Eleventy assumes UTC, while Ruby (Liquid) runs with timezone
  return `${date.getFullYear()}/${twoDigits(date.getMonth() + 1)}/${twoDigits(
    date.getDate() + 1
  )}`;
}

/** Returns an absolute url based on the url in metadata.json */
function absoluteUrl(url) {
  // TODO: See if you can hijack this to build dev routes
  // Slice because the url has an initial `/`
  return `${metadata.url}${url.slice(1)}`;
}

module.exports = {
  absoluteUrl: ["absoluteUrl", absoluteUrl],
  dateToUrl: ["dateToUrl", dateToUrl]
};
