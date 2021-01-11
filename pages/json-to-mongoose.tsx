import ConversionPanel from "@components/ConversionPanel";
import { useCallback } from "react";
import * as React from "react";
import gs from "generate-schema";

export default function JsonToMongoose() {
  const transformer = useCallback(async ({ value }) => {
    return JSON.stringify(gs.mongoose(JSON.parse(value)), null, 2);
  }, []);

  return (
    <ConversionPanel
      transformer={transformer}
      editorTitle="JSON"
      editorLanguage="json"
      resultTitle="Mongoose Schema"
      resultLanguage={"json"}
    />
  );
}
