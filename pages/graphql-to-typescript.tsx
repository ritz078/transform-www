import * as React from "react";
import { useCallback } from "react";
import ConversionPanel, { Transformer } from "@components/ConversionPanel";
import { getWorker } from "@utils/workerWrapper";
import GrapqlWorker from "@workers/graphql.worker";
import { GraphqlTransforms } from "@constants/graphqlTransforms";

let graphqlWorker;

const props = {
  acceptFiles: ".graphql, .gql"
};

export default function GraphqlToTypescript() {
  const transformer = useCallback<Transformer>(
    async ({ value, splitEditorValue }) => {
      graphqlWorker = graphqlWorker || getWorker(GrapqlWorker);

      return graphqlWorker.send({
        type: GraphqlTransforms.TO_TYPESCRIPT,
        value,
        document: splitEditorValue
      });
    },
    []
  );

  return (
    <ConversionPanel
      transformer={transformer}
      resultTitle="TypeScript"
      editorTitle="GraphQL Schema"
      editorLanguage="graphql"
      editorDefaultValue="graphql1"
      resultLanguage="typescript"
      editorProps={props}
      splitEditorProps={props}
      splitTitle="Document"
      splitLanguage="graphql"
      splitEditorDefaultValue="graphqlDocument"
    />
  );
}
