import ConversionPanel, { Transformer } from "@components/ConversionPanel";
import * as React from "react";
import { useCallback } from "react";
import convert from "jsonschema-protobuf";

export default function JsonSchemaToProtobuf() {
  const transformer = useCallback<Transformer>(
    async ({ value }) => convert(value),
    []
  );

  return (
    <ConversionPanel
      transformer={transformer}
      editorTitle="JSON Schema"
      editorLanguage="json"
      editorDefaultValue="jsonSchema"
      resultTitle="Protobuf"
      resultLanguage={"text"}
    />
  );
}
