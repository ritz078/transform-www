import * as React from "react";
import { useCallback } from "react";
import ConversionPanel, { Transformer } from "@components/ConversionPanel";
import { getWorker } from "@utils/workerWrapper";
import { BabelTransforms } from "@constants/babelTransforms";

export default function JsonToProptypes() {
  const transformer = useCallback<Transformer>(async ({ value }) => {
    const Worker = require("@workers/babel.worker");
    return getWorker(Worker).send({
      value,
      type: BabelTransforms.JSON_TO_PROPTYPES
    });
  }, []);

  return (
    <ConversionPanel
      transformer={transformer}
      editorTitle="JSON"
      resultLanguage="javascript"
      resultTitle="PropTypes"
      editorLanguage="json"
    />
  );
}
