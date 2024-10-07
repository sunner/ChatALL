<template>
  <CommonBotSettings
    :settings="settings"
    :brand-id="brandId"
    mutation-type="setDeepSeekApi"
    :watcher="watcher"
  ></CommonBotSettings>
</template>

<script>
import Bot from "@/bots/deepseek/DeepSeekAPIBot";
import CommonBotSettings from "@/components/BotSettings/CommonBotSettings.vue";
import { Type } from "./settings.const";

const settings = [
  {
    type: Type.Text,
    name: "apiKey",
    title: "common.apiKey",
    description: "settings.secretPrompt",
    placeholder: "sk-...",
  },
  {
    type: Type.Slider,
    name: "temperature",
    title: "openaiApi.temperature",
    description: "openaiApi.temperaturePrompt",
    default: 1.0,
    min: 0,
    max: 2,
    step: 0.05,
    ticks: {
      0: "openaiApi.temperature0",
      2: "openaiApi.temperature2",
    },
  },
  {
    type: Type.Slider,
    name: "pastRounds",
    title: "bot.pastRounds",
    description: "bot.pastRoundsPrompt",
    min: 0,
    max: 10,
    step: 1,
  },
];
export default {
  components: {
    CommonBotSettings,
  },
  data() {
    return {
      settings: settings,
      brandId: Bot._brandId,
    };
  },
  methods: {
    watcher() {
      Bot.getInstance().setupModel();
    },
  },
};
</script>
