// Bots
import GeminiAPIBot from "@/bots/google/GeminiAPIBot";
import Gemini15ProAPIBot from "@/bots/google/Gemini15ProAPIBot";
import Gemini15FlashAPIBot from "@/bots/google/Gemini15FlashAPIBot";
import ChatGPT35Bot from "@/bots/openai/ChatGPT35Bot";
import ChatGPT4Bot from "@/bots/openai/ChatGPT4Bot";
import CohereAPICommandBot from "@/bots/cohere/CohereAPICommandBot";
import CohereAPICommandLightBot from "@/bots/cohere/CohereAPICommandLightBot";
import CohereAPICommandRBot from "@/bots/cohere/CohereAPICommandRBot";
import CohereAPICommandRPlusBot from "@/bots/cohere/CohereAPICommandRPlusBot";
import CohereAPIAya23Bot from "@/bots/cohere/CohereAPIAya23Bot";
import BingChatPreciseBot from "@/bots/microsoft/BingChatPreciseBot";
import BingChatBalancedBot from "@/bots/microsoft/BingChatBalancedBot";
import BingChatCreativeBot from "@/bots/microsoft/BingChatCreativeBot";
import SageBot from "@/bots/poe/SageBot";
import SparkBot from "@/bots/SparkBot";
import BardBot from "@/bots/google/BardBot";
import OpenAIAPI35Bot from "@/bots/openai/OpenAIAPI35Bot";
import OpenAIAPI4Bot from "@/bots/openai/OpenAIAPI4Bot";
import OpenAIAPI4128KBot from "@/bots/openai/OpenAIAPI4128KBot";
import OpenAIAPI4oBot from "@/bots/openai/OpenAIAPI4oBot";
import OpenAIAPI4oMiniBot from "./openai/OpenAIAPI4oMiniBot";
import MistralBot from "./MistralBot";
import MOSSBot from "@/bots/MOSSBot";
import WenxinQianfanBot from "@/bots/baidu/WenxinQianfanBot";
import VicunaBot from "@/bots/lmsys/VicunaBot";
import ChatGLMBot from "@/bots/zhipu/ChatGLMBot";
import AlpacaBot from "@/bots/lmsys/AlpacaBot";
import ClaudeBot from "@/bots/lmsys/ClaudeBot";
import DevBot from "@/bots/DevBot";
import GradioAppBot from "@/bots/huggingface/GradioAppBot";
import Gemma7bGroqAPIBot from "@/bots/groq/Gemma7bGroqAPIBot";
import Gemma29bGroqAPIBot from "@/bots/groq/Gemma29bGroqAPIBot";
import Llama38bGroqAPIBot from "@/bots/groq/Llama38bGroqAPIBot";
import Llama370bGroqAPIBot from "@/bots/groq/Llama370bGroqAPIBot";
import Mixtral8x7bGroqAPIBot from "@/bots/groq/Mixtral8x7bGroqAPIBot";
import HuggingChatBot from "@/bots/huggingface/HuggingChatBot";
import QianWenBot from "./QianWenBot";
import ChatGPT35PoeBot from "./poe/ChatGPT35PoeBot";
import ChatGPT4PoeBot from "./poe/ChatGPT4PoeBot";
import ClaudeInstantPoeBot from "./poe/ClaudeInstantPoeBot";
import ClaudeInstant100kPoeBot from "./poe/ClaudeInstant100kPoeBot";
import ClaudePlusPoeBot from "./poe/ClaudePlusPoeBot";
import ChatGPT432kPoeBot from "./poe/ChatGPT432kPoeBot";
import Llama270bPoeBot from "./poe/Llama270bPoeBot";
import GooglePalm2PoeBot from "./poe/GooglePalm2PoeBot";
import CodeLlama34bPoeBot from "./poe/CodeLlama34bPoeBot";
import SkyWorkBot from "./SkyWorkBot";
import ChatGPT4MobileBot from "./openai/ChatGPT4MobileBot";
import AzureOpenAIAPIBot from "./microsoft/AzureOpenAIAPIBot";
import WenxinQianfanTurboBot from "./baidu/WenxinQianfanTurboBot";
import YouChatBot from "./YouChatBot";
import PerplexityBot from "./PerplexityBot";
import PhindBot from "./PhindBot";
import PiBot from "./PiBot";
import Qihoo360AIBrainBot from "./Qihoo360AIBrainBot";
import CharacterAIBot from "./CharacterAIBot";
import ClaudeAIBot from "./ClaudeAIBot";
import Llama2HC70bBot from "./huggingface/Llama2HC70bBot";
import Llama213bBot from "./lmsys/Llama213bBot";
import Llama27bBot from "./lmsys/Llama27bBot";
import Llama270bBot from "./lmsys/Llama270bBot";
import Falcon180bBot from "./huggingface/Falcon180bBot";
import ChatGLM6bBot from "./lmsys/ChatGLM6bBot";
import ChatGLM36bBot from "./lmsys/ChatGLM36bBot";
import CodeLlamaBot from "./lmsys/CodeLlamaBot";
import Vicuna7bBot from "./lmsys/Vicuna7bBot";
import Vicuna13bBot from "./lmsys/Vicuna13bBot";
import Wizardlm13bBot from "./lmsys/Wizardlm13bBot";
import Wizardlm70bBot from "./lmsys/Wizardlm70bBot";
import FalconHC180bBot from "./huggingface/FalconHC180bBot";
import CodeLlamaHCBot from "./huggingface/CodeLlamaHCBot";
import WenxinQianfan4Bot from "./baidu/WenxinQianfan4Bot";
import Zephyr7bBot from "./huggingface/Zephyr7bBot";
import GeminiAdvBot from "./google/GeminiAdvBot";
import Gemma7bItBot from "./lmsys/Gemma7bItBot";
import Gemma2bItBot from "./lmsys/Gemma2bItBot";
import Claude3SonnetBot from "./lmsys/Claude3SonnetBot";
import Claude3OpusBot from "./lmsys/Claude3OpusBot";
import ChatGLM4Bot from "./zhipu/ChatGLM4Bot";
import KimiBot from "./moonshot/KimiBot";
import ClaudeAPIOpusBot from "./anthropic/ClaudeAPIOpusBot";
import ClaudeAPI20Bot from "./anthropic/ClaudeAPI20Bot";
import ClaudeAPI21Bot from "./anthropic/ClaudeAPI21Bot";
import ClaudeAPISonnetBot from "./anthropic/ClaudeAPISonnetBot";
import ClaudeAPI35SonnetBot from "./anthropic/ClaudeAPI35SonnetBot";
import ClaudeAPIHaikuBot from "./anthropic/ClaudeAPIHaikuBot";
import ClaudeAPIInstant12Bot from "./anthropic/ClaudeAPIInstant12Bot";
import DeepSeekAPICoderBot from "./deepseek/DeepSeekAPICoderBot";
import DeepSeekAPIChatBot from "./deepseek/DeepSeekAPIChatBot";

