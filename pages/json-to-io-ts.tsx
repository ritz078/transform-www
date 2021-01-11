import transform from "transform-json-types";
import ConversionPanel, { Transformer } from "@components/ConversionPanel";
import * as React from "react";
import { useCallback } from "react";

export default function JsonToIoTs() {
  const transformer = useCallback<Transformer>(async ({ value }) => {
    const code = transform(value, {
      lang: "io-ts"
    });

    return `import * as t from "io-ts";\n\n${code}`;
  }, []);

  return (
    <ConversionPanel
      transformer={transformer}
      editorTitle="JSON"
      editorLanguage="json"
      resultTitle="IO TS"
      resultLanguage={"rust"}
    />
  );
}
