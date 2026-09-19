# AGENTS.md — Notes Repository Publishing Contract

本仓库 `100apps/notes` 是长期公开的 AI / Agent 资料库，并通过 GitHub Pages 发布。

## 0. 用户术语约定

当用户说以下任一表达时：

- “发布到 notes”
- “保存到 notes”
- “提交到 notes”
- “更新 notes”
- “发布到 note”
- “保存到 note”
- “提交到 note”
- “更新 note”

默认都指：

> GitHub 仓库 `100apps/notes` 以及它对应的 GitHub Pages 站点。

除非用户明确指定其他仓库，不要再次询问“notes 是什么”。

---

## 1. 核心模型：One Note = One Directory

每份资料占据仓库根目录下一个独立目录：

```text
<slug>/
├── meta.json
├── index.html
├── README.md      # 可选但推荐
└── assets/...     # 可选
```

例如：

```text
git-principles-lab/
├── meta.json
├── index.html
└── README.md
```

发布 URL 固定为：

```text
https://100apps.github.io/notes/<slug>/
```

因此不要再使用日期层级，不要创建：

```text
notes/YYYY/MM/DD/<slug>/
```

也不要在仓库中再套一层 `notes/`。

---

## 2. slug 规范

`<slug>` 是稳定的项目路径，同时也是公开 URL 的最后一段。

要求：

- 小写英文、数字、连字符
- 简短、稳定、可读
- 创建后尽量不改名
- 不包含日期，除非日期本身就是主题的一部分

例如：

- `git-principles-lab`
- `agent-evaluation`
- `fpga-basics`

---

## 3. meta.json 是唯一索引来源

每个 note 必须包含 `meta.json`：

```json
{
  "slug": "git-principles-lab",
  "title": "Git 原理实验台：从 KV Object Store 到 Rebase",
  "summary": "用交互式网页拆开 Git 黑盒。",
  "date": "2026-09-19",
  "updated": "2026-09-19",
  "type": "interactive",
  "tags": ["Git", "原理", "交互式"]
}
```

字段：

- `slug`: 必须与目录名完全一致
- `title`: 首页标题
- `summary`: 首页简介，1~2 句话
- `date`: 首次发布日，通常不再改变
- `updated`: 最近一次实质更新日期
- `type`: `interactive` / `note` / `report` / `demo` / `reference`
- `tags`: 建议 2~6 个

**不要维护根目录中央 entries.json。**

部署时 `scripts/build.mjs` 会扫描所有根目录中的 `meta.json`，自动生成首页和索引。

---

## 4. 新建一个 note

用户要求发布新资料到 notes 时：

1. 生成稳定 slug。
2. 只创建 `<slug>/`。
3. 写入 `<slug>/meta.json`。
4. 写入 `<slug>/index.html`。
5. 可选保留 `README.md`、Markdown、JSON、assets 等源资料。
6. 检查相对资源路径。
7. 检查敏感信息。
8. commit。
9. push `main`。
10. 检查 Pages workflow。
11. 返回：
   - Pages URL：`https://100apps.github.io/notes/<slug>/`
   - GitHub 源目录链接。

**新建 note 不修改仓库根目录任何中央索引。**

---

## 5. 更新一个已有 note

这是强约束：

> 更新已有 note 时，只修改这个 note 自己的 `<slug>/` 目录。

允许修改：

- `<slug>/index.html`
- `<slug>/README.md`
- `<slug>/meta.json`
- `<slug>/assets/**`
- 该 note 内其他文件

其中实质内容变化时更新 `meta.json.updated`。

默认不要修改：

- 其他 note
- `AGENTS.md`
- `README.md`
- `scripts/**`
- `.github/**`

除非用户明确要求修改发布系统本身。

这样不同 Agent 可以独立更新不同 note，尽量避免冲突。

---

## 6. Markdown 发布

如果输入只有 Markdown：

1. 在该 note 目录保留原始 Markdown。
2. 同目录生成 `index.html` 作为正式网页。
3. 创建或更新同目录 `meta.json`。

原则：

> Markdown 是 source；index.html 是 publication。

---

## 7. HTML 发布要求

- 标准静态 HTML
- 优先单文件、自包含
- 资源使用相对路径
- 尽量减少外部 CDN
- 支持移动端
- `<title>` 有意义
- 不依赖用户机器上的绝对路径

禁止提交：

- API Key
- Token
- Cookie
- 密码
- 私密聊天原文
- 内部机密
- `/Users/...`、`C:\\...` 等本地绝对路径

---

## 8. 首页与 Pages

首页不是 Agent 手工维护的内容。

部署流程：

```text
各个 <slug>/meta.json
        ↓
scripts/build.mjs
        ↓
生成 _site/index.html
生成 _site/entries.json
复制每个 note 到 _site/<slug>/
        ↓
GitHub Pages
```

Pages workflow 位于：

```text
.github/workflows/pages.yml
```

`main` 每次 push 后自动构建和部署。

---

## 9. 删除 note

只有用户明确要求才删除。

删除时直接删除整个：

```text
<slug>/
```

无需修改任何中央索引；下一次部署自动消失。

---

## 10. Commit 规范

新建：

```text
publish: <title>
```

更新：

```text
update: <title>
```

删除：

```text
remove: <title>
```

---

## 11. 默认决策

当用户只说“发布/保存/提交到 notes”时：

- 自动生成 slug
- 自动生成 meta.json
- 自动生成可浏览的 index.html
- 保留有价值的源文件
- 只写新 note 目录
- push main
- 检查 Pages
- 返回短 URL

当用户只说“更新这个 note/更新到 notes”时：

- 根据当前上下文识别已有 slug
- **只修改该 slug 目录**
- 更新 `meta.json.updated`
- push main
- 返回原 URL

核心原则：

> **一个 note，一个目录，一个稳定 URL；note 自包含；首页由构建系统自动发现。**
