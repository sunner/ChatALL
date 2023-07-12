import Bot from "@/bots/Bot";
import i18n from "@/i18n";
import AsyncLock from "async-lock";
import { SSE } from "sse.js";

export default class PiBot extends Bot {
  static _brandId = "pi"; // Brand id of the bot, should be unique. Used in i18n.
  static _className = "PiBot"; // Class name of the bot
  static _logoFilename = "pi-logo.svg"; // Place it in public/bots/
  static _loginUrl = "https://heypi.com/";
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
    this.constructor._isAvailable = true;
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
    const headers = {
      accept: "text/event-stream",
      "Content-Type": "application/json",
      "X-Api-Version": 3,
    };
    const payload = JSON.stringify({
      text: prompt,
    });
    return new Promise((resolve, reject) => {
      try {
        const source = new SSE("https://heypi.com/api/chat", {
          headers,
          payload,
          withCredentials: true,
        });
        let text = "";
        source.addEventListener("partial", (event) => {
          const data = JSON.parse(event.data);
          if (data.text) {
            text += data.text;
            onUpdateResponse(callbackParam, {
              content: text,
              done: false,
            });
          }
        });
        source.addEventListener("readystatechange", (event) => {
          if (event.readyState === source.CLOSED) {
            // after stream closed, done
            onUpdateResponse(callbackParam, {
              content: text,
              done: true,
            });
            resolve();
          }
        });
        source.addEventListener("error", (event) => {
          console.error(event);
          if (event?.source?.xhr?.status === 401) {
            reject(
              new Error(
                `${i18n.global.t("pi.waitPiIntro")}<br/><a href="${
                  this.constructor._loginUrl
                }" target="innerWindow">${this.constructor._loginUrl}</a>`,
              ),
            );
          } else {
            reject(new Error(event));
          }
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
    return null;
  }
}
