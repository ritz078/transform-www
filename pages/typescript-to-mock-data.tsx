import ConversionPanel from "@components/ConversionPanel";
import * as React from "react";
import { useCallback } from "react";
import request from "@utils/request";
import { Alert } from "evergreen-ui";

export default function() {
  const transformer = useCallback(
    async ({ value }) => request("/api/typescript-to-mock-data", value),
    []
  );

  return (
    <ConversionPanel
      transformer={transformer}
      editorTitle="TypeScript"
      editorLanguage="typescript"
      editorDefaultValue="typeScriptInterface"
      resultTitle="Mock Data"
      resultLanguage={"typescript"}
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
