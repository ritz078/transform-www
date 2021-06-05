import { NextApiRequest, NextApiResponse } from "next";
import { Config } from "ts-json-schema-generator/dist/src/Config";
import * as tsj from "ts-json-schema-generator";

import jsf, { Schema } from "json-schema-faker";

import os from "os";
import crypto from "crypto";
import path from "path";
import fs from "fs";

const tmpDir = os.tmpdir?.();

export default (req: NextApiRequest, res: NextApiResponse) => {
  const filePath =
    path.join(tmpDir, crypto.randomBytes(16).toString("hex")) + ".ts";
  try {
    fs.writeFileSync(filePath, req.body, {
      encoding: "utf-8"
    });
    const config: Config = {
      path: filePath,
      expose: "all",
      jsDoc: "extended",
      type: "*"
    };

    const schema = tsj.createGenerator(config).createSchema(config.type);

    const data = Object.entries(schema.definitions).map(([key, value]) => {
      const mockValue = jsf.generate(value as Schema);

      const mockValueStr = JSON.stringify(mockValue, null, 2);

      return `const ${key.toLowerCase()} =${mockValueStr}`;
    });

    res.status(200).send(data.join("\n\n"));
  } catch (e) {
    res.status(500).send(e.message);
  }
  fs.unlinkSync(filePath);
};
