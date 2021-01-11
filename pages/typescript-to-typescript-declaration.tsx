import ConversionPanel from "@components/ConversionPanel";
import * as React from "react";
import { useCallback } from "react";
import request from "@utils/request";
import { Alert } from "evergreen-ui";

export default function TypescriptToTypescriptDeclaration() {
  const transformer = useCallback(
    ({ value }) =>
      request("/api/flow-to-typescript", {
        value,
        declarationOnly: true,
        isTS: true
      }),
    []
  );

  return (
    <ConversionPanel
      transformer={transformer}
      editorTitle="TypeScript"
      editorLanguage="typescript"
      resultTitle="TypeScript"
      resultLanguage="typescript"
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
