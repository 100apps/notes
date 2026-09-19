# Git 原理实验台

目标：把 Git 命令和真实仓库文件变化直接对应起来。

## 页面结构

### Repository filesystem

左侧直接展示：

- working tree
- `.git/HEAD`
- `.git/index`
- `.git/refs/heads/*`
- `.git/objects/*`
- `.git/ORIG_HEAD`
- `.git/worktrees/*`
- linked worktree 文件

工作区文件可以直接编辑。选中某个执行步骤后，左侧只高亮这一步真正修改的文件；点击变化文件可直接查看 before / after。

### Command workbench

支持：

- `git status`
- `git diff` / `git diff --cached`
- `git add`
- `git commit`
- `git branch`
- `git checkout`
- `git reset --hard`
- `git rebase`
- `git worktree add`
- `git log --oneline --decorate --all`

参数都可以修改。执行后会分解为内部步骤，并标注每一步修改的虚拟仓库文件。

## 内置学习场景

- 未提交修改：用于学习 `status → diff → add → commit`
- Rebase：构造 main / feature 分叉，再执行 `git rebase main`
- Worktree：构造额外分支并观察 `.git/worktrees/*` 与 linked worktree

## 验收

已使用 Chromium 自动回归测试验证：

- 首屏无 JS 错误
- 文件树可渲染 `.git/index` 与 `.git/objects/*`
- 工作区编辑与保存有效
- `status / diff / add / commit` 完整执行有效
- `rebase` 会重建 commit，并出现 `ORIG_HEAD`
- `worktree add` 会生成 `.git/worktrees/*` 和 linked worktree 文件
- 步骤变化可以跳转到文件 before / after
- `git log` 可读取 commit DAG
- 390px 宽度下没有页面级横向溢出
