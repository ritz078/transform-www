import * as React from "react";
import { SvgConverter } from "@components/SvgConverter";
import { useState } from "react";
import { defaultSettings, formFields } from "@constants/svgoConfig";
import { useCallback } from "react";
import { Transformer } from "@components/ConversionPanel";
import isSvg from "is-svg";
import { getWorker } from "@utils/workerWrapper";
import SvgrWorker from "@workers/svgr.worker";
import SvgoWorker from "@workers/svgo.worker";

let prettier, svgo, svgr;
export default function Index() {
  const name = "SVG to JSX";
  const [settings, setSettings] = useState(defaultSettings);
  const [optimizedValue, setOptimizedValue] = useState("");

  const transformer = useCallback<Transformer>(
    async ({ value }) => {
      if (!isSvg(value)) throw new Error("This is not a valid svg code.");

      svgr = svgr || getWorker(SvgrWorker);
      svgo = svgo || getWorker(SvgoWorker);

      let _value = value;

      if (settings.optimizeSvg) {
        _value = await svgo.send({
          value,
          settings
        });
      }

      setOptimizedValue(_value);

      _value = await svgr.send({
        value: _value
      });

      return _value;
    },
    [settings]
  );

  return (
    <SvgConverter
      transformer={transformer}
      formFields={formFields(defaultSettings)}
      setSettings={setSettings}
      optimizedValue={optimizedValue}
      settings={settings}
      name={name}
      resultTitle={"JSX"}
    />
  );
}
