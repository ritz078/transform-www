import ConversionPanel, { Transformer } from "@components/ConversionPanel";
import NoSSR from "@components/NoSSR";
import { editor } from "monaco-editor";
import * as React from "react";
import { useState, useCallback, useMemo } from "react";
import request from "@utils/request";
import tailwindCss from "@utils/tailwindcss";
import { promises as fs } from "fs";
import path from "path";
import cssToTailwind from "css-to-tailwind/browser";
import isEqual from "lodash/isEqual";
import { useSettings } from "@hooks/useSettings";
import {
  Dialog,
  Pane,
  Tablist,
  Tab,
  Alert,
  Button,
  Icon,
  Tooltip,
  toaster
} from "evergreen-ui";
import tailwindResolve from "tailwindcss/resolveConfig";
import dynamic from "next/dynamic";

const Monaco = dynamic(() => import("../components/Monaco"), {
  ssr: false
});

const options: editor.IEditorOptions = {
  fontSize: 14,
  readOnly: false,
  codeLens: false,
  fontFamily: "Menlo, Consolas, monospace, sans-serif",
  minimap: {
    enabled: false
  },
  quickSuggestions: false,
  lineNumbers: "on"
};

const tabs = [
  { label: "TailwindCSS Config", language: "javascript" },
  { label: "PostCSS Input", language: "css" }
];

function CssToTailwindSettings({ open, toggle, onConfirm, settings }) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isConfirmLoading, setConfirmLoading] = useState(false);
  const [tailwindConfigValue, setTailwindConfigValue] = useState(
    settings.tailwindConfig
  );
  const [postCssInputValue, setPostCssInputValue] = useState(
    settings.postCssInput
  );
  return (
    <Dialog
      title={
        <>
          TailwindCSS Settings
          <a
            href="https://tailwindcss.com/docs/configuration"
            target="_blank"
            style={{ verticalAlign: "middle" }}
          >
            <Tooltip content="Open the TailwindCSS docs...">
              <Icon icon="help" color="info" marginLeft={16} />
            </Tooltip>
          </a>
        </>
      }
      isShown={open}
      isConfirmLoading={isConfirmLoading}
      confirmLabel={isConfirmLoading ? "Running PostCSS..." : "Confirm"}
      onCloseComplete={toggle}
      onConfirm={async close => {
        setConfirmLoading(true);
        const isSuccess = await onConfirm({
          tailwindConfigValue,
          postCssInputValue
        });
        setConfirmLoading(false);
        if (isSuccess) {
          close();
        }
      }}
      onCancel={close => {
        setTailwindConfigValue(settings.tailwindConfig);
        setPostCssInputValue(settings.postCssInput);
        close();
      }}
    >
      <>
        <Tablist marginBottom={16} flexBasis={240} marginRight={24}>
          {tabs.map(({ label }, index) => (
            <Tab
              key={label}
              onSelect={() => setSelectedIndex(index)}
              isSelected={index === selectedIndex}
            >
              {label}
            </Tab>
          ))}
        </Tablist>
        <Pane padding={16} flex="1">
          <Pane height={300}>
            <Monaco
              language={tabs[selectedIndex].language}
              value={
                selectedIndex === 0 ? tailwindConfigValue : postCssInputValue
              }
              onChange={
                selectedIndex === 0
                  ? setTailwindConfigValue
                  : setPostCssInputValue
              }
              options={options}
              height="300"
            />
          </Pane>
        </Pane>
      </>
    </Dialog>
  );
}

function SettingsInfo({ isDefaultConfig, resetSettings }) {
  if (isDefaultConfig) {
    return null;
  }
  // opting out from SSR, because something goes wrong with the Alert component otherwise
  return (
    <NoSSR>
      <div style={{ minHeight: 20 }}>
        <Alert
          intent="warning"
          backgroundColor="#FEF8E7"
          title={
            <>
              Custom config is applied to TailwindCSS
              <Pane
                display="inline-block"
                position="absolute"
                right="10px"
                marginTop="-2px"
              >
                <Button
                  appearance="minimal"
                  intent="warning"
                  height={24}
                  onClick={resetSettings}
                >
                  Reset
                </Button>
              </Pane>
            </>
          }
        />
      </div>
    </NoSSR>
  );
}

