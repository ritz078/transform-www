import * as React from "react";
import { useCallback, useState } from "react";
import ConversionPanel, { Transformer } from "@components/ConversionPanel";
import { getWorker } from "@utils/workerWrapper";
import GrapqlWorker from "@workers/graphql.worker";
import { GraphqlTransforms } from "@constants/graphqlTransforms";
import { Select } from "evergreen-ui";

let graphqlWorker;

const props = {
  acceptFiles: ".graphql, .gql"
};

const langMap = {
  [GraphqlTransforms.TO_FLOW_RESOLVERS_SIGNATURE]: "flow",
  [GraphqlTransforms.TO_TYPESCRIPT_RESOLVERS_SIGNATURE]: "typescript",
  [GraphqlTransforms.TO_JAVA_RESOLVERS_SIGNATURE]: "java"
};

export default function GraphqlToResolversSignature() {
  const [output, setOutput] = useState(
    GraphqlTransforms.TO_TYPESCRIPT_RESOLVERS_SIGNATURE.toString(10)
  );

  const transformer = useCallback<Transformer>(
    async ({ value, splitEditorValue }) => {
      graphqlWorker = graphqlWorker || getWorker(GrapqlWorker);

      return graphqlWorker.send({
        type: parseInt(output, 10),
        value,
        document:
          output ===
          GraphqlTransforms.TO_TYPESCRIPT_RESOLVERS_SIGNATURE.toString(10)
            ? splitEditorValue
            : undefined
      });
    },
    [output]
  );

  return (
    <ConversionPanel
      settings={output}
      transformer={transformer}
      resultTitle={
        <Select value={output} onChange={e => setOutput(e.target.value)}>
          <option value={GraphqlTransforms.TO_TYPESCRIPT_RESOLVERS_SIGNATURE}>
            TypeScript Resolvers Signature
          </option>
          <option value={GraphqlTransforms.TO_FLOW_RESOLVERS_SIGNATURE}>
            Flow Resolvers Signature
          </option>
          <option value={GraphqlTransforms.TO_JAVA_RESOLVERS_SIGNATURE}>
            JAVA Resolvers Signature
          </option>
        </Select>
      }
      editorTitle="GraphQL Schema"
      editorLanguage="graphql"
      editorDefaultValue="graphql1"
      resultLanguage={langMap[output]}
      editorProps={props}
      splitEditorProps={props}
      splitTitle="Documents"
      splitLanguage="graphql"
      splitEditorDefaultValue={"graphqlDocument"}
    />
  );
}
