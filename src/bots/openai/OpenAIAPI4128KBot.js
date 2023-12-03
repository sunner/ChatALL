import OpenAIAPIBot from "./OpenAIAPIBot";

export default class OpenAIAPI4128KBot extends OpenAIAPIBot {
  static _className = "OpenAIAPI4128KBot"; // Class name of the bot
  static _logoFilename = "openai-4-128k-logo.png"; // Place it in public/bots/
  static _isDarkLogo = true; // The main color of logo is dark
  static _model = "gpt-4-1106-preview";

  constructor() {
    super();
  }
}
