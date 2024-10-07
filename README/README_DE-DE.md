<div align="center">
   <img src="../src/assets/logo-cover.png" width=256></img>
   <p><strong>Chatten Sie mit ALLEN AI-Bots gleichzeitig, entdecken Sie die Besten</strong></p>

Deutsch | [English](../README.md) | [Español](README_ES-ES.md) | [Français](README_FR-FR.md) | [Italian](README_IT-IT.md) | [日本語](README_JA-JP.md) | [한국어](README_KO-KR.md) | [Русский](README_RU-RU.md) | [Tiếng Việt](README_VI-VN.md) | [العربية](README_AR-AR.md)| [简体中文](README_ZH-CN.md) | [繁體中文](README_ZH-TC.md)

[![Open in GitHub Codespaces](https://github.com/codespaces/badge.svg)](https://codespaces.new/sunner/ChatALL)

</div>

## Bilder

![Bilder](../screenshots/screenshot-1.png?raw=true)

## Funktionen

Auf großen Sprachmodellen (LLMs) basierende KI-Bots sind erstaunlich. Ihr Verhalten kann jedoch willkürlich sein, und verschiedene Bots sind für unterschiedliche Aufgaben hervorragend geeignet. Wenn Sie die beste Erfahrung machen wollen, sollten Sie sie nicht einzeln ausprobieren. ChatALL (chinesischer Name: 齐叨) kann Anfragen an mehrere KI-Bots gleichzeitig senden und Ihnen so helfen, die besten Ergebnisse zu erzielen.

### Supported bots

| AI Bots                                                                        | Web Zugang    | API           | Notizen                                                 |
| ------------------------------------------------------------------------------ | ------------- | ------------- | ------------------------------------------------------ |
| [360 AI Brain](https://ai.360.cn/)                                             | Ja            | Nein          |                                                        |
| [Baidu ERNIE](https://yiyan.baidu.com/)                                        | Nein          | Ja            |                                                        |
| [Character.AI](https://character.ai/)                                          | Ja            | Nein          |                                                        |
| [ChatGLM2 6B & 130B](https://chatglm.cn/)                                      | Ja            | Nein          | Kein Login erforderlich                                |
| [ChatGPT](https://chatgpt.com)                                             | Ja            | Ja            | Web-Browsing inklusive, Azure OpenAI Services          |
| [Claude](https://www.anthropic.com/claude)                                     | Ja            | Ja            |                                                        |
| [Code Llama](https://ai.meta.com/blog/code-llama-large-language-model-coding/) | Ja            | Nein          |                                                        |
| [Cohere Aya 23](https://cohere.com/blog/aya23)                                 | Nein          | Ja            |                                                        |
| [Cohere Command R Models](https://cohere.com/command)                          | Nein          | Ja            |                                                        |
| [Copilot](https://copilot.microsoft.com/)                                      | Ja            | Nein          |                                                        |
| [Dedao Learning Assistant](https://ai.dedao.cn/)                               | Demnächst     | Nein          |                                                        |
| [Falcon 180B](https://huggingface.co/tiiuae/falcon-180B-chat)                  | Ja            | Nein          |                                                        |
| [Gemini](https://gemini.google.com/)                                           | Ja            | Ja            |                                                        |
| [Gemma 2B & 7B](https://blog.google/technology/developers/gemma-open-models/)  | Ja            | Nein          |                                                        |
| [Gradio](https://gradio.app/)                                                  | Ja            | Nein          | Für Hugging Face space/self-deployed Modelle           |
| [Groq Cloud](https://console.groq.com/docs/models)                             | Nein          | Ja            |                                                        |
| [HuggingChat](https://huggingface.co/chat/)                                    | Ja            | Nein          |                                                        |
| [iFLYTEK SPARK](http://xinghuo.xfyun.cn/)                                      | Ja            | Demnächst     |                                                        |
| [Kimi](https://kimi.moonshot.cn/)                                              | Ja            | Nein          |                                                        |
| [Llama 2 13B & 70B](https://ai.meta.com/llama/)                                | Ja            | Nein          |                                                        |
| [MOSS](https://moss.fastnlp.top/)                                              | Ja            | Nein          |                                                        |
| [Perplexity](https://www.perplexity.ai/)                                       | Ja            | Nein          |                                                        |
| [Phind](https://www.phind.com/)                                                | Ja            | Nein          |                                                        |
| [Pi](https://pi.ai)                                                            | Ja            | Nein          |                                                        |
| [Poe](https://poe.com/)                                                        | Ja            | Demnächst     |                                                        |
| [SkyWork](https://neice.tiangong.cn/)                                          | Ja            | Demnächst     |                                                        |
| [Tongyi Qianwen](http://tongyi.aliyun.com/)                                    | Ja            | Demnächst     |                                                        |
| [Vicuna 13B & 33B](https://lmsys.org/blog/2023-03-30-vicuna/)                  | Ja            | Nein          | Kein Login erforderlich                                |
| [WizardLM 70B](https://github.com/nlpxucan/WizardLM)                           | Ja            | Nein          |                                                        |
| [YouChat](https://you.com/)                                                    | Ja            | Nein          |                                                        |
| [You](https://you.com/)                                                        | Ja            | Nein          |                                                        |
| [Zephyr](https://huggingface.co/spaces/HuggingFaceH4/zephyr-chat)              | Ja            | Nein          |                                                        |

Und mehr...

### Unterstützte Bots

- Schneller Prompt-Modus: Senden Sie den nächsten Prompt, ohne auf das Ende der vorherigen Anfrage zu warten
- Lokale Speicherung des Chatverlaufs zum Schutz Ihrer Privatsphäre
- Markieren Sie die Antwort, die Ihnen gefällt, und löschen Sie die schlechte Antwort
- Automatische Aufrechterhaltung der ChatGPT-Sitzung
- Aktivieren/Deaktivieren von Bots zu jeder Zeit
- Umschalten zwischen ein-, zwei- oder dreispaltiger Ansicht
- Unterstützt mehrere Sprachen (en, zh)
- [TODO] Beste Empfehlungen

## Anforderungen

ChatALL ist ein Client, nicht ein Proxy. Daher müssen Sie:

1. funktionierende Konten und/oder API-Tokens für die Bots haben.
2. eine zuverlässige Netzwerkverbindung zu den Bots haben.
3. Wenn Sie ein VPN verwenden, muss es als System-/Globalproxy eingestellt sein.

## Download / Installation

Downloaden von https://github.com/sunner/ChatALL/releases

### Auf Windows

Laden Sie einfach die Datei \*-win.exe herunter und fahren Sie mit der Installation fort.

### Auf macOS

Für Apple Silicon Mac (M1, M2 CPU), laden Sie die Datei \*-mac-arm64.dmg herunter.

Für andere Macs, laden Sie die Datei \*-mac-x64.dmg herunter.

### Auf Linux

Laden Sie die .AppImage-Datei herunter, machen Sie sie ausführbar und genießen Sie das Click-to-Run-Erlebnis.

## Für Entwickler

### Einen Bot beisteuern

[Die Anleitung](https://github.com/sunner/ChatALL/wiki/%E5%A6%82%E4%BD%95%E6%B7%BB%E5%8A%A0%E4%B8%80%E4%B8%AA%E6%96%B0%E7%9A%84-AI-%E5%AF%B9%E8%AF%9D%E6%9C%BA%E5%99%A8%E4%BA%BA) hilft dir dabei.

### Ausführen

```bash
npm install
npm run electron:serve
```

### Builden

Node.js must be v16.x

Build for your current platform:

```bash
npm run electron:build
```

Build for all platforms:

```bash
npm run electron:build -- -wml --x64 --arm64
```

## Credits

### Mitwirkende

<a href="https://github.com/sunner/ChatALL/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=sunner/ChatALL" />
</a>

### Andere

- GPT-4 hat einen Großteil des Codes beigesteuert
- ChatGPT, Copilot und Google bieten viele Lösungen (in dieser Reihenfolge)
- Inspiriert von [ChatHub](https://github.com/chathub-dev/chathub). Respekt!

## Sponsor

Wenn Ihnen dieses Projekt gefällt, erwägen Sie bitte:

[![ko-fi](https://ko-fi.com/img/githubbutton_sm.svg)](https://ko-fi.com/F1F8KZJGJ)
