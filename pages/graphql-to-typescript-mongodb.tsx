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

export default function GraphqlToTypescriptMongodb() {
  const transformer = useCallback<Transformer>(async ({ value }) => {
    graphqlWorker = graphqlWorker || getWorker(GrapqlWorker);

    return graphqlWorker.send({
      type: GraphqlTransforms.TO_TYPESCRIPT_MONGODB,
      value,
      extension: "ts"
    });
  }, []);

  return (
    <ConversionPanel
      transformer={transformer}
      resultTitle="TypeScript MongoDB"
      editorTitle="GraphQL Schema"
      editorDefaultValue="graphqlMongodb"
      editorLanguage="graphql"
      resultLanguage="typescript"
      editorProps={props}
    />
  );
}
