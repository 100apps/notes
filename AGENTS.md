# AGENTS.md — Notes Repository Publishing Contract

本仓库是一个长期公开的个人资料库，用于保存 AI / Agent 生成的交互式 HTML、Markdown 技术笔记、研究资料、Demo、可视化页面和小型静态工具。

目标：让任意 Agent 都能低摩擦新增一个独立资料单元，并自动发布到 GitHub Pages。

## 1. 仓库契约

- 默认分支：`main`
- 每个可发布资料必须位于：`notes/YYYY/MM/DD/<slug>/`
- `<slug>` 使用小写英文、数字和连字符。
- 每个资料目录必须存在 `index.html`，它是正式展示入口。
- Markdown、HTML、JSON、图片等源资料可以与 `index.html` 一起保留。
- 一个资料单元尽量自包含，资源优先使用相对路径。
- 不要修改其他资料目录，除非任务明确要求。
- 禁止提交密码、Token、Cookie、私人聊天原文、内部机密或其他敏感信息。

示例目录：

    notes/2026/09/19/git-principles-lab/
    ├── index.html
    ├── README.md
    └── assets/        # 可选

## 2. 首页索引

根目录 `entries.json` 是首页资料列表的唯一索引。

新增资料时必须新增一条记录，字段包括：

- `id`: 全局唯一，建议 `<date>-<slug>`
- `date`: `YYYY-MM-DD`
- `title`: 面向读者的标题
- `summary`: 1~2 句话说明是什么、解决什么问题
- `type`: `interactive` / `note` / `report` / `demo` / `reference`
- `path`: 指向资料目录，并以 `/` 结尾
- `source`: 可选，原始 Markdown 或主源文件
- `tags`: 建议 2~6 个

不要手工修改根目录 `index.html` 来新增卡片；首页动态读取 `entries.json`。

## 3. Markdown 发布

如果输入只有 Markdown：

1. 保留原始 `.md` 文件。
2. 同时生成 `index.html`。
3. `index.html` 忠实呈现 Markdown 内容。
4. 更新 `entries.json`。

原则：Markdown 是 source，`index.html` 是 publication。

## 4. HTML 发布要求

- 标准静态 HTML。
- 优先单文件、自包含。
- 尽量不要求本地服务器才能工作。
- 外部 CDN 依赖尽量少。
- 支持移动端基础浏览。
- `<title>` 必须有意义。

## 5. 标准发布流程

Agent 收到“发布到 notes”类任务后，直接执行：

1. 确定日期 `YYYY/MM/DD`。
2. 生成稳定英文 slug。
3. 创建 `notes/YYYY/MM/DD/<slug>/`。
4. 写入 `index.html`。
5. 写入或保留源资料，如 `README.md`、其他 Markdown、assets。
6. 更新 `entries.json`。
7. 检查所有相对路径。
8. 检查没有敏感信息和本地绝对路径。
9. commit。
10. push `main`。
11. 检查 GitHub Pages workflow。
12. 返回仓库文件链接和 Pages 页面链接。

推荐 commit message：`publish: <title>`。

## 6. 更新已有资料

- 原目录原地修改。
- 不创建重复 entry。
- `id` 与 `path` 保持稳定。
- 标题、简介、标签变化时同步更新 `entries.json`。
- 推荐 commit：`update: <title>`。

## 7. 删除资料

除非用户明确要求，不删除已经发布的资料。删除时同步移除 `entries.json` 对应记录并检查死链。

## 8. GitHub Pages

`.github/workflows/pages.yml` 在 `main` 每次 push 后自动部署整个仓库。

Agent 不应自行改成其他托管方案，除非用户明确要求。

## 9. 发布前检查

- [ ] 目录符合 `notes/YYYY/MM/DD/<slug>/`
- [ ] `index.html` 存在且可打开
- [ ] `entries.json` 是合法 JSON
- [ ] summary 有实际信息量
- [ ] 没有 `/Users/...`、`C:\\...` 等本地绝对路径
- [ ] 没有 API Key / Token / Cookie / 私密数据
- [ ] 相对链接正确
- [ ] push 到 `main`
- [ ] Pages workflow 成功

## 10. 默认决策原则

当用户只说“把这个发布到 notes”时，不要反复询问格式细节。默认：

- 使用当天日期
- 自动生成英文 slug
- 自动生成首页简介
- 自动生成必要的 HTML 展示页
- 保留原始 Markdown / HTML
- 更新 `entries.json`
- push 到 `main`
- 返回最终 Pages 链接

> 每份资料是独立、可链接、可长期保存的静态单元；首页负责发现，Git 负责版本，GitHub Pages 负责发布。
