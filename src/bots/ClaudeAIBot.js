import Bot from "@/bots/Bot";
import store from "@/store";
import AsyncLock from "async-lock";
import axios from "axios";
import { SSE } from "sse.js";
import { v4 as uuidv4 } from "uuid";

export default class ClaudeAIBot extends Bot {
  static _brandId = "claudeAi"; // Brand id of the bot, should be unique. Used in i18n.
  static _className = "ClaudeAIBot"; // Class name of the bot
  static _logoFilename = "claude-ai-logo.svg"; // Place it in public/bots/
  static _isDarkLogo = true; // The main color of logo is dark
  static _loginUrl = "https://claude.ai/";
  static _lock = new AsyncLock(); // AsyncLock for prompt requests

  constructor() {
    super();
  }

  /**
   * Check whether the bot is logged in, settings are correct, etc.
   * @returns {boolean} - true if the bot is available, false otherwise.
   */
  async _checkAvailability() {
    let available = false;

    if (store.state.claudeAi.org) {
      const currentAcountResponse = await axios.get(
        "https://claude.ai/api/account",
      );

      if (currentAcountResponse.status === 200) {
        available = true;
      }
    }

    return available;
  }

  /**
   * Send a prompt to the bot and call onResponse(response, callbackParam)
   * when the response is ready.
   * @param {string} prompt
   * @param {function} onUpdateResponse params: callbackParam, Object {content, done}
   * @param {object} callbackParam - Just pass it to onUpdateResponse() as is
   */
  async _sendPrompt(prompt, onUpdateResponse, callbackParam) {
    const context = await this.getChatContext();
    const headers = {
      accept: "text/event-stream, text/event-stream",
      "Content-Type": "application/json",
    };
    const url = `https://claude.ai/api/organizations/${store.state.claudeAi.org}/chat_conversations/${context.uuid}/completion`;
    const payload = JSON.stringify({
      attachments: [],
      files: [],
      prompt: prompt,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    });
    return new Promise((resolve, reject) => {
      try {
        const source = new SSE(url, {
          headers,
          payload,
          withCredentials: true,
        });
        let text = "";
        source.addEventListener("completion", (event) => {
          try {
            const data = JSON.parse(event.data);
            if (data.completion) {
              text += data.completion;
              onUpdateResponse(callbackParam, {
                content: text,
                done: false,
              });
            }
          } catch (error) {
            console.error(event);
            reject(this.getSSEDisplayError(event));
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
          reject(this.getSSEDisplayError(event));
        });
        source.stream();
      } catch (err) {
        reject(err);
        console.error("Error ClaudeAI _sendPrompt", err);
      }
    });
  }

  /**
   * Should implement this method if the bot supports conversation.
   * The conversation structure is defined by the subclass.
   * @returns {any} - Conversation structure. null if not supported.
   */
  async createChatContext() {
    let context = null;
    const uuid = uuidv4();
    try {
      const createResponse = await axios.post(
        `https://claude.ai/api/organizations/${store.state.claudeAi.org}/chat_conversations`,
        { name: "", uuid: uuid },
      );

      if (createResponse.status === 201) {
        context = {
          uuid,
        };
      } else {
        console.error(
          "Error ClaudeAI createChatContext status",
          createResponse,
        );
      }
    } catch (error) {
      console.error("Error ClaudeAI createChatContext", error);
    }
    return context;
  }
}
