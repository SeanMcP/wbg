module.exports = function(eleventyConfig) {
  eleventyConfig.setLiquidOptions({
    dynamicPartials: true,
    strict_filters: true
  });
  
  eleventyConfig.addLayoutAlias("base", "layouts/base.liquid");

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
