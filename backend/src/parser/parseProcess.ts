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

  const processDefinition = parsed["pd:ProcessDefinition"];

  const rawActivities = processDefinition["pd:activity"]
    ? Array.isArray(processDefinition["pd:activity"])
      ? processDefinition["pd:activity"]
      : [processDefinition["pd:activity"]]
    : [];

  const activities = rawActivities.map((activity: any) => ({
    name: activity["@_name"],
    type: activity["pd:type"],
  }));

  const rawGroups = processDefinition["pd:group"]
    ? Array.isArray(processDefinition["pd:group"])
      ? processDefinition["pd:group"]
      : [processDefinition["pd:group"]]
    : [];

  const groups = rawGroups.map((group: any) => ({
    name: group["@_name"],
    type: group["pd:type"],
  }));

  const rawTransitions = processDefinition["pd:transition"]
    ? Array.isArray(processDefinition["pd:transition"])
      ? processDefinition["pd:transition"]
      : [processDefinition["pd:transition"]]
    : [];

  const transitions = rawTransitions.map((transition: any) => ({
    from: transition["pd:from"],
    to: transition["pd:to"],
    condition: transition["pd:conditionType"],
  }));

  return {
    processName: processDefinition["pd:name"],
    start: processDefinition["pd:startName"],
    end: processDefinition["pd:endName"],
    activities,
    groups,
    transitions,
    variables: [],
    errorHandlers: [],
  };
}