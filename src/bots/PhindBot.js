import Bot from "@/bots/Bot";
import AsyncLock from "async-lock";
import axios from "axios";
import { SSE } from "sse.js";
const { ipcRenderer } = window.require("electron");

export default class PhindBot extends Bot {
  static _brandId = "phind"; // Brand id of the bot, should be unique. Used in i18n.
  static _className = "PhindBot"; // Class name of the bot
  static _logoFilename = "phind-logo.svg"; // Place it in public/bots/
  static _isDarkLogo = true; // The main color of logo is dark
  static _loginUrl = "https://www.phind.com";
  static _lock = new AsyncLock(); // AsyncLock for prompt requests

  constructor() {
    super();
  }

  /**
   * Check whether the bot is logged in, settings are correct, etc.
   * @returns {boolean} - true if the bot is available, false otherwise.
   */
  async _checkAvailability() {
    try {
      const response = await axios.get(
        "https://www.phind.com/api/auth/session",
      );
      if (response?.data?.user?.userId) {
        return true;
      }
    } catch (error) {
      console.error("Error PhindBot check login:", error);
    }
  }

  /**
   * Send a prompt to the bot and call onResponse(response, callbackParam)
   * when the response is ready.
   * @param {string} prompt
   * @param {function} onUpdateResponse params: callbackParam, Object {content, done}
   * @param {object} callbackParam - Just pass it to onUpdateResponse() as is
   */
  async _sendPrompt(prompt, onUpdateResponse, callbackParam) {
    /** @type {{ message_history: Array }}*/
    const context = await this.getChatContext();
    ipcRenderer.invoke("create-chat-window", {
      prompt,
      winName: PhindBot._brandId,
      url: `https://www.phind.com/agent${context.chatId ? `?cache=${context.chatId}` : ""}`,
    });
    const onPhindRequest = (_, postData, text, resolve, reject) => {
      try {
        const source = new SSE("https://https.api.phind.com/agent/", {
          start: false,
          payload: postData,
        });
        source.addEventListener("message", (event) => {
          if (event.data) {
            /** @type {{ "created": number, "model": string, "choices": [ { "index": number, "delta": { "role": string, "content": string } } ] }} */
            const response = JSON.parse(event.data);
            if (response && response.choices && response.choices.length) {
              for (const choice of response.choices) {
                if (choice.delta && choice.delta.content) {
                  text += choice.delta.content;
                }
              }
              onUpdateResponse(callbackParam, {
                content: text,
              });
            }
          }
        });

        source.addEventListener("readystatechange", (event) => {
          if (event.readyState === source.CLOSED) {
            context.message_history.push({
              role: "user",
              content: prompt,
              metadata: {},
            });
            context.message_history.push({
              role: "assistant",
              content: text,
              metadata: {},
            });
            this.setChatContext({
              ...context,
              message_history: context.message_history,
            });
            onUpdateResponse(callbackParam, {
              content: text,
              done: true,
            });
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
    };

    let text = "";
    return new Promise((resolve, reject) => {
      ipcRenderer.once("phind-request", (_, postData) =>
        onPhindRequest(_, postData, text, resolve, reject),
      );
    })
      .then(async () => {
        ipcRenderer.invoke("close-chat-window", PhindBot._brandId);
        let response;
        if (context.chatId) {
          response = await axios.put("https://www.phind.com/api/db/chat", {
            chatId: context.chatId,
            messages: context.message_history?.slice(-2),
          });
        } else {
          response = await axios.post("https://www.phind.com/api/db/chat", {
            title: prompt,
            messages: context.message_history?.slice(-2),
          });
          context.chatId = response.data;
          this.setChatContext(context);
        }
      })
      .catch((error) => {
        console.error("Operation failed:", error);
        ipcRenderer.invoke("close-chat-window", PhindBot._brandId);
      });
  }

  /**
   * Should implement this method if the bot supports conversation.
   * The conversation structure is defined by the subclass.
   * @param null
   * @returns {any} - Conversation structure. null if not supported.
   */
  async createChatContext() {
    return { message_history: [], chatId: undefined };
  }
}
