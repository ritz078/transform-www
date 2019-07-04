import prettier from "prettier/standalone";

const plugins = [
  require("prettier/parser-babylon"),
  require("prettier/parser-html"),
  require("prettier/parser-postcss"),
  require("prettier/parser-graphql"),
  require("prettier/parser-markdown"),
  require("prettier/parser-yaml")
];

const prettierParsers = {
  css: "postcss",
  javascript: "babel",
  jsx: "babel",
  svg: "html",
  xml: "html",
  typescript: "babel"
};

export function prettify(language: string, value: string) {
  let result;

  if (language === "json") {
    result = JSON.stringify(JSON.parse(value), null, 2);
  } else {
    result = prettier.format(value, {
      parser: prettierParsers[language] || language,
      plugins
    });
  }

  return result;
}