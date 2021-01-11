import ConversionPanel, { Transformer } from "@components/ConversionPanel";
import * as React from "react";
import { useCallback } from "react";
import { convert } from "@assets/vendor/json-to-jsdoc";

export default function JsonToJsdoc() {
  const transformer = useCallback<Transformer>(async ({ value }) => {
    return convert(value);
  }, []);

  return (
    <ConversionPanel
      transformer={transformer}
      editorTitle="JSON"
      editorLanguage="json"
      resultTitle="JSDoc"
      resultLanguage={"javascript"}
    />
  );
}
