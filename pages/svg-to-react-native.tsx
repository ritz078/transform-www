import * as React from "react";
import BabelWorker from "@workers/babel.worker";
import { SvgConverter } from "@components/SvgConverter";
import { useCallback, useEffect, useRef, useState } from "react";
import QRCode from "qrcode.react";
import { Pane, Heading, Link } from "evergreen-ui";
import {
  defaultNativeSettings,
  formFields,
  nativeRequiredSettings
} from "@constants/svgoConfig";
import isSvg from "is-svg";
import { getWorker } from "@utils/workerWrapper";
import SvgoWorker from "@workers/svgo.worker";
import { Transformer } from "@components/ConversionPanel";
import SvgrWorker from "@workers/svgr.worker";

let SnackSession;
if (IN_BROWSER) {
  SnackSession = require("@assets/vendor/snack-sdk").SnackSession;
}

let svgo, _babelWorker, svgr;
export default function SvgToReactNative() {
  const name = "SVG to React Native";
  const [value, setValue] = useState("");
  const [url, setUrl] = useState("");
  const [settings, setSettings] = useState(defaultNativeSettings);
  const [optimizedValue, setOptimizedValue] = useState("");
  const snackSession = useRef<any>();

  useEffect(() => {
    (async function() {
      snackSession.current = new SnackSession({
        files: { "App.js": { contents: "", type: "CODE" } },
        sessionId: Math.random()
          .toString(36)
          .substr(2, 8),
        sdkVersion: "37.0.0"
      });

      snackSession.current.startAsync();
      await snackSession.current.addModuleAsync("react-native-svg", "12.x.x");
      const url = await snackSession.current.getUrlAsync();
      setUrl(url);
    })();

    return () => {
      snackSession.current && snackSession.current.stopAsync();
    };
  }, []);

  useEffect(() => {
    (async function() {
      await snackSession.current.sendCodeAsync({
        "App.js": { contents: value, type: "CODE" }
      });
    })();
  }, [value]);

  const transformer = useCallback<Transformer>(
    async ({ value }) => {
      if (!isSvg(value)) throw new Error("This is not a valid svg code.");

      svgo = svgo || getWorker(SvgoWorker);
      svgr = svgr || getWorker(SvgrWorker);

      let _value = await svgo.send({
        value,
        settings: {
          ...(settings.optimizeSvg ? settings : {}),
          ...nativeRequiredSettings
        }
      });

      // set optimized value in state to be used by preview.
      setOptimizedValue(_value);

      _babelWorker = _babelWorker || getWorker(BabelWorker);

      _value = await svgr.send({
        native: true,
        value: _value
      });

      setValue(_value);

      return _value;
    },
    [settings]
  );

  return (
    <>
      <SvgConverter
        settings={settings}
        setSettings={setSettings}
        transformer={transformer}
        babelWorker={BabelWorker}
        name={name}
        resultTitle={"React Native"}
        formFields={formFields(defaultNativeSettings)}
        optimizedValue={optimizedValue}
      />

      {url && (
        <Pane
          display={"flex"}
          flexDirection="column"
          padding={10}
          position="absolute"
          backgroundColor="#fff"
          elevation={2}
          right={20}
          bottom={20}
          borderRadius={2}
        >
          <QRCode value={url} />
          <Heading size={400} marginTop={10}>
            Scan on{" "}
            <Link
              is="a"
              href="https://expo.io/tools#client"
              size={400}
              target="_blank"
            >
              expo
            </Link>{" "}
            app.
          </Heading>
        </Pane>
      )}
    </>
  );
}
