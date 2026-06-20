# CONTINUE · 交接说明（给下一个窗口/会话）

> 在另一个 Claude Code 窗口接着迭代时，先读这份。所有进度都在 **本地磁盘 + GitHub**，不会丢。

## 一、当前状态（截至 v1.2.1）

- **线上**：https://bucuoa269-jpg.github.io/ai-for-me-app/
- **仓库**：`bucuoa269-jpg/ai-for-me-app`（Public，main 分支，GitHub Actions 自动部署）
- **技术栈**：Vite + React + TS + Tailwind v3 + HashRouter + framer-motion，纯静态
- **已完成**：
  - 9 个页面：首页 / 线索库(含分类汇总) / 深访 / 城市 / 学习 / 风险雷达 / **链接库** / 提交 / 关于 / 版本日志
  - 机会线索 30、深访 11（含 3 条联网核验真实深访）、城市 5、学习 9 + 7天路线
  - **线索链接库 307 条**（联网核验、可访问、按 A/B/C/D 分级，支持赛道/信源/类型筛选）
  - 信源分级、机会评分、风险提示、7天验证计划、localStorage 收藏

## 二、常用命令

```bash
npm install
npm run dev        # 本地开发
npm run build      # 构建（含 tsc --noEmit 类型检查）
git add -A && git commit -m "..." && git push   # 推送即自动部署
```

## 三、线索链接库怎么继续扩充

采集器在 `private/`（已 gitignore，**不含 key**）：
- `private/zsearch.mjs` — 单条联网搜索测试
- `private/harvest.mjs` — 批量采集：搜索 → 去重 → **逐条 curl 核验能打开** → 按域名信源分级 → 过滤垃圾域名 → **累积写入** `src/data/linkLibrary.json`
- 跑法：`node private/harvest.mjs <round>`（需联网；round 0/1/2… 分批）

**采集需要一个"搜索来源"，二选一：**
1. **原生 Claude（推荐）**：用 Claude 账号登录 Claude Code（见下「四」），直接用内置 WebSearch/WebFetch，免费。
2. **智谱 Web Search API**：`harvest.mjs` 当前借道智谱搜索接口，鉴权读环境变量 `ANTHROPIC_AUTH_TOKEN`，**需账户有搜索额度/资源包**。

> 铁律：**链接必须 curl 核验能打开（剔除 403/521 与垃圾域名）才入库**；未人工核验内容标 D「待核验」；绝不编造链接。

## 四、智谱 ↔ 原生 Claude 切换

- 当前 `~/.claude/settings.json` 已清空智谱覆盖（备份在 `~/.claude/settings.zhipu-backup.json`）。
- **切原生**：完全退出 Claude Code → 重开 → `/login` 用 Claude 账号 → `/status` 确认模型是 Claude/Opus（不是 glm-5.1）。
- **切回智谱**：把 `settings.zhipu-backup.json` 覆盖回 `settings.json`，重启即可。
- 注意：改 settings 后**必须重启**才生效（运行中的进程不会重读）。

## 五、下一步 TODO

- [ ] 继续扩充链接库冲 1000（多跑 harvest round，优先播客/视频访谈/官方报告/平台比赛）
- [ ] 把 307+ 链接里的 A/B 级精选，人工核验内容后升格为正式「机会/深访」条目
- [ ] 清爽改版（参考 scys 信息流+留白，保留本站理念）
- [ ] 工作流 Node 20 → 22（消除部署告警）
- [ ] 链接库数据量大后，可改为按需 fetch JSON（代码分割）减小首屏包体

## 六、脱敏铁律（务必遵守）

不写入任何私人联系方式/微信/二维码/家庭经历/真实收入/商业机密；联系方式全用占位符（`src/data/siteConfig.ts`）；案例数据标 demo/待核验/灵感池；收益内容挂风险提示。**绝不把 API key 写进代码或提交。**
