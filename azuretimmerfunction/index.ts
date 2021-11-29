import { AzureFunction, Context } from "@azure/functions";
import { bootstrap } from "./main";

const timerTrigger: AzureFunction = async function (
  context: Context,
  myTimer: any
): Promise<void> {
  var timeStamp = new Date().toISOString();

  if (myTimer.isPastDue) {
    context.log("Timer function is running late!");
  }
  console.log(`start nestjs app ${timeStamp}`);
  await bootstrap();
};
export default timerTrigger;
