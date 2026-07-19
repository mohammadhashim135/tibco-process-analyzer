import { parseProcess } from "./parser/parseProcess.js";

async function main() {
  const result = await parseProcess("../samples/MainProcess.process");

  console.log(JSON.stringify(result, null, 2));
}

main();