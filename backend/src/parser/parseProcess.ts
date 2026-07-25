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

  for (const group of rawGroups) {
    const groupActivities = group["pd:activity"]
      ? Array.isArray(group["pd:activity"])
        ? group["pd:activity"]
        : [group["pd:activity"]]
      : [];

    activities.push(
      ...groupActivities.map((activity: any) => ({
        name: activity["@_name"],
        type: activity["pd:type"],
      }))
    );
  }

  const groups = rawGroups.map((group: any) => ({
    name: group["@_name"],
    type: group["pd:type"],
  }));

  const rawErrorHandlers = processDefinition["pd:errorHandlers"]?.["pd:errorHandler"]
  ? Array.isArray(processDefinition["pd:errorHandlers"]["pd:errorHandler"])
    ? processDefinition["pd:errorHandlers"]["pd:errorHandler"]
    : [processDefinition["pd:errorHandlers"]["pd:errorHandler"]]
  : [];

for (const handler of rawErrorHandlers) {
  const handlerActivities = handler["pd:activity"]
    ? Array.isArray(handler["pd:activity"])
      ? handler["pd:activity"]
      : [handler["pd:activity"]]
    : [];

  activities.push(
    ...handlerActivities.map((activity: any) => ({
      name: activity["@_name"],
      type: activity["pd:type"],
    }))
  );
}

const rawVariables = processDefinition["pd:processVariables"]?.["pd:processVariable"]
  ? Array.isArray(processDefinition["pd:processVariables"]["pd:processVariable"])
    ? processDefinition["pd:processVariables"]["pd:processVariable"]
    : [processDefinition["pd:processVariables"]["pd:processVariable"]]
  : [];

const variables = rawVariables.map((variable: any) => ({
  name: variable["@_name"],
  type: variable["pd:type"],
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
    variables,
    errorHandlers: rawErrorHandlers.map((handler: any) => ({
    name: handler["@_name"],
      })),
  };
}