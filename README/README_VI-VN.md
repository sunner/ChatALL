<div align="center">
  <img src="../src/assets/logo-cover.png" width=256></img>
  <p><strong>Trò chuyện đồng thời với tất cả những AI bots, Tìm ra câu trả lời tốt nhất </strong></p>

[Deutsch](README_DE-DE.md) | [English](../README.md) | [Español](README_ES-ES.md) | [Français](README_FR-FR.md) | [Italian](README_IT-IT.md) | [日本語](README_JA-JP.md) | [한국어](README_KO-KR.md) | [Русский](README_RU-RU.md) | Tiếng Việt | [العربية](README_AR-AR.md)| [简体中文](README_ZH-CN.md) | [繁體中文](README_ZH-TC.md)

[![Open in GitHub Codespaces](https://github.com/codespaces/badge.svg)](https://codespaces.new/sunner/ChatALL)

</div>

## Ảnh chụp màn hình

![Screenshot](../screenshots/screenshot-1.png?raw=true)

## Tính năng

Các Chat bots AI dựa trên Mô hình ngôn ngữ lớn (Large Language Models - LLMs) đều rất tuyệt. Tuy nhiên, hành vi đối với các câu hỏi lại là ngẫu nhiên và mỗi bots lại có thế mạnh, sự vượt trội ở các loại nhiệm vụ khác nhau. Nếu bạn muốn có được trải nghiệm tốt nhất, đừng thử với từng cái một. ChatAll (Tên Tiếng Trung: 齐叨) sẽ gửi đồng loạt tin nhắn tới một số lượng lớn các bots AI, giúp bạn tìm ra kết quả tốt nhất.

### Danh sách AI Bots được hỗ trợ

| AI Bots                                                                        | Truy cập Web | API          | Ghi chú                                               |
| ------------------------------------------------------------------------------ | ------------ | ------------ | ----------------------------------------------------- |
| [360 AI Brain](https://ai.360.cn/)                                             | Có           | Không có     |                                                       |
| [Baidu ERNIE](https://yiyan.baidu.com/)                                        | No           | Có           |                                                       |
| [Character.AI](https://character.ai/)                                          | Có           | Không có     |                                                       |
| [ChatGLM2 6B & 130B](https://chatglm.cn/)                                      | Có           | Không có API | Không yêu cầu tài khoản                              |
| [ChatGPT](https://chatgpt.com)                                             | Có           | Có           | Bao gồm cả trình duyệt Web, Azure OpenAI service       |
| [Claude](https://www.anthropic.com/claude)                                     | Có           | Có           |                                                       |
| [Code Llama](https://ai.meta.com/blog/code-llama-large-language-model-coding/) | Có           | Không có     |                                                       |
| [Cohere Aya 23](https://cohere.com/blog/aya23)                                 | Không        | Có           |                                                       |
| [Các mô hình Cohere Command R](https://cohere.com/command)                     | Không        | Có           |                                                       |
| [Copilot](https://copilot.microsoft.com/)                                      | Có           | Không có API |                                                       |
| [Dedao Learning Assistant](https://ai.dedao.cn/)                               | Sắp ra mắt   | Không có API |                                                       |
| [Falcon 180B](https://huggingface.co/tiiuae/falcon-180B-chat)                  | Có           | Không có     |                                                       |
| [Gemini](https://gemini.google.com/)                                           | Có           | Có           |                                                       |
| [Gemma 2B & 7B](https://blog.google/technology/developers/gemma-open-models/)  | Có           | Không có     |                                                       |
| [Gradio](https://gradio.app/)                                                  | Có           | Không có API | Dành cho models Hugging Face không gian/tự triển khai |
| [Groq Cloud](https://console.groq.com/docs/models)                             | Không có     | Có           |                                                       |
| [HuggingChat](https://huggingface.co/chat/)                                    | Có           | Không có API |                                                       |
| [iFLYTEK SPARK](http://xinghuo.xfyun.cn/)                                      | Có           | Sắp ra mắt   |                                                       |
| [Kimi](https://kimi.moonshot.cn/)                                              | Có           | Không có     |                                                       |
| [Llama 2 13B & 70B](https://ai.meta.com/llama/)                                | Có           | Không có     |                                                       |
| [MOSS](https://moss.fastnlp.top/)                                              | Có           | Không có API |                                                       |
| [Perplexity](https://www.perplexity.ai/)                                       | Có           | Không có     |                                                       |
| [Phind](https://www.phind.com/)                                                | Có           | Không có     |                                                       |
| [Pi](https://pi.ai)                                                            | Có           | Không có     |                                                       |
| [Poe](https://poe.com/)                                                        | Có           | Sắp ra mắt   |                                                       |
| [SkyWork](https://neice.tiangong.cn/)                                          | Có           | Sắp ra mắt   |                                                       |
| [Tongyi Qianwen](http://tongyi.aliyun.com/)                                    | Có           | Sắp ra mắt   |                                                       |
| [Vicuna 13B & 33B](https://lmsys.org/blog/2023-03-30-vicuna/)                  | Có           | Không có API | Không yêu cầu tài khoản                              |
| [WizardLM 70B](https://github.com/nlpxucan/WizardLM)                           | Có           | Không có     |                                                       |
| [YouChat](https://you.com/)                                                    | Có           | Không có     |                                                       |
| [You](https://you.com/)                                                        | Có           | Không có     |                                                       |
| [Zephyr](https://huggingface.co/spaces/HuggingFaceH4/zephyr-chat)              | Có           | Không có     |                                                       |

Và hơn thế nữa ...

### Tính năng khác

- Chế độ Quick-prompt: gửi prompt tiếp theo đó mà không cần chờ yêu cầu trước đó hoàn thành
- Lưu trữ lịch sử trò chuyện trên máy tính cục bộ, bảo vệ quyền riêng tư của bạn
- Highlight câu trả lời bạn yêu thích và xóa câu trả lời có giá trị thấp
- Tự động duy trì phiên kết nối với ChatGPT
- Bật / Tắt bất kỳ bots nào vào bất kỳ thời điểm nào
- Chuyển đổi giữa chế độ xem một, hai hoặc ba cột
- Hỗ trợ đa ngôn ngữ (Tiếng Anh, Tiếng Trung)
- [TODO] Đưa ra gợi ý tốt nhất

## Điều kiện tiên quyết

ChatALL là một client, không phải là proxy. Vì vậy, bạn cần:

1. Có tài khoản đang hoạt động hoặc có khóa API tokens cho các bots.
2. Có kết nối mạng đáng tin cậy tới các bots.
3. Nếu bạn đang sử dụng VPN, nó phải được đặt làm proxy của system/global.

## Tải xuống / Cài đặt

Tải xuống từ: https://github.com/sunner/ChatALL/releases

### Windows

Chỉ cần tải xuống tệp \*-win.exe và tiến hành cài đặt.

### macOS

Đối với những dòng máy Mac sử dụng chip M1, M2, tải xuống tệp \*-mac-arm64.dmg.

Đối với những dòng máy Mac còn lại, tải xuống tệp \*-mac-x64.dmg.

### Linux

Tải xuống và chạy tệp .AppImage sau đó tận hưởng trải nghiệm click-to-run.

## Dành cho các Nhà phát triển

### Đóng góp Bot

[Hướng dẫn](https://github.com/sunner/ChatALL/wiki/%E5%A6%82%E4%BD%95%E6%B7%BB%E5%8A%A0%E4%B8%80%E4%B8%AA%E6%96%B0%E7%9A%84-AI-%E5%AF%B9%E8%AF%9D%E6%9C%BA%E5%99%A8%E4%BA%BA) này sẽ giúp bạn.

### Chạy thử

```bash
npm install
npm run electron:serve
```

### Build

Build cho nền tảng hiện tại của bạn:

```bash
npm run electron:build
```

Build cho mọi nền tảng:

```bash
npm run electron:build -- -wml --x64 --arm64
```

## Công nhận

### Các nhà đóng góp

<a href="https://github.com/sunner/ChatALL/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=sunner/ChatALL" />
</a>

### Vài thông tin khác

- GPT-4 đóng góp rất nhiều mã nguồn
- ChatGPT, Copilot và Google cung cấp nhiều giải pháp (được xếp hạng theo thứ tự)
- Lấy cảm hứng từ [ChatHub](https://github.com/chathub-dev/chathub). Tôn trọng!

## Sponsor

Nếu bạn thích dự án này, xin vui lòng xem xét:

[![ko-fi](https://ko-fi.com/img/githubbutton_sm.svg)](https://ko-fi.com/F1F8KZJGJ)
