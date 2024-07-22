import DeepSeekAPIBot from "./DeepSeekAPIBot";

export default class DeepSeekAPICoderBot extends DeepSeekAPIBot {
  static _className = "DeepSeekAPICoderBot";
  static _model = "deepseek-coder";

  constructor() {
    super();
  }
}