const all = [
  Qihoo360AIBrainBot.getInstance(),
  AlpacaBot.getInstance(),
  SageBot.getInstance(), // Assistant@Poe
  BingChatCreativeBot.getInstance(),
  BingChatBalancedBot.getInstance(),
  BingChatPreciseBot.getInstance(),
  CharacterAIBot.getInstance(),
  ChatGLM6bBot.getInstance(),
  ChatGLM36bBot.getInstance(),
  ChatGLMBot.getInstance(),
  ChatGLM4Bot.getInstance(),
  ClaudeInstantPoeBot.getInstance(),
  ClaudeInstant100kPoeBot.getInstance(),
  ClaudeBot.getInstance(),
  ClaudeAIBot.getInstance(),
  ClaudePlusPoeBot.getInstance(),
  Claude3OpusBot.getInstance(),
  Claude3SonnetBot.getInstance(),
  ClaudeAPIOpusBot.getInstance(),
  ClaudeAPISonnetBot.getInstance(),
  ClaudeAPI35SonnetBot.getInstance(),
  ClaudeAPIHaikuBot.getInstance(),
  ClaudeAPI20Bot.getInstance(),
  ClaudeAPI21Bot.getInstance(),
  ClaudeAPIInstant12Bot.getInstance(),
  CodeLlama34bPoeBot.getInstance(),
  CodeLlamaHCBot.getInstance(),
  CodeLlamaBot.getInstance(),
  CohereAPICommandBot.getInstance(),
  CohereAPICommandLightBot.getInstance(),
  CohereAPICommandRBot.getInstance(),
  CohereAPICommandRPlusBot.getInstance(),
  CohereAPIAya23Bot.getInstance(),
  WenxinQianfanBot.getInstance(),
  WenxinQianfanTurboBot.getInstance(),
  WenxinQianfan4Bot.getInstance(),
  Falcon180bBot.getInstance(),
  FalconHC180bBot.getInstance(),
  BardBot.getInstance(),
  GeminiAdvBot.getInstance(),
  GeminiAPIBot.getInstance(),
  Gemini15ProAPIBot.getInstance(),
  Gemini15FlashAPIBot.getInstance(),
  Gemma2bItBot.getInstance(),
  Gemma7bItBot.getInstance(),
  AzureOpenAIAPIBot.getInstance(),
  ChatGPT35Bot.getInstance(),
  ChatGPT35PoeBot.getInstance(),
  OpenAIAPI35Bot.getInstance(),
  ChatGPT4Bot.getInstance(),
  ChatGPT4MobileBot.getInstance(),
  ChatGPT4PoeBot.getInstance(),
  OpenAIAPI4Bot.getInstance(),
  OpenAIAPI4128KBot.getInstance(),
  OpenAIAPI4oBot.getInstance(),
  OpenAIAPI4oMiniBot.getInstance(),
  ChatGPT432kPoeBot.getInstance(),
  GradioAppBot.getInstance(),
  Gemma7bGroqAPIBot.getInstance(),
  Gemma29bGroqAPIBot.getInstance(),
  Llama38bGroqAPIBot.getInstance(),
  Llama370bGroqAPIBot.getInstance(),
  Mixtral8x7bGroqAPIBot.getInstance(),
  KimiBot.getInstance(),
  Llama27bBot.getInstance(),
  Llama213bBot.getInstance(),
  Llama270bPoeBot.getInstance(),
  Llama270bBot.getInstance(),
  Llama2HC70bBot.getInstance(),
  MistralBot.getInstance(),
  MOSSBot.getInstance(),
  HuggingChatBot.getInstance(),
  GooglePalm2PoeBot.getInstance(),
  PerplexityBot.getInstance(),
  PhindBot.getInstance(),
  PiBot.getInstance(),
  QianWenBot.getInstance(),
  SkyWorkBot.getInstance(),
  SparkBot.getInstance(),
  Vicuna7bBot.getInstance(),
  Vicuna13bBot.getInstance(),
  VicunaBot.getInstance(),
  Wizardlm13bBot.getInstance(),
  Wizardlm70bBot.getInstance(),
  Zephyr7bBot.getInstance(),
  YouChatBot.getInstance(),
  DeepSeekAPICoderBot.getInstance(),
  DeepSeekAPIChatBot.getInstance(),
];

