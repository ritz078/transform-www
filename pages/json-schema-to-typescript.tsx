import ConversionPanel from "@components/ConversionPanel";
import * as React from "react";
import { useCallback } from "react";
import { compile } from "json-schema-to-typescript";

export default function JsonSchemaToTypescript() {
  const transformer = useCallback(async ({ value }) => {
    return compile(JSON.parse(value), "MySchema", {
      bannerComment: ""
    });
  }, []);

  return (
    <ConversionPanel
      transformer={transformer}
      editorTitle="JSON Schema"
      editorLanguage="json"
      editorDefaultValue="jsonSchema"
      resultTitle="TypeScript"
      resultLanguage={"typescript"}
    />
  );
}
