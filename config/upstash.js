import { Client as ClienWorkflow } from "@upstash/workflow";

import { QSTASH_URL, QSTASH_TOKEN } from "./env.js";

export const workflowClient = new ClienWorkflow({
  baseUrl: QSTASH_URL,
  token: QSTASH_TOKEN,
});
