import i18n from "@/i18n";
import store from "@/store";

export default class Bot {
  static _logoPackedPaths = null;
  static _isAvailable = false;

  static _brandId = "bot"; // Brand id of the bot, should be unique. Used in i18n.
  static _className = "Bot"; // Class name of the bot
  static _model = ""; // Model of the bot (eg. "text-davinci-002-render-sha")
  static _logoFilename = "default-logo.svg"; // Place it in public/bots/
  static _loginUrl = "undefined";
  static _userAgent = ""; // Empty string means using the default user agent
  static _lock = null; // AsyncLock for prompt requests. `new AsyncLock()` in the subclass as needed.
  static _settingsComponent = ""; // Vue component filename for settings
  static _outputFormat = "markdown"; // "markdown" or "html"

  constructor() {}

  static getInstance() {
    return new this();
  }

  getLogo() {
    return `bots/${this.constructor._logoFilename}`;
  }

  getBrandName() {
    const c = this.constructor;
    return i18n.global.t(`${c._brandId}.name`);
  }

  getModelName() {
    const c = this.constructor;
    const model = c._model.replace(/[^a-zA-Z0-9-_]/g, "");
    return model ? i18n.global.t(`${c._brandId}.${model}`) : "";
  }

  getFullname() {
    if (this.getModelName())
      return `${this.getBrandName()} (${this.getModelName()})`;
    else return this.getBrandName();
  }

  getLoginUrl() {
    return this.constructor._loginUrl;
  }

  getUserAgent() {
    return this.constructor._userAgent;
  }

  getOutputFormat() {
    return this.constructor._outputFormat;
  }

  getClassname() {
    return this.constructor._className;
  }

  async getSettingsComponent() {
    let component;

    if (this.constructor._settingsComponent) {
      component = await import(
        `@/components/BotSettings/${this.constructor._settingsComponent}`
      );
    } else {
      let currentClass = this.constructor;
      let parentClass = Object.getPrototypeOf(currentClass);
      while (parentClass && parentClass._className !== "Bot") {
        currentClass = parentClass;
        parentClass = Object.getPrototypeOf(currentClass);
      }
      const componentName = currentClass._className + "Settings";
      component = await import(`@/components/BotSettings/${componentName}.vue`);
    }

    return component.default;
  }

  isAvailable() {
    return this.constructor._isAvailable;
  }

  /**
   * Subclass should implement this method if it needs to notice the user
   * before using the bot.
   * @param {object} confirmModal - ConfirmModal component
   * @returns {boolean} true if user has confirmed to use the bot
   */
  // eslint-disable-next-line
  async confirmBeforeUsing(confirmModal) {
    return true;
  }

  /**
   * Acquire a lock for the given key and call lockedFn() when the lock is acquired.
   * If the lock is not available, call onLockUnavailable() and then try to acquire
   * the lock again.
   * @param {string} key
   * @param {function} lockedFn
   * @param {function} onLockUnavailable
   */
  async acquireLock(key, lockedFn, onLockUnavailable) {
    const self = this;
    return new Promise((resolve, reject) => {
      (async () => {
        await this.constructor._lock.acquire(
          key,
          async () => {
            try {
              const ret = await lockedFn();
              resolve(ret);
            } catch (err) {
              reject(err);
            }
          },
          async function (err, ret) {
            if (err) {
              // The lock is not available
              onLockUnavailable();
              try {
                const ret = await self.constructor._lock.acquire(key, lockedFn); // Wait forever
                resolve(ret);
              } catch (err) {
                reject(err);
              }
            } else {
              resolve(ret);
            }
          },
          { timeout: 1 }, // Wait for only 1ms. Don't use 0 here.
        );
      })();
    });
  }

  /* eslint-disable no-unused-vars */
  /**
   * Subclass should implement this method, not sendPrompt().
   * Send a prompt to the bot and call onResponse(response, callbackParam)
   * when the response is ready.
   * @param {string} prompt
   * @param {function} onUpdateResponse params: callbackParam, Object {content, done}
   * @param {object} callbackParam - Just pass it to onUpdateResponse() as is
   */
  async _sendPrompt(prompt, onUpdateResponse, callbackParam) {
    throw new Error(i18n.global.t("bot.notImplemented"));
  }
  /* eslint-enable no-unused-vars */

  async sendPrompt(prompt, onUpdateResponse, callbackParam) {
    // If not logged in, handle the error
    if (!this.isAvailable()) {
      onUpdateResponse(callbackParam, {
        content: i18n.global.t("bot.notAvailable", {
          botName: this.getFullname(),
        }),
        done: true,
      });
      return;
    }

    const executeSendPrompt = async () => {
      // Begin thinking...
      onUpdateResponse(callbackParam, { content: "...", done: false });
      await this._sendPrompt(prompt, onUpdateResponse, callbackParam);
    };

    try {
      if (!this.constructor._lock) {
        await executeSendPrompt();
      } else {
        await this.acquireLock("sendPrompt", executeSendPrompt, () => {
          onUpdateResponse(callbackParam, {
            content: i18n.global.t("bot.waiting", {
              botName: this.getBrandName(),
            }),
            done: false,
          });
        });
      }
    } catch (err) {
      console.error(`Error send prompt to ${this.getFullname()}:`, err);
      onUpdateResponse(callbackParam, {
        content: this.wrapCollapsedSection(err),
        done: true,
      }); // Make sure stop loading
    }
  }

  /**
   * Subclass must implement this method.
   * Check if the bot is logged in, settings are correct, etc.
   * @returns {boolean} - true if the bot is available, false otherwise.
   * @sideeffect - Set this.constructor._isAvailable
   */
  async checkAvailability() {
    return false;
  }

  /**
   * Subclass should implement this method if the bot supports multi-chats.
   * The conversation structure is defined by the subclass.
   * @param null
   * @returns {any} - Conversation structure. null if not supported.
   */
  async createChatContext() {
    return null;
  }

  /**
   * Get the context from the store. If not available, create a new one.
   * @param {boolean} createIfNotExists - Create a new context if not exists
   * @returns {object} - Chat context defined by the bot
   */
  async getChatContext(createIfNotExists = true) {
    let context = store.getters.currentChat?.contexts?.[this.getClassname()];
    if (!context && createIfNotExists) {
      context = await this.createChatContext();
      this.setChatContext(context);
    }
    return context;
  }

  /**
   * @param {*} context
   * @returns Nothing
   */
  setChatContext(context) {
    store.commit("setChatContext", {
      botClassname: this.getClassname(),
      context,
    });
  }

  wrapCollapsedSection(text) {
    // replace line break with <br/>
    text = text?.toString()?.replace(/[\r\n]+/g, "<br/>");
    return `<details open>
              <summary>Error</summary>
              <pre class="error">${text}</pre>
            </details>`;
  }

  getSSEDisplayError(event) {
    return `${event?.source?.xhr?.status}\n${event?.source?.xhr?.response}`;
  }
}
