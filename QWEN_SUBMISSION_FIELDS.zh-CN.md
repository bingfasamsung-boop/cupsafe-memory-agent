# Qwen Cloud / Devpost 提交字段草稿

状态：草稿，未提交。

## 项目名称

CupSafe Memory Agent

## 一句话简介

一个面向钱包用户和支持团队的风险记忆代理，用历史交易案例解释为什么当前 USDt/DeFi 操作应当 ALLOW、REVIEW 或 DENY。

## 项目介绍

CupSafe Memory Agent 把 CupSafe Coach 的交易规则扩展成可检索风险记忆。用户或支持团队输入一笔交易摘要后，agent 会检索相似历史案例，例如 unknown approval、bridge 风险、高滑点 swap、超出 bankroll cap 的支付，然后给出可解释决策。

当前版本是 Qwen-ready 离线 demo：它不调用 Qwen API、不使用云账号、不连接钱包、不发起交易。后续如果用户确认，可把 `memory-agent.js` 的本地检索和解释层替换为 Qwen Cloud API，并部署到 Alibaba Cloud。

## 技术亮点

- 本地风险记忆库：`memory/cases.json`。
- 相似案例检索：按 operation、recipient trust、amount band、slippage/bridge 特征打分。
- 输出 ALLOW / REVIEW / DENY。
- 生成面向用户的解释文本和行动建议。
- 能复用 CupSafe 已有 GitHub repo、demo 和 pitch deck。

## Demo

本地路径：`outputs/qwen-cupsafe-memory-agent/index.html`

当前演示问题：

- Pay 8 USDT to verified fan shop。
- Approve 50 USDT for unknown contract。
- Bridge 12 USDT before a live match。
- Swap 9 USDT with 6.5% slippage。

## 后续 Qwen Cloud 接入计划

1. 将本地 memory cases 上传为 agent context。
2. 用 Qwen API 生成更自然的风险解释和多语言支持。
3. 在 Alibaba Cloud 上部署一个轻量 backend。
4. 用 GitHub Pages 或 cloud endpoint 公开 demo。
5. 录制 2-3 分钟视频。

## 需要用户确认的事项

- 是否正式参加 Qwen Cloud Hackathon。
- Devpost/Qwen/Alibaba Cloud 账号动作。
- 是否创建公开 repo 或新 branch。
- 是否使用 API key。
- 是否上传视频和最终提交。

## 安全声明

当前 demo 不读取私钥、不连接钱包、不签名、不移动资金；输出仅用于交易前风险解释，不构成投资建议。
