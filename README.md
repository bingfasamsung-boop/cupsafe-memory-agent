# CupSafe Memory Agent - Qwen Ready Demo

时间：2026-07-07 11:58 +08:00

这是 Qwen Cloud Global AI Hackathon 的离线准备包，用于把 CupSafe Coach 扩展成“风险记忆代理”。

## 当前范围

- 不调用 Qwen API。
- 不使用 Alibaba Cloud 账号。
- 不连接钱包。
- 不读取私钥、助记词、钱包文件或浏览器密码库。
- 只读取本地 `memory/cases.json`。

## 文件

- `index.html`：静态 agent demo。
- `src/memory-agent.js`：风险记忆检索和决策逻辑。
- `memory/cases.json`：风险案例记忆库。
- `QWEN_SUBMISSION_FIELDS.zh-CN.md`：Devpost/Qwen 提交字段草稿。
- `DEMO_VIDEO_SCRIPT.md`：90-120 秒演示视频脚本。
- `scripts/verify-qwen-demo.mjs`：本地决策验证脚本。

## 本地验证

可用静态服务器预览：

```powershell
python -m http.server 8093
```

然后访问 `http://127.0.0.1:8093/`。

验证示例决策：

```powershell
node scripts/verify-qwen-demo.mjs
```

## 正式推进前需要用户确认

- Devpost/Qwen/Alibaba Cloud 注册或登录。
- API key 或云部署。
- GitHub repo/branch 发布。
- 视频上传。
- 最终提交。
