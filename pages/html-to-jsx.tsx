import * as React from "react";
import { useCallback, useState } from "react";
import ConversionPanel, { Transformer } from "@components/ConversionPanel";
import HtmlToJsx from "htmltojsx";
import { EditorPanelProps } from "@components/EditorPanel";
import Form, { InputType } from "@components/Form";
import { useSettings } from "@hooks/useSettings";
import isSvg from "is-svg";
import { Alert, Heading } from "evergreen-ui";
import Router from "next/router";

interface Settings {
  createFunction: boolean;
  outputFunctionName: string;
}

const formFields = [
  {
    type: InputType.SWITCH,
    key: "createFunction",
    label: "Create function component"
  }
];

export default function HtmlToJsxComponent() {
  const name = "HTML to JSX";

  const [settings, setSettings] = useSettings(name, {
    createFunction: false
  });

  const [_isSvg, setSvg] = useState(false);

  const transformer = useCallback<Transformer>(
    async ({ value }) => {
      setSvg(isSvg(value));

      const converter = new HtmlToJsx({
        createClass: false
      });
      let result = converter.convert(value);

      if (settings.createFunction) {
        result = `export const Foo = () => (${result})`;
      }

      return result;
    },
    [settings]
  );

  const getSettingsElement = useCallback<EditorPanelProps["settingElement"]>(
    ({ open, toggle }) => {
      return (
        <Form<Settings>
          title="HTML to JSX"
          onSubmit={setSettings}
          open={open}
          toggle={toggle}
          formsFields={formFields}
          initialValues={settings}
        />
      );
    },
    []
  );

  return (
    <ConversionPanel
      transformer={transformer}
      editorTitle="HTML"
      resultLanguage={settings.createFunction ? "javascript" : "text"}
      resultTitle="JSX"
      editorLanguage="html"
      editorSettingsElement={getSettingsElement}
      settings={settings}
      editorProps={{
        topNotifications: () =>
          _isSvg ? (
            <Alert
              backgroundColor="#e7f7ff"
              title={
                <>
                  SVG detected. For preview and optimization, go to{" "}
                  <Heading
                    size={400}
                    is="a"
                    color={"blue"}
                    onClick={() => Router.push("/svg-to-jsx")}
                  >
                    SVG to JSX converter.
                  </Heading>
                </>
              }
            />
          ) : (
            undefined
          )
      }}
    />
  );
}
