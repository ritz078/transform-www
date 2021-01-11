import transform from "transform-json-types";
import ConversionPanel, { Transformer } from "@components/ConversionPanel";
import * as React from "react";
import { useCallback } from "react";

export default function JsonToSarcastic() {
  const transformer = useCallback<Transformer>(async ({ value }) => {
    const code = transform(value, {
      lang: "sarcastic"
    });

    return `import is from "sarcastic";\n\n${code}`;
  }, []);

  return (
    <ConversionPanel
      transformer={transformer}
      editorTitle="JSON"
      editorLanguage="json"
      resultTitle="Sarcastic"
      resultLanguage={"javascript"}
    />
  );
}
