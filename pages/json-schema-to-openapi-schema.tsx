import ConversionPanel, { Transformer } from "@components/ConversionPanel";
import * as React from "react";
import { useCallback } from "react";
import toOpenApi from "@openapi-contrib/json-schema-to-openapi-schema";

export default function JsonSchemaToOpenapiSchema() {
  const transformer = useCallback<Transformer>(
    async ({ value }) =>
      JSON.stringify(
        toOpenApi(JSON.parse(value), {
          cloneSchema: true
        }),
        null,
        2
      ),
    []
  );

  return (
    <ConversionPanel
      transformer={transformer}
      editorTitle="JSON Schema"
      editorLanguage="json"
      editorDefaultValue="jsonSchema"
      resultTitle="Open API Schema"
      resultLanguage={"json"}
    />
  );
}
