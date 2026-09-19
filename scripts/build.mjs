import { promises as fs } from "node:fs";
import path from "node:path";

const root = process.cwd();
const out = path.join(root, "_site");
const reserved = new Set([".git", ".github", "scripts", "_site", "node_modules"]);

const esc = (s = "") => String(s).replace(/[&<>"']/g, c => ({
  "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
}[c]));

async function exists(p) {
  try { await fs.access(p); return true; } catch { return false; }
}

async function copyDir(src, dest) {
  await fs.mkdir(dest, { recursive: true });
  for (const e of await fs.readdir(src, { withFileTypes: true })) {
    const a = path.join(src, e.name);
    const b = path.join(dest, e.name);
    if (e.isDirectory()) await copyDir(a, b);
    else if (e.isFile()) await fs.copyFile(a, b);
  }
}

await fs.rm(out, { recursive: true, force: true });
await fs.mkdir(out, { recursive: true });

const entries = [];
for (const e of await fs.readdir(root, { withFileTypes: true })) {
  if (!e.isDirectory() || reserved.has(e.name) || e.name.startsWith(".")) continue;

  const dir = path.join(root, e.name);
  const metaPath = path.join(dir, "meta.json");
  const indexPath = path.join(dir, "index.html");

  if (!(await exists(metaPath))) continue;
  if (!(await exists(indexPath))) {
    throw new Error(`Note ${e.name} has meta.json but no index.html`);
  }

  const meta = JSON.parse(await fs.readFile(metaPath, "utf8"));
  if (meta.slug !== e.name) {
    throw new Error(`meta.slug (${meta.slug}) must equal directory name (${e.name})`);
  }
  if (!meta.title || !meta.summary || !meta.date) {
    throw new Error(`Note ${e.name} is missing title, summary or date`);
  }

  entries.push({
    ...meta,
    url: `./${e.name}/`
  });

  await copyDir(dir, path.join(out, e.name));
}

entries.sort((a, b) =>
  String(b.updated || b.date).localeCompare(String(a.updated || a.date)) ||
  String(b.date).localeCompare(String(a.date)) ||
  String(a.slug).localeCompare(String(b.slug))
);

await fs.writeFile(
  path.join(out, "entries.json"),
  JSON.stringify(entries, null, 2) + "\n",
  "utf8"
);

await fs.writeFile(path.join(out, ".nojekyll"), "", "utf8");

const cards = entries.map(e => `
<a class="card" href="./${esc(e.slug)}/">
  <div class="top">
    <span class="date">${esc(e.date)}</span>
    <span class="type">${esc(e.type || "note")}</span>
  </div>
  <div class="title">${esc(e.title)}</div>
  <div class="summary">${esc(e.summary)}</div>
  <div class="tags">${(e.tags || []).map(t => `<span class="tag">${esc(t)}</span>`).join("")}</div>
</a>`).join("\n");

const html = `<!doctype html>
<html lang="zh-CN">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Notes · 100apps</title>
<meta name="description" content="AI 与 Agent 生成的交互材料、技术笔记和研究资料。">
<style>
:root{--bg:#f7f7f4;--panel:#fff;--text:#18181b;--muted:#71717a;--line:#deded8;--accent:#1d4ed8;--soft:#eef3ff}
*{box-sizing:border-box}
body{margin:0;background:var(--bg);color:var(--text);font-family:-apple-system,BlinkMacSystemFont,"Segoe UI","PingFang SC","Microsoft YaHei",sans-serif}
main{max-width:980px;margin:auto;padding:56px 24px 72px}
header{display:flex;justify-content:space-between;gap:24px;align-items:flex-end;margin-bottom:36px}
h1{font-size:42px;line-height:1;margin:0 0 12px;letter-spacing:-1.5px}
.lead{color:var(--muted);max-width:650px;line-height:1.7}
.count{font:13px ui-monospace,SFMono-Regular,Menlo,monospace;color:var(--muted)}
.list{display:grid;gap:13px}
.card{display:block;text-decoration:none;color:inherit;background:var(--panel);border:1px solid var(--line);border-radius:16px;padding:20px}
.card:hover{border-color:#b8b8b1}
.top{display:flex;gap:10px;flex-wrap:wrap;align-items:center;margin-bottom:10px}
.date,.type{font:12px ui-monospace,SFMono-Regular,Menlo,monospace;color:var(--muted)}
.type{background:var(--soft);color:var(--accent);border-radius:99px;padding:4px 8px}
.title{font-size:21px;font-weight:700;margin-bottom:8px}
.summary{color:var(--muted);line-height:1.65}
.tags{display:flex;gap:6px;flex-wrap:wrap;margin-top:14px}
.tag{font-size:12px;border:1px solid var(--line);padding:4px 8px;border-radius:99px;color:#52525b}
footer{margin-top:40px;color:var(--muted);font-size:13px}
@media(max-width:640px){main{padding:34px 15px 54px}header{display:block}h1{font-size:34px}.count{margin-top:18px}.card{padding:16px}}
</style>
</head>
<body>
<main>
<header>
  <div>
    <h1>Notes</h1>
    <div class="lead">AI 工具和 Agent 生成的交互材料、技术笔记、HTML、Markdown 与研究资料。</div>
  </div>
  <div class="count">${entries.length} notes</div>
</header>
<div class="list">${cards || '<div>暂无资料。</div>'}</div>
<footer>One note · one directory · one stable URL.</footer>
</main>
</body>
</html>`;

await fs.writeFile(path.join(out, "index.html"), html, "utf8");
console.log(`Built ${entries.length} notes into _site/`);
