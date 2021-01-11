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

export default function GraphqlToJava() {
  const transformer = useCallback<Transformer>(async ({ value }) => {
    graphqlWorker = graphqlWorker || getWorker(GrapqlWorker);

    return graphqlWorker.send({
      type: GraphqlTransforms.TO_JAVA,
      value
    });
  }, []);

  return (
    <ConversionPanel
      transformer={transformer}
      resultTitle="Java (Enum and Input)"
      editorTitle="GraphQL Schema"
      editorLanguage="graphql"
      resultLanguage="java"
      editorProps={props}
    />
  );
}
