import Bot from "./Bot";
// import axios from "axios";
import { SSE } from "sse.js";
// import { v4 as uuidv4 } from "uuid";
import store from "@/store";
export default class OpenAIAPIBots extends Bot {
    static apiKey = "";
    static apiUrl = "https://api.openai.com/v1/engines/davinci/completions";
    static _id = "OpenAIAPIBots"; // ID of the bot, should be unique
    static _name = "openAIApiBot.name"; // String of the bot's name, should be unique
    static _logoFilename = "openai-logo.svg";
    static _loginUrl = "openai-logo.svg"; // URL for the login button on the bots page
    model = "davinci";
    constructor() {
        super();
        this.apiKey = store.state.apiKey;
    }

    conversationContext = {
        conversationId: "",
        parentMessageId: "",
      };

    setApiKey(key) {
        this.apiKey = key
    }

    getDisplayName() {
       return `${super.getDisplayName()} (默认版 (GPT-3.5))`;
    }

    setModel(m) {
        if (this.constructor.model.includes(m)) {
          this.model = m 
        } else {
          console.log('Invalid model!')
        }
    }

    setApiUrlPath(url){
        if(url){
            this.apiUrl = url
        }
    }

    async checkLoginStatus() {
        console.log("checkLoginStatus openai api")
        console.log("apiKey: " + this.apiKey)
        console.log("apiUrl: " + this.constructor.apiUrl)
        if(this.apiKey && this.constructor.apiUrl && this.model){
            console.log("checkLoginStatus openai api true")
            this.constructor._isLoggedIn = true;
        }else{
            console.log("checkLoginStatus openai api false")
            this.constructor._isLoggedIn = false;
        }
    }



    async sendPrompt(prompt, onUpdateResponse, callbackParam) {
        console.log("sendPrompt openai api",callbackParam)
        let res = ""
        // Send the prompt to the OpenAI API
        try {
          const headers = {
            "Content-Type": "application/json",
            Authorization: `Bearer ${this.apiKey}`,
          };
          
            let payload = JSON.stringify({
                model: "text-davinci-003",
                prompt: prompt,
                temperature: 0,
                max_tokens: 1000,
                top_p: 1,
                frequency_penalty: 1,
                presence_penalty: 1,
                stream: true
            });
    
          const source = new SSE(
           "https://api.openai.com/v1/completions",
            {headers, payload}
          );
          source.addEventListener("message", (event) => {
            const regex = /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}\.\d{6}$/;
            if (event.data === "[DONE]") {
              source.close();
            } else if (regex.test(event.data)) {
              // Ignore the timestamp
              return;
            } else
              try {
                const data = JSON.parse(event.data);
                const partialText = data.choices?.[0]?.text;
                res += partialText;
                console.log("data",res)
                onUpdateResponse(res, callbackParam);
              } catch (error) {
                console.error("Error parsing ChatGPT response:", error);
                console.error("ChatGPT response:", event);
                return;
              }
          });
          source.addEventListener("error", (error) => {
            console.error("Error handling real-time updates:", error);
            source.close();
          });
          source.addEventListener("done", (event) => {
            console.log("done", event);
            source.close();
          });
          source.stream();
        } catch (error) {
          console.error("Error sending prompt to OpenAIAPI:", error);
        }
    
      }
      


}