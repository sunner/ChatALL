import Bot from "@/bots/Bot";
import axios from "axios";
import md5 from "md5";
import WebSocketAsPromised from "websocket-as-promised";
import AsyncLock from "async-lock";
import store from "@/store";

export default class PoeBot extends Bot {
  static _brandId = "poe"; // Brand id of the bot, should be unique. Used in i18n.
  static _className = "PoeBot"; // Class name of the bot
  static _logoFilename = "default-logo.svg"; // Place it in public/bots/
  static _loginUrl = "https://poe.com/";
  static _lock = new AsyncLock();

  context = {
    buildId: "",
    chatId: 0,
    settings: null,
    lastMessageId: 0,
  };

  constructor() {
    super();
  }

  async gqlPost(queryName, variables) {
    const { settings } = this.context;
    const formkey = store.state.poe.formkey;
    const queryHashs = {
      AnnotateWithIdsProviderQuery:
        "b4e6992c3af8f208ab2b3979dce48889835736ed29f623ea9f609265018d0d8f",
      chatHelpers_sendMessageMutation_Mutation:
        "dc684d8e0aab4cee82ed40ef7381b40cc31b1dd3afdf0e5c0a500364994fed8b",
      ChatListPaginationQuery:
        "c2e523bd328fee74768a0356481ba24da372b2e54d07820bcd0d439b2bd60495",
      subscriptionsMutation:
        "61c1bfa1ba167fd0857e3f6eaf9699e847e6c3b09d69926b12b5390076fe36e6",
    };

    const payload = {
      extensions: { hash: queryHashs[queryName] },
      queryName,
      variables,
    };
    const tagId = md5(JSON.stringify(payload) + formkey + "4LxgHM6KpFqokX0Ox");
    const headers = {
      "Content-Type": "application/json",
      "poe-formkey": formkey,
      "poe-tchannel": settings.tchannelData.channel,
      "poe-tag-id": tagId,
    };

    const response = await axios.post("https://poe.com/api/gql_POST", payload, {
      headers,
    });

    return response.data;
  }
  /**
   * Check whether the bot is logged in, settings are correct, etc.
   * @returns {boolean} - true if the bot is available, false otherwise.
   */
  async _checkAvailability() {
    let available = false;

    const modelHandles = {
      a2: "Claude-instant",
      a2_100k: "Claude-instant-100k",
      a2_2: "Claude-2-100k",
      capybara: "Assistant",
      chinchilla: "ChatGPT",
      beaver: "GPT-4",
      vizcacha: "GPT-4-32k",
      code_llama_34b_instruct: "Code-Llama-34b",
      acouchy: "Google-PaLM-2",
      llama_2_70b_chat: "Llama-2-70b",
    };
    const url =
      this.constructor._loginUrl + modelHandles[this.constructor._model];

    try {
      const response = await axios.get(url);

      // Parse buildId
      const buildId = response.data.match(/"buildId":"(.*?)",/);
      this.context.buildId = buildId[1];

      // Parse chatId
      const chatId = response.data.match(/"chatId":(\d+),/);
      this.context.chatId = chatId[1];

      available = true;
    } catch (error) {
      console.error("Error checking Poe login status:", error);
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
    const ctx = this.context;

    // Get settings
    if (!ctx.settings) {
      await axios.get("https://poe.com/api/settings").then((response) => {
        ctx.settings = response.data;
      });
    }

    return new Promise((resolve, reject) => {
      try {
        const subDomain = "tch" + Math.floor(Math.random() * 1000000);
        const tchannel = ctx.settings.tchannelData;
        const url = `wss://${subDomain}.tch.${tchannel.baseHost}/up/${tchannel.boxName}/updates?min_seq=${tchannel.minSeq}&channel=${tchannel.channel}&hash=${tchannel.channelHash}`;
        const wsp = new WebSocketAsPromised(url, {
          packMessage: (data) => {
            return JSON.stringify(data);
          },
          unpackMessage: (data) => {
            return JSON.parse(data);
          },
        });

        // Subscribe to messageAdded
        this.gqlPost("subscriptionsMutation", {
          subscriptions: [
            {
              subscriptionName: "messageAdded",
              query: null,
              queryHash:
                "b6ce35c2b568d42105983f4025b279fdbda53f842e1e13c6a9b69710272a0129",
            },
          ],
        });

        console.debug("context", ctx);

        wsp.onUnpackedMessage.addListener((message) => {
          if (message.error) {
            reject(new Error(message.error));
            return;
          }
          ctx.settings.tchannelData.minSeq = message.min_seq;
          const messages = message.messages.map((m) => JSON.parse(m));
          for (const m of messages) {
            if (m.message_type === "subscriptionUpdate") {
              const messageAdded = m.payload.data.messageAdded;
              if (!messageAdded) {
                console.debug(m);
                continue;
              }
              if (
                ctx.lastMessageId >= messageAdded.messageId ||
                messageAdded.author !== this.constructor._model
              ) {
                // Skip old messages and messages from other bots
                continue;
              }

              const done = messageAdded.state === "complete";
              onUpdateResponse(callbackParam, {
                content: messageAdded.text,
                done,
              });
              if (done) {
                ctx.lastMessageId = messageAdded.messageId;
                wsp.removeAllListeners();
                resolve();
              }
            } else {
              console.log("Unknown message type:", m.message_type, m);
            }
          }
        });

        wsp.onError.addListener((error) => {
          wsp.removeAllListeners();
          wsp.close();
          reject(error);
        });

        wsp.open();

        this.gqlPost("chatHelpers_sendMessageMutation_Mutation", {
          bot: this.constructor._model,
          chatId: ctx.chatId,
          query: prompt,
          source: null,
          withChatBreak: false,
        })
          .then((response) => {
            const status = response.data.messageEdgeCreate.status;
            if (response.errors) {
              let msg = "";
              for (const error of response.errors) {
                msg += error.message + "\n";
              }
              reject(new Error(msg));
            } else if (status !== "success") {
              reject(new Error(status));
            }
            console.debug("response", response);
          })
          .catch((error) => {
            this.constructor._isAvailable = false;
            if (error.code == 'ERR_BAD_REQUEST') {
              error.message += '. Your account may be banned';
            }
            reject(error);
          });
      } catch (error) {
        reject(error);
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
