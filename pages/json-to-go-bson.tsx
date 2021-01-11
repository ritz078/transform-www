import ConversionPanel, { Transformer } from "@components/ConversionPanel";
import * as React from "react";
import { useCallback } from "react";

export default function JsonToGoBson() {
  const transformer = useCallback<Transformer>(async ({ value }) => {
    return JSON.stringify(JSON.parse(value || "{}"), null, 2)
      .replace(/\{/gm, "bson.M{")
      .replace(/\[/gm, "bson.A{")
      .replace(/\]/gm, "}")
      .replace(/(\d|\w|")$/gm, "$1,")
      .replace(/(\}$)(\n)/gm, "$1,$2");
  }, []);

  return (
    <ConversionPanel
      transformer={transformer}
      editorTitle="JSON"
      editorLanguage="json"
      resultTitle="Go Bson"
      resultLanguage={"go"}
    />
  );
}