const disabled = [
  "ClaudeBot",
  "AlpacaBot",
  "HuggingChatBot",
  "Falcon180bBot",
  "ChatGLM6bBot",
  "ChatGLM36bBot",
  "CodeLlamaBot",
  "Vicuna7bBot",
  "Wizardlm13bBot",
];

if (process.env.NODE_ENV !== "production") {
  all.push(DevBot.getInstance());
}

const bots = {
  all,
  getBotByClassName(className) {
    return all.find((bot) => bot.getClassname() === className);
  },
};

disabled.forEach((className) => {
  const bot = bots.getBotByClassName(className);
  bot?.disable();
});

export const botTags = {
  free: [
    bots.getBotByClassName("BardBot"),
    bots.getBotByClassName("BingChatBalancedBot"),
    bots.getBotByClassName("BingChatCreativeBot"),
    bots.getBotByClassName("BingChatPreciseBot"),
    bots.getBotByClassName("ChatGLMBot"),
    bots.getBotByClassName("ChatGLM4Bot"),
    bots.getBotByClassName("ChatGLM6bBot"),
    bots.getBotByClassName("ChatGLM36bBot"),
    bots.getBotByClassName("ChatGPT35Bot"),
    bots.getBotByClassName("ChatGPT35PoeBot"),
    bots.getBotByClassName("ClaudeBot"),
    bots.getBotByClassName("ClaudeInstantPoeBot"),
    bots.getBotByClassName("GooglePalm2PoeBot"),
    bots.getBotByClassName("CodeLlama34bPoeBot"),
    bots.getBotByClassName("HuggingChatBot"),
    bots.getBotByClassName("Llama27bBot"),
    bots.getBotByClassName("Llama213bBot"),
    bots.getBotByClassName("Llama270bBot"),
    bots.getBotByClassName("Llama2HC70bBot"),
    bots.getBotByClassName("CodeLlamaBot"),
    bots.getBotByClassName("CodeLlamaHCBot"),
    bots.getBotByClassName("MistralBot"),
    bots.getBotByClassName("MOSSBot"),
    bots.getBotByClassName("Qihoo360AIBrainBot"),
    bots.getBotByClassName("QianWenBot"),
    bots.getBotByClassName("SkyWorkBot"),
    bots.getBotByClassName("SparkBot"),
    bots.getBotByClassName("YouChatBot"),
    bots.getBotByClassName("GradioAppBot"),
    bots.getBotByClassName("AlpacaBot"),
    bots.getBotByClassName("VicunaBot"),
    bots.getBotByClassName("Vicuna7bBot"),
    bots.getBotByClassName("Vicuna13bBot"),
    bots.getBotByClassName("CharacterAIBot"),
    bots.getBotByClassName("ClaudeAIBot"),
    bots.getBotByClassName("PerplexityBot"),
    bots.getBotByClassName("PhindBot"),
    bots.getBotByClassName("PiBot"),
    bots.getBotByClassName("SageBot"),
    bots.getBotByClassName("Falcon180bBot"),
    bots.getBotByClassName("Wizardlm13bBot"),
    bots.getBotByClassName("Wizardlm70bBot"),
    bots.getBotByClassName("FalconHC180bBot"),
    bots.getBotByClassName("Zephyr7bBot"),
    bots.getBotByClassName("Gemma2bItBot"),
    bots.getBotByClassName("Gemma7bItBot"),
    bots.getBotByClassName("Claude3SonnetBot"),
    bots.getBotByClassName("Claude3OpusBot"),
    bots.getBotByClassName("KimiBot"),
  ],
  paid: [
    bots.getBotByClassName("ChatGPT4Bot"),
    bots.getBotByClassName("ChatGPT4MobileBot"),
    bots.getBotByClassName("ChatGPT4PoeBot"),
    bots.getBotByClassName("ClaudeInstant100kPoeBot"),
    bots.getBotByClassName("ClaudePlusPoeBot"),
    bots.getBotByClassName("ChatGPT432kPoeBot"),
    bots.getBotByClassName("GeminiAdvBot"),
  ],
  openSource: [
    bots.getBotByClassName("AlpacaBot"),
    bots.getBotByClassName("HuggingChatBot"),
    bots.getBotByClassName("Llama27bBot"),
    bots.getBotByClassName("Llama213bBot"),
    bots.getBotByClassName("Llama270bBot"),
    bots.getBotByClassName("Llama270bPoeBot"),
    bots.getBotByClassName("Llama2HC70bBot"),
    bots.getBotByClassName("MOSSBot"),
    bots.getBotByClassName("VicunaBot"),
    bots.getBotByClassName("Vicuna7bBot"),
    bots.getBotByClassName("Vicuna13bBot"),
    bots.getBotByClassName("Falcon180bBot"),
    bots.getBotByClassName("ChatGLM6bBot"),
    bots.getBotByClassName("ChatGLM36bBot"),
    bots.getBotByClassName("CodeLlamaBot"),
    bots.getBotByClassName("CodeLlamaHCBot"),
    bots.getBotByClassName("CodeLlama34bPoeBot"),
    bots.getBotByClassName("Wizardlm13bBot"),
    bots.getBotByClassName("Wizardlm70bBot"),
    bots.getBotByClassName("FalconHC180bBot"),
    bots.getBotByClassName("Zephyr7bBot"),
    bots.getBotByClassName("Gemma2bItBot"),
    bots.getBotByClassName("Gemma7bItBot"),
    bots.getBotByClassName("Claude3SonnetBot"),
    bots.getBotByClassName("Claude3OpusBot"),
    bots.getBotByClassName("DeepSeekAPICoderBot"),
    bots.getBotByClassName("DeepSeekAPIChatBot"),
  ],
  api: [
    bots.getBotByClassName("GeminiAPIBot"),
    bots.getBotByClassName("Gemini15ProAPIBot"),
    bots.getBotByClassName("Gemini15FlashAPIBot"),
    bots.getBotByClassName("AzureOpenAIAPIBot"),
    bots.getBotByClassName("OpenAIAPI35Bot"),
    bots.getBotByClassName("OpenAIAPI4Bot"),
    bots.getBotByClassName("OpenAIAPI4128KBot"),
    bots.getBotByClassName("OpenAIAPI4oBot"),
    bots.getBotByClassName("OpenAIAPI4oMiniBot"),
    bots.getBotByClassName("WenxinQianfanBot"),
    bots.getBotByClassName("WenxinQianfanTurboBot"),
    bots.getBotByClassName("WenxinQianfan4Bot"),
    bots.getBotByClassName("ClaudeAPI20Bot"),
    bots.getBotByClassName("ClaudeAPI21Bot"),
    bots.getBotByClassName("ClaudeAPIHaikuBot"),
    bots.getBotByClassName("ClaudeAPIInstant12Bot"),
    bots.getBotByClassName("ClaudeAPIOpusBot"),
    bots.getBotByClassName("ClaudeAPISonnetBot"),
    bots.getBotByClassName("ClaudeAPI35SonnetBot"),
    bots.getBotByClassName("CohereAPICommandBot"),
    bots.getBotByClassName("CohereAPICommandLightBot"),
    bots.getBotByClassName("CohereAPICommandRBot"),
    bots.getBotByClassName("CohereAPICommandRPlusBot"),
    bots.getBotByClassName("CohereAPIAya23Bot"),
    bots.getBotByClassName("Gemma7bGroqAPIBot"),
    bots.getBotByClassName("Gemma29bGroqAPIBot"),
    bots.getBotByClassName("Llama38bGroqAPIBot"),
    bots.getBotByClassName("Llama370bGroqAPIBot"),
    bots.getBotByClassName("Mixtral8x7bGroqAPIBot"),
    bots.getBotByClassName("DeepSeekAPICoderBot"),
    bots.getBotByClassName("DeepSeekAPIChatBot"),
  ],
  madeInChina: [
    bots.getBotByClassName("Qihoo360AIBrainBot"),
    bots.getBotByClassName("QianWenBot"),
    bots.getBotByClassName("SkyWorkBot"),
    bots.getBotByClassName("SparkBot"),
    bots.getBotByClassName("WenxinQianfanBot"),
    bots.getBotByClassName("WenxinQianfanTurboBot"),
    bots.getBotByClassName("WenxinQianfan4Bot"),
    bots.getBotByClassName("MOSSBot"),
    bots.getBotByClassName("ChatGLMBot"),
    bots.getBotByClassName("ChatGLM4Bot"),
    bots.getBotByClassName("ChatGLM6bBot"),
    bots.getBotByClassName("ChatGLM36bBot"),
    bots.getBotByClassName("KimiBot"),
    bots.getBotByClassName("DeepSeekAPICoderBot"),
    bots.getBotByClassName("DeepSeekAPIChatBot"),
  ],
};
export default bots;
