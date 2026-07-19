import { parseProcess } from "./parser/parseProcess.js";

async function main() {
  await parseProcess("../samples/MainProcess.process");
}

main();