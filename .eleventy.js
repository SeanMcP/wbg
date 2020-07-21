const metadata = require('./src/_data/metadata.json')
const filters = require('./src/filters')

module.exports = function(config) {
  config.setLiquidOptions({
    dynamicPartials: true,
    strict_filters: true
  });

  config.addLayoutAlias("article", "layouts/article.liquid");
  config.addLayoutAlias("base", "layouts/base.liquid");
  config.addLayoutAlias("group", "layouts/group.liquid");
  config.addLayoutAlias("news", "layouts/news.liquid");
  config.addLayoutAlias("page", "layouts/page.liquid");

  config.addFilter('absoluteUrl', url => (
    `${metadata.url}${url.slice(1)}`
  ))

  // Add Filters from `filters.js`
  config.addFilter(...filters.absoluteUrl)
  config.addFilter(...filters.dateToUrl)
  config.addFilter(...filters.readableDate)
  config.addFilter(...filters.readableDateAndTime)

  const directoriesToCopyToBuild = ['src/css']
  directoriesToCopyToBuild.forEach(dir => config.addPassthroughCopy(dir))

  return {
    templateFormats: ["liquid", "md"],
    markdownTemplateEngine: "liquid",
    passthroughFileCopy: true,
    dir: {
      input: "src",
      includes: "_includes",
      data: "_data",
      output: "_site"
    }
  };
};
