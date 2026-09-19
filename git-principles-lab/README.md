# Git 原理实验台

日期：2026-09-19

## 摘要

Git 可以近似理解为：

> Content-addressed Object Store + Merkle DAG + Mutable Refs + Index + Working Tree

这份交互式材料用少数 Git plumbing 原语模拟上层命令，重点理解：

- `blob / tree / commit`
- `HEAD / branch / ref`
- `index`
- `git add`
- `git commit`
- `git checkout`
- `git rebase`
- Author Date 与 Committer Date 的区别

## 核心结论

1. **commit 不是 diff**：commit 指向一棵完整 tree，并记录 parent。
2. **branch 本质是可变 ref**：它只是一个指向 commit OID 的指针。
3. **Git 底层很像 KV DB**：key 是对象内容的 hash，value 是不可变对象。
4. **rebase 不是移动旧 commit**：它在新的 parent 上重新创建 commit，因此 OID 会变化。
5. **Author Date 通常保留，Committer Date 在 rebase 时刷新**。

## 交互实验建议

1. 创建 `feature` 分支。
2. checkout 到 `feature`。
3. 修改文件并 commit。
4. checkout 到 `main`。
5. 修改文件并 commit。
6. checkout 回 `feature`。
7. 执行 `git rebase main`。
8. 观察右侧 plumbing 命令、Object DB、refs 和 commit OID 的变化。
