import ConversionPanel from "@components/ConversionPanel";
import * as React from "react";
import { useCallback } from "react";
import { useSettings } from "@hooks/useSettings";
import Form, { InputType } from "@components/Form";
import request from "@utils/request";

const formFields = [
  {
    key: "tabs",
    type: InputType.SWITCH,
    label: "Use Tabs"
  },
  {
    key: "commas",
    type: InputType.SWITCH,
    label: "Commas"
  },
  {
    key: "doubleQuotes",
    type: InputType.SWITCH,
    label: "Use double quotes"
  },
  {
    key: "fragment",
    type: InputType.SWITCH,
    label: "Use Fragment"
  }
];

const defaultSettings = {
  tabs: true,
  commas: true,
  doubleQuotes: false,
  fragment: false
};

export default function HtmlToPug() {
  const name = "HTML to Pug";

  const [settings, setSettings] = useSettings(name, defaultSettings);

  const getSettingsElement = useCallback(({ open, toggle }) => {
    return (
      <Form<typeof defaultSettings>
        title={name}
        onSubmit={setSettings}
        open={open}
        toggle={toggle}
        formsFields={formFields}
        initialValues={settings}
      />
    );
  }, []);

  const transformer = useCallback(
    ({ value }) =>
      request("/api/html-to-pug", {
        value,
        settings
      }),
    [settings]
  );

  return (
    <ConversionPanel
      transformer={transformer}
      editorTitle="HTML"
      editorLanguage="html"
      resultTitle="Pug"
      resultLanguage={"pug"}
      resultSettingsElement={getSettingsElement}
      settings={settings}
    />
  );
}
