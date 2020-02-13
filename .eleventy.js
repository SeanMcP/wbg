const metadata = require('./_data/metadata.json')

module.exports = function(eleventyConfig) {
  eleventyConfig.setLiquidOptions({
    dynamicPartials: true,
    strict_filters: true
  });

  eleventyConfig.addLayoutAlias("base", "layouts/base.liquid");

  eleventyConfig.addFilter('absoluteUrl', url => (
    `${metadata.url}${url.slice(1)}`
  ))

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