function formatOutput(results) {
  const content = results
    .map(result => {
      const { selector, tailwind, missing } = result;

      let output = `/* ℹ️ Base selector: ${selector} */`;

      if (tailwind.length) {
        output += `\n/* ✨ TailwindCSS: "${tailwind}" */`;

        const { base, ...missingVariants } = missing;

        if (base && base.length) {
          output += `\n/* ⚠️ Some properties could not be matched with Tailwind classes. Use @apply to extend a CSS rule: */
${selector} {
  @apply ${tailwind};
  ${base.map(([prop, value]) => `${prop}: ${value};`).join("\n  ")}
}`;
        }

        if (Object.keys(missingVariants).length) {
          output += `\n/* ⚠️ Some properties are requiring specific variants, but the variant does not support those. Consider extending your Tailwind config.\n`;
          Object.entries(missingVariants).forEach(([variant, values]) => {
            const properties = (values as [string, string])
              .map(([prop, value]) => `\t${prop}: ${value};`)
              .join("\n  ");
            output += `${variant}:\n${properties}\n`;
          });
          output += "*/";
        }
      } else {
        output += `\n/* ❌ Could not match any TailwindCSS classes. */`;
      }

      return output;
    })
    .join("\n\n");

  const success = results.filter(result => result.tailwind.length);

  (window as any).cssToTailwindResults = results;

  return `/* ${success.length}/${results.length} base rules are converted successfully. */\n/* Gather results from the console with \`copy(window.cssToTailwindResults)\` */\n\n${content}`;
}

export default function CssToTailwind({ defaultSettings }) {
  const [settings, setSettings] = useSettings(
    "css-to-tailwind",
    defaultSettings
  );

  const onSettingsSubmit = useCallback(
    async ({ tailwindConfigValue, postCssInputValue }) => {
      try {
        const resolvedTailwindConfig = tailwindResolve(
          eval(`const module = {}; ${tailwindConfigValue}; module.exports;`)
        );

        try {
          const newTailwindCss = await request("/api/build-tailwind-css", {
            tailwindConfig: resolvedTailwindConfig,
            postCssInput: postCssInputValue
          });
          toaster.success("Custom TailwindCSS config is successfully applied");

          setSettings({
            tailwindConfig: tailwindConfigValue,
            postCssInput: postCssInputValue,
            tailwindCss: newTailwindCss
          });

          // indicate submit was successful
          return true;
        } catch (e) {
          toaster.danger(
            "Something went wrong trying to build TailwindCSS with custom config",
            {
              description: "Now the default config is used instead"
            }
          );
        }
      } catch (e) {
        toaster.danger(
          "Something went wrong trying to resolve TailwindCSS config",
          {
            description: e.message
          }
        );
      }
    },
    []
  );

  const transformer = useCallback<Transformer>(async ({ value }) => {
    const results = await cssToTailwind(value, settings.tailwindCss);

    return formatOutput(results);
  }, []);

  const resetSettings = useCallback(() => {
    setSettings(defaultSettings);
  }, []);

  return (
    <ConversionPanel
      transformer={transformer}
      editorTitle="CSS"
      editorLanguage="css"
      editorDefaultValue="css2"
      resultTitle="TailwindCSS"
      resultLanguage={"css"}
      editorProps={{
        settingElement: ({ open, toggle }) => {
          return (
            <CssToTailwindSettings
              key={`${settings.tailwindConfig}${settings.postCssInput}`}
              open={open}
              toggle={toggle}
              onConfirm={onSettingsSubmit}
              settings={settings}
            />
          );
        },
        topNotifications: () => {
          return (
            <SettingsInfo
              isDefaultConfig={isEqual(settings, defaultSettings)}
              resetSettings={resetSettings}
            />
          );
        }
      }}
    />
  );
}

export async function getStaticProps() {
  const tailwindConfig = await fs.readFile(
    path.resolve("./node_modules/tailwindcss/stubs/simpleConfig.stub.js"),
    "utf-8"
  );
  const postCssInput = await fs.readFile(
    path.resolve("./node_modules/tailwindcss/tailwind.css"),
    "utf-8"
  );
  const config = eval(`const module = {}; ${tailwindConfig}; module.exports;`);
  const css = await tailwindCss(config, postCssInput);
  return {
    props: {
      defaultSettings: {
        tailwindConfig,
        postCssInput,
        tailwindCss: css
      }
    }
  };
}
