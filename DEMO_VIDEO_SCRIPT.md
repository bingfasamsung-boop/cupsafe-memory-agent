# Qwen Demo Video Script

目标长度：90-120 秒

用途：如果用户确认参加 Qwen Cloud Global AI Hackathon，可按这份脚本录制 Devpost demo 视频。当前不上传、不发布。

## 镜头 1 - 项目定位

画面：打开 `CupSafe Memory Agent` 首页。

旁白：

> CupSafe Memory Agent is a Qwen-ready wallet safety agent. It helps users and support teams explain risky USDt and DeFi actions before a wallet signature is requested.

中文要点：

- Qwen-ready，不代表当前已接入 Qwen API。
- 当前是离线 demo，重点展示 memory retrieval + risk reasoning。
- 不连接钱包、不调用云账号、不签名。

## 镜头 2 - 风险记忆

画面：展示左侧模拟提问和右侧 Agent Answer。

旁白：

> The agent uses a small local memory of prior risk cases: known merchant payments, unknown approvals, bridge risk, high slippage swaps, and over-cap spending.

中文要点：

- memory/cases.json 是本地风险记忆库。
- 后续可迁移到 Qwen Cloud context 或检索层。

## 镜头 3 - ALLOW 示例

画面：点击 `Pay 8 USDT to verified fan shop`。

旁白：

> A small payment to a verified merchant is allowed because it matches the safe merchant memory and stays below the bankroll cap.

中文要点：

- 低金额。
- verified merchant。
- 金额未超过 cap。

## 镜头 4 - DENY 示例

画面：点击 `Approve 50 USDT for unknown contract`。

旁白：

> An approval to an unknown contract is denied. The agent retrieves the unknown approval pattern and explains why token allowance can become a drain risk.

中文要点：

- unknown approval 是重点风险。
- 先解释原因，再给行动建议。

## 镜头 5 - REVIEW 示例

画面：点击 bridge 或 high-slippage swap 示例。

旁白：

> Bridge actions and high slippage swaps are not always malicious, but they require manual review. The agent tells the user what to verify before signing.

中文要点：

- REVIEW 表示不自动放行。
- bridge 要核对目标链、地址、状态。
- swap 要降低滑点或换更深流动性。

## 镜头 6 - Qwen Cloud 后续接入

画面：展示 README 或提交字段草稿。

旁白：

> The next step is to connect this local memory layer to Qwen Cloud for richer explanations, multilingual support, and a hosted agent backend.

中文要点：

- 当前不需要 API key。
- 正式提交前需要 Devpost/Qwen/Alibaba Cloud 账号确认。
- 任何云部署、视频上传、最终提交都需要用户确认。

## 结尾

画面：回到首页标题。

旁白：

> CupSafe Memory Agent turns confusing wallet prompts into explainable decisions: allow, review, or deny.
