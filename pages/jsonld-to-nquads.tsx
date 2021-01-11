import ConversionPanel from "@components/ConversionPanel";
import { useCallback } from "react";
import * as React from "react";
import { toRDF } from "jsonld";

export default function JsonldToNquads() {
  const transformer = useCallback(async ({ value }) => {
    return (toRDF(JSON.parse(value), {
      format: "application/n-quads"
    }) as unknown) as Promise<string>;
  }, []);

  return (
    <ConversionPanel
      transformer={transformer}
      editorTitle="JSON-LD"
      editorDefaultValue="jsonLd"
      editorLanguage="json"
      resultTitle="N-Quads"
      resultLanguage={"plaintext"}
    />
  );
}
