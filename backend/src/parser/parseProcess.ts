import fs from "fs-extra";
import { XMLParser } from "fast-xml-parser";
import { ProcessModel } from "../types/process.types.js";

const parser = new XMLParser({
  ignoreAttributes: false,
  attributeNamePrefix: "@_",
});

export async function parseProcess(
  filePath: string
): Promise<ProcessModel> {
  const xml = await fs.readFile(filePath, "utf8");

  const parsed = parser.parse(xml);

  console.log(JSON.stringify(parsed, null, 2));

  throw new Error("Parser not implemented yet");
}