import AsyncLock from "async-lock";
import Bot from "@/bots/Bot";
import axios from "axios";
import store from "@/store";
import { SSE } from "sse.js";

function generateRandomId() {
  let randomStr = "";
  for (let i = 0; i < 32; i++) {
    randomStr += Math.floor(Math.random() * 16).toString(16);
  }
  return randomStr;
}

export default class QianWenBot extends Bot {
  static _brandId = "qianWen"; // Brand id of the bot, should be unique. Used in i18n.
  static _className = "QianWenBot"; // Class name of the bot
  static _logoFilename = "qianwen-logo.png"; // Place it in public/bots/
  static _loginUrl = "https://qianwen.aliyun.com/";
  static _lock = new AsyncLock(); // AsyncLock for prompt requests

  constructor() {
    super();
  }

  getRequestHeaders() {
    return {
      "x-xsrf-token": store.state.qianWen?.xsrfToken,
    };
  }

  /**
   * Check whether the bot is logged in, settings are correct, etc.
   * @returns {boolean} - true if the bot is available, false otherwise.
   */
  async _checkAvailability() {
    let available = false;
    await axios
      .post(
        "https://qianwen.aliyun.com/querySign",
        {},
        { headers: this.getRequestHeaders() },
      )
      .then((resp) => {
        available = resp.data?.success;
        if (!resp.data?.success) {
          console.error("Error QianWen check login:", resp.data);
        }
      })
      .catch((error) => {
        console.error("Error QianWen check login:", error);
      });

    return available;
  }

  /**
   * Send a prompt to the bot and call onResponse(response, callbackParam)
   * when the response is ready.
   * @param {string} prompt
   * @param {function} onUpdateResponse params: callbackParam, Object {content, done}
   * @param {object} callbackParam - Just pass it to onUpdateResponse() as is
   */
  // eslint-disable-next-line
  async _sendPrompt(prompt, onUpdateResponse, callbackParam) {
    const context = await this.getChatContext();
    const headers = {
      ...this.getRequestHeaders(),
      accept: "text/event-stream",
      "content-type": "application/json",
    };
    const payload = JSON.stringify({
      action: "next",
      contents: [
        {
          contentType: "text",
          content: prompt,
          role: "user",
        },
      ],
      mode: "chat",
      model: "",
      parentMsgId: context.parentMessageId || "",
      requenstId: generateRandomId(),
      // timeout: 17,
      // openSearch: false,
      sessionId: context.sessionId,
      sessionType: "text_chat",
      userAction: context.parentMessageId ? "chat" : "new_top",
    });

    return new Promise((resolve, reject) => {
      if (context.exception) {
        reject(
          new Error(
            `${context.exception?.errorCode} ${context.exception?.errorMsg}`,
          ),
        );
        return;
      }
      try {
        const source = new SSE(
          "https://qianwen.biz.aliyun.com/dialog/conversation",
          {
            headers,
            payload,
            withCredentials: true,
          },
        );

        source.addEventListener("message", (event) => {
          if (event.data === "[DONE]") return;

          if (event.data === "") {
            // sometimes the last chunk is \n
            if (source.chunk.trim() === "") {
              return;
            }
            // Empty message usually means error
            const resp = JSON.parse(source.chunk);
            if (resp?.failed) {
              reject(new Error(`${resp?.errorCode} ${resp?.errorMsg}`));
              return;
            }
          }
          const data = JSON.parse(event.data);
          // the first message data's contents is undefined
          if ((data?.contents?.length ?? 0) == 0) {
            return;
          }
          let content = "";
          for (let contentItem of data.contents) {
            if (contentItem.contentType == "plugin") {
              content += "> Plugin: " + contentItem.pluginName + "\n\n";
            } else if (contentItem.contentType == "text") {
              content += contentItem.content + "\n\n";
            } else if (contentItem.contentType == "referenceLink") {
              let links = JSON.parse(contentItem.content)?.["links"] ?? [];
              content +=
                `> 相关链接 · ${links.length}\n` +
                links
                  .map((link) => `> - [${link.title}](${link.url})`)
                  .join("\n") +
                "\n\n";
            } else {
              content += `> *UNKNOWN CONTENT TYPE:* ${contentItem.contentType}\n`;
            }
          }
          onUpdateResponse(callbackParam, {
            content: content.trim(),
            done: false,
          });
          if (data.stopReason === undefined || data.stopReason === "stop") {
            onUpdateResponse(callbackParam, { done: true });
            context.parentMessageId = data.msgId;
            this.setChatContext(context);
            resolve();
          }
        });

        source.addEventListener("error", (event) => {
          console.error(event);
          reject(this.getSSEDisplayError(event));
        });

        source.stream();
      } catch (err) {
        reject(err);
      }
    });
  }

  /**
   * Should implement this method if the bot supports conversation.
   * The conversation structure is defined by the subclass.
   * @param null
   * @returns {any} - Conversation structure. null if not supported.
   */
  async createChatContext() {
    let context = null;
    await axios
      .post(
        "https://qianwen.aliyun.com/addSession",
        {
          firstQuery: "ChatALL",
          sessionType: "text_chat",
        }, // A hack to set session name
        { headers: this.getRequestHeaders() },
      )
      .then((resp) => {
        if (resp.data?.success) {
          const sessionId = resp.data?.data?.sessionId;
          const userId = resp.data?.data?.userId;
          const parentMsgId = "0";
          context = { sessionId, parentMsgId, userId };
        } else if (resp.data) {
          context = {
            exception: resp.data,
          };
          console.error(
            "Error QianWen adding sesion resp:",
            JSON.stringify(resp.data),
          );
        }
      })
      .catch((err) => {
        console.error("Error QianWen adding sesion:", err);
      });
    return context;
  }
}
