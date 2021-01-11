import ConversionPanel from "@components/ConversionPanel";
import * as React from "react";
import { useCallback } from "react";
import BabelWorker from "@workers/babel.worker";
import { getWorker } from "@utils/workerWrapper";
import { BabelTransforms } from "@constants/babelTransforms";

let babelWorker;
export default function JsonToMobxStateTree() {
  const transformer = useCallback(async ({ value }) => {
    babelWorker = babelWorker || getWorker(BabelWorker);

    return babelWorker.send({
      type: BabelTransforms.JSON_TO_MOBX_TREE,
      value
    });
  }, []);

  return (
    <ConversionPanel
      transformer={transformer}
      editorTitle="JSON"
      editorLanguage="json"
      resultTitle="MobX-State-Tree Model"
      resultLanguage={"javascript"}
    />
  );
}
