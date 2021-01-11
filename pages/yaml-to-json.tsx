import ConversionPanel from "@components/ConversionPanel";
import { useCallback } from "react";
import * as React from "react";
import yaml from "yaml";

export default function YamlToJson() {
  const transformer = useCallback(async ({ value }) => {
    return JSON.stringify(yaml.parse(value));
  }, []);

  return (
    <ConversionPanel
      transformer={transformer}
      editorTitle="YAML"
      editorLanguage="yaml"
      resultTitle="JSON"
      resultLanguage={"json"}
    />
  );
}
