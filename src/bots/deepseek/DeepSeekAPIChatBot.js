import DeepSeekAPIBot from "./DeepSeekAPIBot";

export default class DeepSeekAPIChatBot extends DeepSeekAPIBot {
  static _className = "DeepSeekAPIChatBot";
  static _model = "deepseek-chat";

  constructor() {
    super();
  }
}
