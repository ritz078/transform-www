import ConversionPanel from "@components/ConversionPanel";
import { useCallback } from "react";
import * as React from "react";
import jsonToGo from "json-to-go";
import gofmt from "gofmt.js";

export default function JsonToGo() {
  const transformer = useCallback(({ value }) => {
    return gofmt(jsonToGo(value).go);
  }, []);

  return (
    <ConversionPanel
      transformer={transformer}
      editorTitle="JSON"
      editorLanguage="json"
      resultTitle="Go"
      resultLanguage={"go"}
    />
  );
}
