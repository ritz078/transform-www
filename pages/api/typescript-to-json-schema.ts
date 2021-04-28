import { NextApiRequest, NextApiResponse } from "next";
import { Config } from "ts-json-schema-generator";
import * as tsj from "ts-json-schema-generator";
import os from "os";
import crypto from "crypto";
import path from "path";
import fs from "fs";

const tmpDir = os.tmpdir?.();

export default (req: NextApiRequest, res: NextApiResponse) => {
  const filePath =
    path.join(tmpDir, crypto.randomBytes(16).toString("hex")) + ".ts";
  try {
    const program = req.body;
    fs.writeFileSync(filePath, program, {
      encoding: "utf-8"
    });
    //   const config: Config = {
    //     path: filePath,
    //     expose: "all",
    //     jsDoc: "extended",
    //     type: "*"
    //   };

    //   const schema = tsj.createGenerator(config).createSchema(config.type);
    const read = fs.readFileSync(filePath, { encoding: "utf-8" });
    res.status(200).send(JSON.stringify({ filePath, program, read }, null, 2));
  } catch (e) {
    res.status(500).send(e.message);
  }
  fs.unlinkSync(filePath);
};
