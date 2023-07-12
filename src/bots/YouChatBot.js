import Bot from "@/bots/Bot";
import AsyncLock from "async-lock";
import axios from "axios";
import queryString from "query-string";
import { SSE } from "sse.js";
import { v4 as uuidv4 } from "uuid";

export default class YouChatBot extends Bot {
  static _brandId = "youChat"; // Brand id of the bot, should be unique. Used in i18n.
  static _className = "YouChatBot"; // Class name of the bot
  static _logoFilename = "you-logo.svg"; // Place it in public/bots/
  static _loginUrl = "https://you.com/";
  static _lock = new AsyncLock(); // AsyncLock for prompt requests

  constructor() {
    super();
  }

  /**
   * Check whether the bot is logged in, settings are correct, etc.
   * @returns {boolean} - true if the bot is available, false otherwise.
   * @sideeffect - Set this.constructor._isAvailable
   */
  async checkAvailability() {
    await axios
      .get("https://you.com/api/payments/orders/subscriptions/current")
      .then(() => {
        this.constructor._isAvailable = true;
      })
      .catch((error) => {
        console.error("Error YouChat check login:", error);
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
      accept: "text/event-stream",
    };
    const payload = {
      q: prompt,
      domain: "youchat",
      chatId: context.chatId,
      queryTraceId: context.chatId,
      chat: JSON.stringify(context.chatHistory),
    };
    return new Promise((resolve, reject) => {
      try {
        const source = new SSE(
          `https://you.com/api/streamingSearch?${queryString.stringify(
            payload,
          )}`,
          {
            headers,
            withCredentials: true,
          },
        );
        let text = "";
        source.addEventListener("youChatToken", (event) => {
          const data = JSON.parse(event.data);
          if (data.youChatToken) {
            text += data.youChatToken;
            onUpdateResponse(callbackParam, {
              content: text,
              done: false,
            });
          }
        });
        source.addEventListener("done", () => {
          // save chat question and answer to context
          this.setChatContext({
            chatId: context.chatId,
            chatHistory: [
              ...context.chatHistory,
              {
                question: prompt,
                answer: text,
              },
            ],
          });
          onUpdateResponse(callbackParam, {
            content: text,
            done: true,
          });
          resolve();
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
    return { chatId: uuidv4(), chatHistory: [] };
  }
}
