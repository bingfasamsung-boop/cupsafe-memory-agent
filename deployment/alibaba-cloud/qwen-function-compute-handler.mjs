const DASH_SCOPE_URL = "https://dashscope.aliyuncs.com/compatible-mode/v1/chat/completions";

const SYSTEM_PROMPT = [
  "You are CupSafe Memory Agent, a pre-transaction wallet safety explainer.",
  "Return concise ALLOW, REVIEW, or DENY guidance with evidence from retrieved memory cases.",
  "Never request private keys, seed phrases, wallet signatures, or transactions."
].join(" ");

function buildResponse(statusCode, body) {
  return {
    statusCode,
    headers: { "content-type": "application/json; charset=utf-8" },
    body: JSON.stringify(body)
  };
}

export async function handler(event) {
  const apiKey = process.env.DASHSCOPE_API_KEY;
  if (!apiKey) {
    return buildResponse(500, { error: "DASHSCOPE_API_KEY is not configured" });
  }

  const payload = typeof event === "string" ? JSON.parse(event || "{}") : event || {};
  const transaction = payload.transaction || {};
  const memory = payload.memory || [];

  const userContent = JSON.stringify({
    task: "Explain wallet transaction risk before signature",
    transaction,
    retrievedMemoryCases: memory
  });

  const response = await fetch(DASH_SCOPE_URL, {
    method: "POST",
    headers: {
      authorization: `Bearer ${apiKey}`,
      "content-type": "application/json"
    },
    body: JSON.stringify({
      model: process.env.QWEN_MODEL || "qwen-plus",
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: userContent }
      ],
      temperature: 0.2
    })
  });

  if (!response.ok) {
    return buildResponse(response.status, {
      error: "Qwen Cloud request failed",
      detail: await response.text()
    });
  }

  const result = await response.json();
  return buildResponse(200, {
    decision: result.choices?.[0]?.message?.content || "",
    provider: "Alibaba Cloud DashScope / Qwen"
  });
}
