import ConversionPanel from "@components/ConversionPanel";
import * as React from "react";
import { useCallback } from "react";
import request from "@utils/request";
import { Alert } from "evergreen-ui";

export default function TypescriptToFlow() {
  const transformer = useCallback(
    ({ value }) => request("/api/typescript-to-flow", value),
    []
  );

  return (
    <ConversionPanel
      transformer={transformer}
      editorTitle="TypeScript"
      editorLanguage="typescript"
      resultTitle="Flow"
      resultLanguage={"plaintext"}
      resultEditorProps={{
        topNotifications: () => (
          <Alert
            backgroundColor="#e7f7ff"
            title="This code is converted on the server."
          />
        )
      }}
    />
  );
}
