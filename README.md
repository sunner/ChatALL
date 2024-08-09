<div align="center">
  <img src="src/assets/logo-cover.png" width=256></img>
  <p><strong>Chat with ALL AI Bots Concurrently, Discover the Best</strong></p>

[Deutsch](README_DE-DE.md) | English | [Español](README_ES-ES.md) | [Français](README_FR-FR.md) | [Italian](README_IT-IT.md) | [日本語](README_JA-JP.md) | [한국어](README_KO-KR.md) | [Русский](README_RU-RU.md) | [Tiếng Việt](README_VI-VN.md) | [简体中文](README_ZH-CN.md)

[![Open in GitHub Codespaces](https://github.com/codespaces/badge.svg)](https://codespaces.new/sunner/ChatALL)

</div>

## Screenshots

![Screenshot](screenshots/screenshot-1.png?raw=true)

## Features

Large Language Models (LLMs) based AI bots are amazing. However, their behavior can be random and different bots excel at different tasks. If you want the best experience, don't try them one by one. ChatALL (Chinese name: 齐叨) can send prompt to several AI bots concurrently, help you to discover the best results. All you need to do is [download, install](https://github.com/sunner/ChatALL/releases) and ask.

### Is this you?

Typical users of ChatALL are:

- 🤠**Gurus of LLMs**, who want to find the best answers or creations from LLMs.
- 🤓**Researchers of LLMs**, who want to intuitively compare the strengths and weaknesses of various LLMs in different fields.
- 😎**Developers of LLM applications**, who want to quickly debug prompts and find the best-performing foundation models.

### Supported bots

| AI Bots                                                                        | Web Access  | API         | Notes                                       |
| ------------------------------------------------------------------------------ | ----------- | ----------- | ------------------------------------------- |
| [360 AI Brain](https://ai.360.cn/)                                             | Yes         | No API      |                                             |
| [Baidu ERNIE](https://yiyan.baidu.com/)                                        | No          | Yes         |                                             |
| [Character.AI](https://character.ai/)                                          | Yes         | No API      |                                             |
| [ChatGLM2 6B & 130B](https://chatglm.cn/)                                      | Yes         | No API      | No Login required                           |
| [ChatGPT](https://chatgpt.com)                                             | Yes         | Yes         | Web Browsing, Azure OpenAI service included |
| [Claude](https://www.anthropic.com/claude)                                     | Yes         | Yes         |                                             |
| [Code Llama](https://ai.meta.com/blog/code-llama-large-language-model-coding/) | Yes         | No API      |                                             |
| [Cohere Aya 23](https://cohere.com/blog/aya23)                                 | No          | Yes         |                                             |
| [Cohere Command R Models](https://cohere.com/command)                          | No          | Yes         |                                             |
| [Copilot](https://copilot.microsoft.com/)                                      | Yes         | No API      |                                             |
| [Dedao Learning Assistant](https://ai.dedao.cn/)                               | Coming soon | No API      |                                             |
| [Falcon 180B](https://huggingface.co/tiiuae/falcon-180B-chat)                  | Yes         | No API      |                                             |
| [Gemini](https://gemini.google.com/)                                           | Yes         | Yes         |                                             |
| [Gemma 2B & 7B](https://blog.google/technology/developers/gemma-open-models/)  | Yes         | No API      |                                             |
| [Gradio](https://gradio.app/)                                                  | Yes         | No API      | For Hugging Face space/self-deployed models |
| [Groq Cloud](https://console.groq.com/docs/models)                             | No          | Yes         |                                             |
| [HuggingChat](https://huggingface.co/chat/)                                    | Yes         | No API      |                                             |
| [iFLYTEK SPARK](http://xinghuo.xfyun.cn/)                                      | Yes         | Coming soon |                                             |
| [Kimi](https://kimi.moonshot.cn/               )                               | Yes         | No API      |                                             |
| [Llama 2 13B & 70B](https://ai.meta.com/llama/)                                | Yes         | No API      |                                             |
| [MOSS](https://moss.fastnlp.top/)                                              | Yes         | No API      |                                             |
| [Perplexity](https://www.perplexity.ai/)                                       | Yes         | No API      |                                             |
| [Phind](https://www.phind.com/)                                                | Yes         | No API      |                                             |
| [Pi](https://pi.ai)                                                            | Yes         | No API      |                                             |
| [Poe](https://poe.com/)                                                        | Yes         | Coming soon |                                             |
| [SkyWork](https://neice.tiangong.cn/)                                          | Yes         | Coming soon |                                             |
| [Tongyi Qianwen](http://tongyi.aliyun.com/)                                    | Yes         | Coming soon |                                             |
| [Vicuna 13B & 33B](https://lmsys.org/blog/2023-03-30-vicuna/)                  | Yes         | No API      | No Login required                           |
| [WizardLM 70B](https://github.com/nlpxucan/WizardLM)                           | Yes         | No API      |                                             |
| [YouChat](https://you.com/)                                                    | Yes         | No API      |                                             |
| [You](https://you.com/)                                                        | Yes         | No API      |                                             |
| [Zephyr](https://huggingface.co/spaces/HuggingFaceH4/zephyr-chat)              | Yes         | No API      |                                             |

More is coming. Upvote your favorite bots in [these issues](https://github.com/sunner/ChatALL/labels/more%20LLMs).

### Other features

- Quick-prompt mode: send the next prompt without waiting for the previous request to complete
- Save chat history locally, protect your privacy
- Highlight the response you like, delete the bad
- Enable/disable any bots at any time
- Switch between one, two, or three-column view
- Auto update to the latest version
- Dark mode (contributed by @tanchekwei)
- Short keys. Press <kbd>Ctrl</kbd> + <kbd>/</kbd> to know all of them (contributed by @tanchekwei)
- Multiple chats (contributed by @tanchekwei)
- Proxy setting (contributed by @msaong)
- Prompt management (contributed by @tanchekwei)
- Supports multiple languages (Chinese, English, German, French, Russian, Vietnamese, Korean, Japanese, Spanish, Italian)
- Supports Windows, macOS and Linux

Planned features:

You are welcome to contribute to these features.

- [ ] Deploy front-end to GitHub Pages

## Privacy

All chat history, settings and login data are saved locally on your computer.

ChatALL collects anonymous usage data to help us improve the product. Including:

- Which AI bots are prompted and how long the prompt is. Not including the prompt content.
- How long the response is, and which response is deleted/highlighted. Not including the response content.

## Prerequisites

ChatALL is a client, not a proxy. Therefore, you must:

1. Have working accounts and/or API tokens for the bots.
2. Have reliable network connections to the bots.

## Download / Install

Download from https://github.com/sunner/ChatALL/releases

### On Windows

Just download the \*-win.exe file and proceed with the setup.

### On macOS

For Apple Silicon Mac (M1, M2 CPU), download the \*-mac-arm64.dmg file.

For other Macs, download \*-mac-x64.dmg file.

If you are using [Homebrew](https://brew.sh/), you can also install it with:

```bash
brew install --cask chatall
```

### On Linux

Debian-based Distributions: Download the .deb file, double click it and install the software.
Arch-based Distributions: You can clone ChatALL from the AUR [here](https://aur.archlinux.org/packages/chatall-bin). You can install it manually or using an AUR helper like yay or paru.
Other Distributions: Download the .AppImage file, make it executable, and enjoy the click-to-run experience. You can also use [AppimageLauncher](https://github.com/TheAssassin/AppImageLauncher).

## Troubleshooting

If you encounter any problems while using ChatALL, you can try the following methods to resolve them:

1. **Refresh** - press <kbd>Ctrl</kbd> + <kbd>R</kbd> or <kbd>⌘</kbd> + <kbd>R</kbd>.
2. **Restart** - exit ChatALL and run it again.
3. **Re-login** - click the settings button in the upper right corner, then click the corresponding login/logout link to relogin the website.
4. **Create a new chat** - click the `New Chat` button and send prompt again.

If none of the above methods work, you can try **resetting ChatALL**. Note that this will delete all your settings and message history.

You can reset ChatALL by deleting the following directories:

- Windows: `C:\Users\<user>\AppData\Roaming\chatall\`
- Linux: `/home/<user>/.config/chatall/`
- macOS: `/Users/<user>/Library/Application Support/chatall/`

If the problem persists, please [submit an issue](https://github.com/sunner/ChatALL/issues).

## For developers

### Contribute a Bot

[The guide](https://github.com/sunner/ChatALL/wiki/%E5%A6%82%E4%BD%95%E6%B7%BB%E5%8A%A0%E4%B8%80%E4%B8%AA%E6%96%B0%E7%9A%84-AI-%E5%AF%B9%E8%AF%9D%E6%9C%BA%E5%99%A8%E4%BA%BA) may help you.

### Run

```bash
npm install
npm run electron:serve
```

### Build

Build for your current platform:

```bash
npm run electron:build
```

Build for all platforms:

```bash
npm run electron:build -- -wml --x64 --arm64
```

## Credits

### Contributors

<a href="https://github.com/sunner/ChatALL/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=sunner/ChatALL" />
</a>

### Others

- GPT-4 contributed much of the code
- ChatGPT, Copilot and Google provide many solutions (ranked in order)
- Inspired by [ChatHub](https://github.com/chathub-dev/chathub). Respect!

## Sponsor

If you like this project, please consider:

[![ko-fi](https://ko-fi.com/img/githubbutton_sm.svg)](https://ko-fi.com/F1F8KZJGJ)