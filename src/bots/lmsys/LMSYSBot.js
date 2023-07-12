import AsyncLock from "async-lock";
import GradioBot from "@/bots/huggingface/GradioBot";

export default class LMSYSBot extends GradioBot {
  static _brandId = "lmsys"; // Brand id of the bot, should be unique. Used in i18n.
  static _className = "LMSYSBot"; // Class name of the bot
  static _logoFilename = "lmsys-logo.png"; // Place it in public/bots/
  static _loginUrl = "https://chat.lmsys.org/"; // Any Gradio URL
  static _settingsComponent = "LMSYSBotSettings"; // Vue component filename for settings
  static _model = "";
  static _outputFormat = "html"; // "markdown" or "html"
  static _lock = new AsyncLock(); // Send requests in queue to save LMSYS

  static _fnIndexes = [9, 10]; // Indexes of the APIs to call in order. Sniffer it by devtools.

  constructor() {
    super();
  }

  makeData(fn_index, prompt) {
    let r = null;
    if (fn_index === this.constructor._fnIndexes[0]) {
      r = [null, this.constructor._model, prompt];
    } else if (fn_index === this.constructor._fnIndexes[1]) {
      r = [null, 0.7, 1, 512];
    }
    return r;
  }

  parseData(fn_index, data) {
    let r = undefined;
    if (fn_index === this.constructor._fnIndexes[1]) {
      r = data[1][data[1].length - 1][1];
    }
    if (!r) r = ""; // Sometimes the result from data[] is null
    return r;
  }

  parseError(errorMsg) {
    if (errorMsg.includes("REFRESH THIS PAGE")) {
      errorMsg = errorMsg.replace(
        "REFRESH THIS PAGE",
        `\n<a href="${this.constructor._loginUrl}" target="innerWindow">REFRESH THIS PAGE</a>`,
      );
    }
    return errorMsg;
  }
}
