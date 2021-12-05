import { AzureFunction, Context } from "@azure/functions";
import { createApp } from "../src/main";

const timerTrigger: AzureFunction = async function (
  context: Context,
  myTimer: any
): Promise<void> {
  console.log("timerTrigger");
  console.log = (...args) => context.log(...args);
  console.info = (...args) => context.log(...args);
  console.warn = (...args) => context.log(...args);
  console.error = (...args) => context.log(...args);
  console.debug = (...args) => context.log(...args);
  console.log("timerTrigger");
  try {
    await createApp();
  } catch (error) {
    console.error(error);
  }
};
export default timerTrigger;
