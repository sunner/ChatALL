import LangChainBot from "../LangChainBot";
import { ChatOpenAI } from "@langchain/openai";
import store from "@/store";

export default class DeepSeekAPIBot extends LangChainBot {
  static _brandId = "deepSeekApi"; // Brand id of the bot, should be unique. Used in i18n.
  static _className = "DeepSeekAPIBot";
  static _logoFilename = "deepseek.svg";

  constructor() {
    super();
  }

  async _checkAvailability() {
    let available = false;

    if (store.state.deepSeekApi.apiKey) {
      this.setupModel();
      available = true;
    }
    return available;
  }

  _setupModel() {
    const chatModel = new ChatOpenAI({
      configuration: {
        basePath: "https://api.deepseek.com/v1",
      },
      openAIApiKey: store.state.deepSeekApi.apiKey,
      modelName: this.constructor._model ? this.constructor._model : "",
      temperature: store.state.deepSeekApi.temperature,
      streaming: true,
    });
    return chatModel;
  }

  getPastRounds() {
    return store.state.deepSeekApi.pastRounds;
  }
}
