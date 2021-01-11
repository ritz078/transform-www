import ConversionPanel, { Transformer } from "@components/ConversionPanel";
import { useCallback } from "react";
import * as React from "react";
import { compact } from "jsonld";

export default function JsonldToCompacted() {
  const transformer = useCallback<Transformer>(
    async ({ value, splitEditorValue }) => {
      const jsonLd = await compact(
        JSON.parse(value),
        JSON.parse(splitEditorValue)
      );

      return JSON.stringify(jsonLd, null, 2);
    },
    []
  );

  return (
    <ConversionPanel
      transformer={transformer}
      editorTitle="JSON-LD"
      editorDefaultValue="jsonLd"
      splitTitle={"Context"}
      splitLanguage="json"
      splitEditorDefaultValue="jsonLdContext"
      editorLanguage="json"
      resultTitle="Compacted"
      resultLanguage={"json"}
    />
  );
}
