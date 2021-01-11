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

export default function GraphqlToComponents() {
  const [output, setOutput] = useState(
    GraphqlTransforms.TO_REACT_APOLLO.toString(10)
  );

  const transformer = useCallback<Transformer>(
    async ({ value, splitEditorValue }) => {
      graphqlWorker = graphqlWorker || getWorker(GrapqlWorker);

      return graphqlWorker.send({
        type: parseInt(output, 10),
        value,
        document: splitEditorValue
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
          <option value={GraphqlTransforms.TO_REACT_APOLLO}>
            TypeScript React Apollo
          </option>
          <option value={GraphqlTransforms.TO_APOLLO_ANGULAR}>
            TypeScript Apollo Angular
          </option>
          <option value={GraphqlTransforms.TO_STENCIL_APOLLO}>
            TypeScript Stencil Apollo
          </option>
          <option value={GraphqlTransforms.TO_URQL}>TypeScript urql</option>
        </Select>
      }
      editorTitle="GraphQL Schema"
      editorLanguage="graphql"
      editorDefaultValue="graphql1"
      resultLanguage="typescript"
      editorProps={props}
      splitEditorProps={props}
      splitTitle="Document"
      splitLanguage="graphql"
      splitEditorDefaultValue={"graphqlDocument"}
    />
  );
}
