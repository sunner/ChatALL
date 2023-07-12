// Bots
import ChatGPT35Bot from "@/bots/openai/ChatGPT35Bot";
import ChatGPT4Bot from "@/bots/openai/ChatGPT4Bot";
import ChatGPTBrowsingBot from "@/bots/openai/ChatGPTBrowsingBot";
import BingChatPreciseBot from "@/bots/microsoft/BingChatPreciseBot";
import BingChatBalancedBot from "@/bots/microsoft/BingChatBalancedBot";
import BingChatCreativeBot from "@/bots/microsoft/BingChatCreativeBot";
import SageBot from "@/bots/poe/SageBot";
import SparkBot from "@/bots/SparkBot";
import BardBot from "@/bots/BardBot";
import OpenAIAPI35Bot from "@/bots/openai/OpenAIAPI35Bot";
import OpenAIAPI4Bot from "@/bots/openai/OpenAIAPI4Bot";
import MOSSBot from "@/bots/MOSSBot";
import WenxinQianfanBot from "@/bots/baidu/WenxinQianfanBot";
import VicunaBot from "@/bots/lmsys/VicunaBot";
import ChatGLMBot from "@/bots/lmsys/ChatGLMBot";
import AlpacaBot from "@/bots/lmsys/AlpacaBot";
import ClaudeBot from "@/bots/lmsys/ClaudeBot";
import DevBot from "@/bots/DevBot";
import GradioAppBot from "@/bots/huggingface/GradioAppBot";
import HuggingChatBot from "@/bots/huggingface/HuggingChatBot";
import QianWenBot from "./QianWenBot";
import ChatGPT35PoeBot from "./poe/ChatGPT35PoeBot";
import ChatGPT4PoeBot from "./poe/ChatGPT4PoeBot";
import ClaudeInstantPoeBot from "./poe/ClaudeInstantPoeBot";
import ClaudeInstant100kPoeBot from "./poe/ClaudeInstant100kPoeBot";
import ClaudePlusPoeBot from "./poe/ClaudePlusPoeBot";
import SkyWorkBot from "./SkyWorkBot";
import ChatGPT4MobileBot from "./openai/ChatGPT4MobileBot";
import OpenAIAPI3516KBot from "./openai/OpenAIAPI3516KBot";
import AzureOpenAIAPIBot from "./microsoft/AzureOpenAIAPIBot";
import WinxinQianfanTurboBot from "./baidu/WenxinQianfanTurboBot";
import YouChatBot from "./YouChatBot";
import PiBot from "./PiBot";
import Qihoo360BrianBot from "./Qihoo360BrianBot";

const all = [
  AlpacaBot.getInstance(),
  BardBot.getInstance(),
  BingChatCreativeBot.getInstance(),
  BingChatBalancedBot.getInstance(),
  BingChatPreciseBot.getInstance(),
  ChatGLMBot.getInstance(),
  ChatGPT35Bot.getInstance(),
  ChatGPT35PoeBot.getInstance(),
  ChatGPT4Bot.getInstance(),
  ChatGPT4MobileBot.getInstance(),
  ChatGPT4PoeBot.getInstance(),
  ChatGPTBrowsingBot.getInstance(),
  ClaudeInstantPoeBot.getInstance(),
  ClaudeInstant100kPoeBot.getInstance(),
  ClaudeBot.getInstance(),
  ClaudePlusPoeBot.getInstance(),
  GradioAppBot.getInstance(),
  HuggingChatBot.getInstance(),
  MOSSBot.getInstance(),
  OpenAIAPI35Bot.getInstance(),
  OpenAIAPI3516KBot.getInstance(),
  OpenAIAPI4Bot.getInstance(),
  AzureOpenAIAPIBot.getInstance(),
  QianWenBot.getInstance(),
  Qihoo360BrianBot.getInstance(),
  SageBot.getInstance(),
  SkyWorkBot.getInstance(),
  SparkBot.getInstance(),
  VicunaBot.getInstance(),
  WenxinQianfanBot.getInstance(),
  WinxinQianfanTurboBot.getInstance(),
  YouChatBot.getInstance(),
  PiBot.getInstance(),
];

const disabled = [];

if (process.env.NODE_ENV !== "production") {
  all.push(DevBot.getInstance());
}

const bots = {
  all,
  getBotByClassName(className) {
    const bot = disabled.find((bot) => bot.getClassname() === className);
    if (bot) {
      return bot;
    } else {
      return all.find((bot) => bot.getClassname() === className);
    }
  },
  isBotDisabled(className) {
    return disabled.some((bot) => bot.getClassname() === className);
  },
};

export default bots;
