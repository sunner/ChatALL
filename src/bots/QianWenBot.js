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
   * @sideeffect - Set this.constructor._isAvailable
   */
  async checkAvailability() {
    await axios
      .post(
        "https://qianwen.aliyun.com/querySign",
        {},
        { headers: this.getRequestHeaders() },
      )
      .then((resp) => {
        this.constructor._isAvailable = resp.data?.success;
        if (!resp.data?.success) {
          console.error("Error QianWen check login:", resp.data);
        }
      })
      .catch((error) => {
        console.error("Error QianWen check login:", error);
        this.constructor._isAvailable = false;
      });

    return this.isAvailable(); // Always return like this
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
      msgId: generateRandomId(),
      parentMsgId: context.parentMessageId || "0",
      contents: [
        {
          contentType: "text",
          content: prompt,
        },
      ],
      timeout: 17,
      openSearch: false,
      sessionId: context.sessionId,
      model: "",
    });

    return new Promise((resolve, reject) => {
      try {
        const source = new SSE("https://qianwen.aliyun.com/conversation", {
          headers,
          payload,
          withCredentials: true,
        });

        source.addEventListener("message", (event) => {
          if (event.data === "") {
            // Empty message usually means error
            const resp = JSON.parse(source.chunk);
            if (resp?.failed) {
              reject(new Error(`${resp?.errorCode} ${resp?.errorMsg}`));
              return;
            }
          }
          const data = JSON.parse(event.data);
          onUpdateResponse(callbackParam, {
            content: data.content[0],
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
        { firstQuery: "ChatALL" }, // A hack to set session name
        { headers: this.getRequestHeaders() },
      )
      .then((resp) => {
        if (resp.data?.success) {
          const sessionId = resp.data?.data?.sessionId;
          const userId = resp.data?.data?.userId;
          const parentMsgId = "0";
          context = { sessionId, parentMsgId, userId };
        }
      })
      .catch((err) => {
        console.error("Error QianWen adding sesion:", err);
      });
    return context;
  }
}
