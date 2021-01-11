import * as React from "react";
import { useCallback } from "react";
import ConversionPanel, { Transformer } from "@components/ConversionPanel";
import { getWorker } from "@utils/workerWrapper";
import GrapqlWorker from "@workers/graphql.worker";
import { GraphqlTransforms } from "@constants/graphqlTransforms";

let graphqlWorker, prettierWorker;

const props = {
  acceptFiles: ".graphql, .gql"
};

export default function GraphqlToIntrospectionJson() {
  const transformer = useCallback<Transformer>(async ({ value }) => {
    graphqlWorker = graphqlWorker || getWorker(GrapqlWorker);

    return graphqlWorker.send({
      type: GraphqlTransforms.TO_INTROSPECTION_JSON,
      value,
      extension: "json"
    });
  }, []);

  return (
    <ConversionPanel
      transformer={transformer}
      resultTitle="Introspection JSON"
      editorTitle="GraphQL Schema"
      editorLanguage="graphql"
      resultLanguage="json"
      editorProps={props}
    />
  );
}
