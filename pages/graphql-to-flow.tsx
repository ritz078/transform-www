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

export default function GraphqlToFlow() {
  const transformer = useCallback<Transformer>(
    async ({ value, splitEditorValue }) => {
      graphqlWorker = graphqlWorker || getWorker(GrapqlWorker);

      return graphqlWorker.send({
        type: GraphqlTransforms.TO_FLOW,
        value,
        document: splitEditorValue
      });
    },
    []
  );

  return (
    <ConversionPanel
      transformer={transformer}
      resultTitle="Flow"
      editorTitle="GraphQL Schema"
      editorLanguage="graphql"
      editorDefaultValue="graphql1"
      resultLanguage="flow"
      editorProps={props}
      splitEditorProps={props}
      splitTitle="Document"
      splitLanguage="graphql"
      splitEditorDefaultValue={"graphqlDocument"}
    />
  );
}
