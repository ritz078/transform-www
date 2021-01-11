import ConversionPanel from "@components/ConversionPanel";
import { useCallback } from "react";
import * as React from "react";
import { jsonToSchema } from "@walmartlabs/json-to-simple-graphql-schema/lib";

export default function JsonToGraphql() {
  const transformer = useCallback(({ value }) => {
    return jsonToSchema({ jsonInput: value }).value;
  }, []);

  return (
    <ConversionPanel
      transformer={transformer}
      editorTitle="JSON"
      editorLanguage="json"
      resultTitle="GraphQL"
      resultLanguage={"graphql"}
    />
  );
}
