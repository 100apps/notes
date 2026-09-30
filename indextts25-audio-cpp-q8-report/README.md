# IndexTTS-2.5 × audio.cpp Q8 对比报告

这是一个可直接分享的单文件 HTML 报告。官方输出和 audio.cpp 输出的 WAV 已全部转换为 `data:audio/wav;base64,...` 并嵌入 `index.html`，无需额外的 assets 目录或本机路径即可播放。

## 本地复现

公开页面中的命令使用 `$BENCHMARK_ROOT` 和 `$AUDIO_CPP_ROOT` 作为路径变量。请在 PowerShell 中先设置：

```powershell
$BENCHMARK_ROOT = "E:	ts-benchmark-index25"
$AUDIO_CPP_ROOT = "F:udio.cpp"
```

服务器配置、模型下载、启动命令和 cURL 示例均已放在报告顶部。
