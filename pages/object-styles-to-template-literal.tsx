import ConversionPanel, { Transformer } from "@components/ConversionPanel";
import BabelWorker from "@workers/babel.worker";
import React, { useCallback } from "react";
import { getWorker } from "@utils/workerWrapper";
import { BabelTransforms } from "@constants/babelTransforms";
import { EditorPanelProps } from "@components/EditorPanel";
import Form, { InputType } from "@components/Form";
import { useSettings } from "@hooks/useSettings";
import { Alert } from "evergreen-ui";

interface Settings {
  css: boolean;
  styled: boolean;
}

const formFields = [
  {
    label: "Transpile css tags",
    key: "css",
    type: InputType.SWITCH
  },
  {
    label: "Transpile styled tags",
    key: "styled",
    type: InputType.SWITCH
  }
];

let babelWorker;
export default function ObjectStylesToTemplateLiteral() {
  const name = "object-styles-to-template-literal";
  const [settings, setSettings] = useSettings(name, {
    css: true,
    styled: true
  });

  const transformer = useCallback<Transformer>(
    ({ value }) => {
      babelWorker = babelWorker || getWorker(BabelWorker);

      return babelWorker.send({
        value,
        type: BabelTransforms.OBJECT_STYLES_TO_TEMPLATE,
        settings
      });
    },
    [settings]
  );

  const getSettingsPanel = useCallback<EditorPanelProps["settingElement"]>(
    ({ open, toggle }) => (
      <Form<Settings>
        onSubmit={setSettings}
        initialValues={settings}
        title="Settings"
        open={open}
        toggle={toggle}
        formsFields={formFields}
      />
    ),
    [settings]
  );

  return (
    <ConversionPanel
      resultLanguage="javascript"
      editorLanguage="javascript"
      editorTitle={"Object Styles"}
      resultTitle="Template Literal"
      transformer={transformer}
      editorSettingsElement={getSettingsPanel}
      resultEditorProps={{
        topNotifications: () =>
          (!settings.css || !settings.styled) && (
            <Alert
              intent="warning"
              backgroundColor="#FEF8E7"
              title={`You have turned off ${settings.css ? "" : "css"}${
                settings.styled ? "" : ",styled"
              } tags transpilation. Change it in settings.`}
            />
          )
      }}
      settings={settings}
    />
  );
}
