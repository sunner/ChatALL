import en from "./prompts-en.json";
import zh from "./prompts-zh.json";
import zhtw from "./prompts-zhtw.json";
import es from "./prompts-es.json";

const prompts = {
  en,
  zh,
  zhtw,
  es,
  languages: [
    { name: "English", code: "en" },
    { name: "简体中文", code: "zh" },
    { name: "繁體中文", code: "zhtw" },
    { name: "Español", code: "es" },
  ],
};

export default prompts;
