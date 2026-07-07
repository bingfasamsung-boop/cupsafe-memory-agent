export function answerRiskQuestion(input, cases) {
  const normalized = normalizeInput(input);
  const ranked = cases
    .map((riskCase) => ({
      ...riskCase,
      similarity: scoreCase(normalized, riskCase),
    }))
    .sort((a, b) => b.similarity - a.similarity)
    .slice(0, 3);

  const top = ranked[0];
  const policyDecision = decide(normalized, top);

  return {
    decision: policyDecision,
    summary: buildSummary(normalized, policyDecision, top),
    retrievedCases: ranked,
    answer: buildAnswer(normalized, policyDecision, ranked),
  };
}

export function normalizeInput(input) {
  return {
    label: input.label || "Untitled transaction",
    operation: input.operation || "transfer",
    amount: Number(input.amount || 0),
    dailyCap: Number(input.dailyCap || 25),
    recipientTrust: input.recipientTrust || "unknown",
    slippageBps: Number(input.slippageBps || 0),
  };
}

function scoreCase(input, riskCase) {
  let score = 0;
  if (input.operation === riskCase.operation) score += 40;
  if (input.recipientTrust === riskCase.recipientTrust) score += 22;
  if (amountBand(input.amount, input.dailyCap) === riskCase.amountBand) score += 18;
  if (input.operation === "swap" && riskCase.tags.includes("slippage")) score += 12;
  if (input.operation === "bridge" && riskCase.tags.includes("finality")) score += 12;
  return score;
}

function decide(input, topCase) {
  if (input.operation === "approve" && input.recipientTrust !== "verified") return "DENY";
  if (input.amount > input.dailyCap) return "DENY";
  if (input.operation === "swap" && input.slippageBps >= 500) return "REVIEW";
  if (input.operation === "bridge") return "REVIEW";
  return topCase?.decision || "REVIEW";
}

function amountBand(amount, cap) {
  if (amount > cap) return "high";
  if (amount >= cap * 0.4) return "medium";
  return "low";
}

function buildSummary(input, decision, topCase) {
  return `${decision}: ${input.label} matched ${topCase?.title || "no stored case"} with operation=${input.operation}, trust=${input.recipientTrust}, amount=${input.amount}.`;
}

function buildAnswer(input, decision, cases) {
  const evidence = cases.map((riskCase) => `- ${riskCase.title}: ${riskCase.evidence}`).join("\n");
  const advice = cases[0]?.advice || "Manually review before signing.";
  return [
    `Decision: ${decision}`,
    "",
    `Transaction: ${input.label}`,
    `Amount: ${input.amount}`,
    `Operation: ${input.operation}`,
    "",
    "Retrieved memory:",
    evidence,
    "",
    `Action: ${advice}`,
  ].join("\n");
}

export async function loadMemoryCases(path = "./memory/cases.json") {
  const response = await fetch(path);
  if (!response.ok) {
    throw new Error(`Unable to load memory cases: ${response.status}`);
  }
  return response.json();
}
