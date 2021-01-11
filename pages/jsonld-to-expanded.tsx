import ConversionPanel from "@components/ConversionPanel";
import { useCallback } from "react";
import * as React from "react";
import { expand } from "jsonld";

export default function JsonldToExpanded() {
  const transformer = useCallback(async ({ value }) => {
    const jsonLd = await expand(JSON.parse(value));

    return JSON.stringify(jsonLd, null, 2);
  }, []);

  return (
    <ConversionPanel
      transformer={transformer}
      editorTitle="JSON-LD"
      editorDefaultValue="jsonLd"
      editorLanguage="json"
      resultTitle="Expanded"
      resultLanguage={"json"}
    />
  );
}
