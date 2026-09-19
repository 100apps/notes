# Notes

公开的 AI / Agent 资料仓库：

- Repository: `100apps/notes`
- Pages: https://100apps.github.io/notes/

## 核心结构

```text
.
├── AGENTS.md
├── README.md
├── scripts/
│   └── build.mjs
├── .github/
│   └── workflows/pages.yml
├── git-principles-lab/
│   ├── meta.json
│   ├── index.html
│   └── README.md
└── <another-note>/
    ├── meta.json
    └── index.html
```

每个 note 是根目录下的一个独立目录。

公开 URL：

```text
https://100apps.github.io/notes/<slug>/
```

首页不维护中央内容清单。CI 会扫描每个 note 的 `meta.json` 自动生成首页。

所有 Agent 在发布或更新前先阅读 [AGENTS.md](./AGENTS.md)。
