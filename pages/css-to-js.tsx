import ConversionPanel, { Transformer } from "@components/ConversionPanel";
import React, { useCallback } from "react";
import { getWorker } from "@utils/workerWrapper";
import PostCssWorker from "@workers/postcss.worker";
import { useSettings } from "@hooks/useSettings";

let postCssWorker;
export default function CssToJs() {
  const name = "CSS to JS";

  // TODO
  const [settings, setSettings] = useSettings(name, {
    reactNativeCompatible: false,
    cleanPropertyNames: false
  });

  const transformer = useCallback<Transformer>(async ({ value }) => {
    postCssWorker = postCssWorker || getWorker(PostCssWorker);

    const _value = await postCssWorker.send(value);
    return `const converted = ${_value}`;
  }, []);

  return (
    <ConversionPanel
      transformer={transformer}
      resultTitle="JavaScript Object"
      editorTitle="CSS"
      editorLanguage="css"
      resultLanguage="javascript"
      editorProps={{
        acceptFiles: "text/css"
      }}
    />
  );
}
