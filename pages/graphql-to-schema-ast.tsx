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

export default function GraphqlToSchemaAst() {
  const transformer = useCallback<Transformer>(async ({ value }) => {
    graphqlWorker = graphqlWorker || getWorker(GrapqlWorker);

    return graphqlWorker.send({
      type: GraphqlTransforms.TO_SCHEMA_AST,
      value,
      extension: "graphql"
    });
  }, []);

  return (
    <ConversionPanel
      transformer={transformer}
      resultTitle="Schema AST"
      editorTitle="GraphQL Schema"
      editorLanguage="graphql"
      resultLanguage="graphql"
      editorProps={props}
    />
  );
}
