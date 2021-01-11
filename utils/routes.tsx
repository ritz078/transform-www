import React from "react";
import flatten from "lodash/flatten";
import find from "lodash/find";

export const categorizedRoutes = [
  {
    category: "SVG",
    content: [
      {
        label: "to JSX",
        path: "/",
        packageName: "@svgr/core",
        packageUrl: "https://github.com/smooth-code/svgr",
        title: "Transform | A polyglot web converter."
      },
      {
        label: "to React Native",
        path: "/svg-to-react-native",
        packageName: "@svgr/core",
        packageUrl: "https://github.com/smooth-code/svgr"
      }
    ]
  },
  {
    category: "HTML",
    content: [
      {
        label: "to JSX",
        path: "/html-to-jsx"
      },
      {
        label: "to Pug",
        path: "/html-to-pug",
        packageName: "html2pug",
        packageUrl: "https://github.com/izolate/html2pug"
      }
    ]
  },
  {
    category: "JSON",
    content: [
      {
        label: "to React PropTypes",
        path: "/json-to-proptypes",
        title: "Transform | All important transforms at one place."
      },
      {
        label: "to Flow",
        path: "/json-to-flow"
      },
      {
        label: "to GraphQL",
        path: "/json-to-graphql",
        packageName: "@walmartlabs/json-to-simple-graphql-schema",
        packageUrl:
          "https://github.com/walmartlabs/json-to-simple-graphql-schema"
      },
      {
        label: "to TypeScript",
        path: "/json-to-typescript",
        packageUrl: "https://www.npmjs.com/package/json_typegen_wasm",
        packageName: "json_typegen_wasm"
      },
      {
        label: "to MobX-State-Tree Model",
        path: "/json-to-mobx-state-tree"
      },
      {
        label: "to Sarcastic",
        path: "/json-to-sarcastic",
        packageName: "transform-json-types",
        packageUrl: "https://github.com/transform-it/transform-json-types"
      },
      {
        label: "to io-ts",
        path: "/json-to-io-ts",
        packageName: "transform-json-types",
        packageUrl: "https://github.com/transform-it/transform-json-types"
      },
      {
        label: "to Rust Serde",
        path: "/json-to-rust-serde",
        desc: "An online REPL for converting JSON to Rust Serde Structs."
      },
      {
        label: "to Mongoose Schema",
        path: "/json-to-mongoose",
        packageName: "generate-schema",
        packageUrl: "https://github.com/nijikokun/generate-schema"
      },
      {
        label: "to Big Query Schema",
        path: "/json-to-big-query",
        packageName: "generate-schema",
        packageUrl: "https://github.com/nijikokun/generate-schema"
      },
      {
        label: "to MySQL",
        path: "/json-to-mysql",
        packageName: "generate-schema",
        packageUrl: "https://github.com/nijikokun/generate-schema"
      },
      {
        label: "to Scala Case Class",
        path: "/json-to-scala-case-class"
      },
      {
        label: "to Go Struct",
        path: "/json-to-go",
        packageName: "json-to-go",
        packageUrl: "https://github.com/mholt/json-to-go"
      },
      {
        label: "to Go Bson",
        path: "/json-to-go-bson"
      },
      {
        label: "to YAML",
        path: "/json-to-yaml",
        packageName: "json2yaml",
        packageUrl: "https://github.com/jeffsu/json2yaml"
      },
      {
        label: "to JSDoc",
        path: "/json-to-jsdoc"
      },
      {
        label: "to Kotlin",
        path: "/json-to-kotlin",
        packageUrl: "https://www.npmjs.com/package/json_typegen_wasm",
        packageName: "json_typegen_wasm"
      },
      {
        label: "to JSON Schema",
        path: "/json-to-json-schema",
        packageUrl: "https://www.npmjs.com/package/json_typegen_wasm",
        packageName: "json_typegen_wasm"
      }
    ]
  },
  {
    category: "JSON Schema",
    content: [
      {
        label: "to TypeScript",
        path: "/json-schema-to-typescript",
        packageName: "json-schema-to-typescript",
        packageUrl: "https://github.com/bcherny/json-schema-to-typescript"
      },
      {
        label: "to OpenAPI Schema",
        path: "json-schema-to-openapi-schema",
        packageName: "json-schema-to-openapi-schema",
        packageUrl: "https://github.com/wework/json-schema-to-openapi-schema"
      },
      {
        label: "to Protobuf",
        path: "json-schema-to-protobuf",
        packageName: "jsonschema-protobuf",
        packageUrl: "https://github.com/okdistribute/jsonschema-protobuf"
      }
    ]
  },
  {
    category: "CSS",
    content: [
      {
        label: "to JS Objects",
        path: "/css-to-js",
        packageName: "transform-css-to-js",
        packageUrl: "https://github.com/transform-it/transform-css-to-js"
      },
      {
        label: "to template literal",
        path: "/object-styles-to-template-literal",
        packageUrl:
          "https://github.com/satya164/babel-plugin-object-styles-to-template",
        packageName: "babel-plugin-object-styles-to-template"
      },
      {
        label: "to TailwindCSS",
        path: "/css-to-tailwind",
        packageUrl: "https://github.com/miklosme/css-to-tailwind",
        packageName: "css-to-tailwind"
      },
      {
        label: "to Twind",
        path: "/css-to-twind",
        packageUrl: "https://github.com/miklosme/css-to-tailwind",
        packageName: "css-to-tailwind"
      }
    ]
  },
  {
    category: "JavaScript",
    content: [
      {
        label: "to JSON",
        path: "/js-object-to-json",
        desc: "An online REPL for converting JS Object to JSON."
      }
    ]
  },
  {
    category: "GraphQL",
    content: [
      {
        label: "to TypeScript",
        path: "/graphql-to-typescript"
      },
      {
        label: "to Flow",
        path: "/graphql-to-flow"
      },
      {
        label: "to JAVA",
        path: "/graphql-to-java"
      },
      {
        label: "to Resolvers Signature",
        path: "/graphql-to-resolvers-signature"
      },

      {
        label: "to Introspection JSON",
        path: "/graphql-to-introspection-json"
      },

      {
        label: "to Schema AST",
        path: "/graphql-to-schema-ast"
      },
      {
        label: "to Fragment Matcher",
        path: "/graphql-to-fragment-matcher"
      },
      {
        label: "to Components",
        path: "/graphql-to-components"
      },
      {
        label: "to TypeScript MongoDB",
        path: "/graphql-to-typescript-mongodb"
      }
    ].map(x => ({
      ...x,
      packageUrl: "https://github.com/dotansimha/graphql-code-generator",
      packageName: "graphql-code-generator"
    }))
  },
  {
    category: "JSON-LD",
    content: [
      {
        label: "to N-Quads",
        path: "/jsonld-to-nquads"
      },
      {
        label: "to Expanded",
        path: "/jsonld-to-expanded"
      },
      {
        label: "to Compacted",
        path: "/jsonld-to-compacted"
      },
      {
        label: "to Flattened",
        path: "/jsonld-to-flattened"
      },
      {
        label: "to Framed",
        path: "/jsonld-to-framed"
      },
      {
        label: "to Normalized",
        path: "jsonld-to-normalized"
      }
    ].map(x => ({
      ...x,
      packageName: "jsonld",
      packageUrl: "https://github.com/digitalbazaar/jsonld.js"
    }))
  },
  {
    category: "TypeScript",
    content: [
      {
        label: "to Flow",
        path: "/typescript-to-flow",
        packageName: "flowgen",
        packageUrl: "https://github.com/joarwilk/flowgen"
      },
      {
        label: "to TypeScript Declaration",
        path: "/typescript-to-typescript-declaration"
      },
      {
        label: "to JSON Schema",
        path: "/typescript-to-json-schema",
        packageName: "ts-json-schema-generator",
        packageUrl: "https://github.com/vega/ts-json-schema-generator"
      }
    ]
  },
  {
    category: "Flow",
    iconName: "",
    content: [
      {
        label: "to TypeScript",
        path: "/flow-to-typescript"
      },
      {
        label: "to TypeScript Declaration",
        path: "/flow-to-typescript-declaration"
      }
    ]
  },
  {
    category: "Others",
    iconName: "",
    content: [
      {
        label: "XML to JSON",
        path: "/xml-to-json",
        packageName: "xml-js",
        packageUrl: "https://github.com/nashwaan/xml-js"
      },

      {
        label: "YAML to JSON",
        path: "/yaml-to-json",
        packageName: "yaml",
        packageUrl: "https://github.com/tj/js-yaml"
      },
      {
        label: "Markdown to HTML",
        path: "/markdown-to-html",
        packageName: "markdown",
        packageUrl: "https://github.com/evilstreak/markdown-js"
      }
    ]
  }
];

export interface Route {
  path: string;
  label: string;
  desc: string;
}

export const routes = flatten(
  categorizedRoutes.map(a =>
    // @ts-ignore
    a.content.map(x => {
      const _label =
        a.category.toLowerCase() !== "others"
          ? `${a.category} ${x.label}`
          : x.label;
      return {
        ...x,
        category: a.category,
        searchTerm: _label,
        desc: x.desc || `An online Repl to convert ${_label}`
      };
    })
  )
);

export function activeRouteData(pathname) {
  return find(routes, o => o.path === pathname);
}
