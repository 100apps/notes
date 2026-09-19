# Git 原理实验台（升级版）

这版改成两个核心模块：

## 左边：仓库文件视图

直接展示并联动：

- 工作区文件
- `.git/HEAD`
- `.git/index`
- `.git/refs/heads/*`
- `.git/objects/*`
- `.git/worktrees/*`
- linked worktree 文件

可以点击任意文件查看内容；主工作区文件可以直接编辑。右侧每执行一步 Git 命令，左侧会高亮本步骤修改的文件，并展示该文件的 `before → after`。

## 右边：Git 命令执行区

支持：

- `git status`
- `git add`
- `git commit`
- `git branch`
- `git checkout`
- `git reset --hard`
- `git rebase`
- `git worktree add`

每个命令都拆解为多个内部步骤，并说明：

1. 这一步在做什么
2. 为什么要做
3. 修改了哪些仓库文件
4. 文件前后内容如何变化

## 推荐实验

### Rebase

1. 点击“构造 rebase 场景”
2. 执行 `git rebase main`
3. 逐步查看 `.git/ORIG_HEAD`、objects、refs、index、工作区的变化

### Worktree

1. 点击“构造 worktree 场景”
2. 查看 `.git/worktrees/*`
3. 对比主仓库与 linked worktree 的 `.git` 关系

核心目标是建立：

> Git 命令 → 仓库文件变化

而不是只记命令表面行为。
