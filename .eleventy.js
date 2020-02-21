const metadata = require('./_data/metadata.json')
const filters = require('./filters')

module.exports = function(eleventyConfig) {
  eleventyConfig.setLiquidOptions({
    dynamicPartials: true,
    strict_filters: true
  });

  eleventyConfig.addLayoutAlias("article", "layouts/article.liquid");
  eleventyConfig.addLayoutAlias("base", "layouts/base.liquid");
  eleventyConfig.addLayoutAlias("group", "layouts/group.liquid");
  eleventyConfig.addLayoutAlias("news", "layouts/news.liquid");
  eleventyConfig.addLayoutAlias("page", "layouts/page.liquid");

  eleventyConfig.addFilter('absoluteUrl', url => (
    `${metadata.url}${url.slice(1)}`
  ))

  // Add Filters from `filters.js`
  eleventyConfig.addFilter(...filters.absoluteUrl)
  eleventyConfig.addFilter(...filters.dateToUrl)
  eleventyConfig.addFilter(...filters.readableDate)
  eleventyConfig.addFilter(...filters.readableDateAndTime)

  const directoriesToCopyToBuild = ['css']
  directoriesToCopyToBuild.forEach(dir => eleventyConfig.addPassthroughCopy(dir))

  return {
    templateFormats: ["liquid", "md"],
    markdownTemplateEngine: "liquid",
    passthroughFileCopy: true,
    dir: {
      input: ".",
      includes: "_includes",
      data: "_data",
      output: "_site"
    }
  };
};
