import ConversionPanel from "@components/ConversionPanel";
import { useCallback } from "react";
import * as React from "react";
import { normalize } from "jsonld";

export default function JsonldToNormalized() {
  const transformer = useCallback(async ({ value }) => {
    return normalize(JSON.parse(value));
  }, []);

  return (
    <ConversionPanel
      transformer={transformer}
      editorTitle="JSON-LD"
      editorDefaultValue="jsonLd"
      editorLanguage="json"
      resultTitle="Normalized"
      resultLanguage={"plaintext"}
    />
  );
}
