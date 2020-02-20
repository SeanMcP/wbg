const metadata = require("./_data/metadata.json");
const format = require('date-fns/format')

function twoDigits(number) {
  return String(number).padStart(2, "0");
}

/** Returns a directory string based on a date object OR UTC string */
function dateToUrl(date) {
  switch (typeof date) {
    case 'object': {
      // Month + 1 – JS months are 0 indexed
      // Date + 1 – Eleventy assumes UTC, while Ruby (Liquid) runs with timezone
      return `${date.getFullYear()}/${twoDigits(date.getMonth() + 1)}/${twoDigits(
        date.getDate() + 1
      )}`;
    }
    case 'string': {
      return `${date.slice(0, 4)}/${date.slice(5, 7)}/${date.slice(8, 10)}`
    }
    default: {
      return ''
    }
  }
}

/** Returns an absolute url based on the url in metadata.json */
function absoluteUrl(url) {
  // TODO: See if you can hijack this to build dev routes
  // Slice because the url has an initial `/`
  return `${metadata.url}${url.slice(1)}`;
}

/** Returns a formatted date and time */
function readableDateAndTime(date) {
  return format(new Date(date), "MMM. dd, yyyy · h:mm a")
}

module.exports = {
  absoluteUrl: ["absoluteUrl", absoluteUrl],
  dateToUrl: ["dateToUrl", dateToUrl],
  readableDateAndTime: ["readableDateAndTime", readableDateAndTime]
};
