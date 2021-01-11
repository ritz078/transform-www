import transform from "transform-json-types";
import ConversionPanel, { Transformer } from "@components/ConversionPanel";
import * as React from "react";
import { useCallback } from "react";

export default function JsonToScalaCaseClass() {
  const transformer = useCallback<Transformer>(async ({ value }) => {
    return transform(value, {
      lang: "scala"
    });
  }, []);

  return (
    <ConversionPanel
      transformer={transformer}
      editorTitle="JSON"
      editorLanguage="json"
      resultTitle="Scala Case Class"
      resultLanguage={"scala"}
    />
  );
}
