import fs from "node:fs";
import { answerRiskQuestion } from "../src/memory-agent.js";

const cases = JSON.parse(fs.readFileSync(new URL("../memory/cases.json", import.meta.url), "utf8"));

const examples = [
  [
    "pay",
    { label: "Pay 8 USDT to verified fan shop", operation: "transfer", amount: 8, dailyCap: 25, recipientTrust: "verified", slippageBps: 0 },
    "ALLOW",
  ],
  [
    "approve",
    { label: "Approve 50 USDT for unknown contract", operation: "approve", amount: 50, dailyCap: 25, recipientTrust: "unknown", slippageBps: 0 },
    "DENY",
  ],
  [
    "bridge",
    { label: "Bridge 12 USDT before a live match", operation: "bridge", amount: 12, dailyCap: 25, recipientTrust: "known", slippageBps: 80 },
    "REVIEW",
  ],
  [
    "swap",
    { label: "Swap 9 USDT with 6.5% slippage", operation: "swap", amount: 9, dailyCap: 25, recipientTrust: "known", slippageBps: 650 },
    "REVIEW",
  ],
];

const rows = examples.map(([id, input, expected]) => {
  const actual = answerRiskQuestion(input, cases).decision;
  return { id, expected, actual, passed: expected === actual };
});

console.table(rows);

if (rows.some((row) => !row.passed)) {
  process.exitCode = 1;
}
