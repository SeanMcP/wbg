const metadata = require('./_data/metadata.json')

module.exports = function(eleventyConfig) {
  eleventyConfig.setLiquidOptions({
    dynamicPartials: true,
    strict_filters: true
  });

  eleventyConfig.addLayoutAlias("base", "layouts/base.liquid");
  eleventyConfig.addLayoutAlias("news", "layouts/news.liquid");
  eleventyConfig.addLayoutAlias("page", "layouts/page.liquid");

  eleventyConfig.addFilter('absoluteUrl', url => (
    `${metadata.url}${url.slice(1)}`
  ))

  function twoDigits(number) {
    return String(number).padStart(2, '0')
  }

  eleventyConfig.addFilter('dateToUrl', date => 
    `${date.getFullYear()}/${twoDigits(date.getMonth() + 1)}/${twoDigits(date.getDate() + 1)}`
  )

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
