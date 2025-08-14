const markdownIt = require("markdown-it");

module.exports = function(eleventyConfig) {
  eleventyConfig.addPassthroughCopy("src/assets");

  // Date filter
  eleventyConfig.addFilter("date", function(value, format = "yyyy") {
    const date = new Date(value);
    return date.getFullYear();
  });

  // Markdown renderer with image path rewrite
  const md = markdownIt({
    html: true,
    breaks: true,
    linkify: true
  });

  // Override image renderer to prepend a slash for root-relative paths
  const defaultImageRenderer = md.renderer.rules.image || function(tokens, idx, options, env, self) {
    return self.renderToken(tokens, idx, options);
  };

  md.renderer.rules.image = function(tokens, idx, options, env, self) {
    const token = tokens[idx];
    const srcIndex = token.attrIndex("src");
    if (srcIndex >= 0) {
      let src = token.attrs[srcIndex][1];
      // Only rewrite if it's a relative path and not starting with http(s)
      if (!src.startsWith("http") && !src.startsWith("/") && !src.startsWith("#")) {
        token.attrs[srcIndex][1] = "/" + src.replace(/^(\.\/|\/)*/, "");
      }
    }
    return defaultImageRenderer(tokens, idx, options, env, self);
  };

  eleventyConfig.setLibrary("md", md);

  return {
    dir: {
      input: "src",
      includes: "_includes",
      data: "_data",
      output: "_site"
    },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    dataTemplateEngine: "njk"
  };
};
