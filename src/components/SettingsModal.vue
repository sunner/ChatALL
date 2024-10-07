<template>
  <v-dialog
    :model-value="props.open"
    fullscreen
    :scrim="false"
    transition="dialog-bottom-transition"
  >
    <v-card class="overflow-hidden">
      <div class="d-flex flex-column h-screen">
        <v-toolbar height="100px" dark color="primary">
          <v-toolbar-title>{{ $t("settings.title") }}</v-toolbar-title>
          <v-spacer></v-spacer>

          <v-btn icon dark @click="closeDialog">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-toolbar>
        <v-row style="height: calc(100% - 100px)">
          <v-col cols="2" class="h-100 overflow-auto pr-0">
            <v-tabs v-model="tab" direction="vertical" color="primary">
              <v-tab value="general">{{ $t("settings.general") }}</v-tab>
              <v-tab value="proxy">{{ $t("proxy.name") }}</v-tab>
              <v-tab value="chat">{{ $t("chat.name") }}</v-tab>
              <v-tab
                v-for="(setting, index) in botSettings"
                :key="index"
                :value="index"
              >
                {{ $t(`${setting.brand}.name`) }}
              </v-tab>
            </v-tabs>
          </v-col>
          <v-col class="h-100 overflow-auto">
            <v-list lines="two" subheader>
              <div v-if="tab == 'general'">
                <v-list-item>
                  <v-list-item-title>{{
                    $t("settings.language")
                  }}</v-list-item-title>
                  <v-select
                    :items="languages"
                    item-title="name"
                    item-value="code"
                    hide-details
                    :model-value="lang"
                    @update:model-value="setCurrentLanguage($event)"
                  ></v-select>
                </v-list-item>
                <v-list-item>
                  <v-list-item-title>{{
                    $t("settings.theme")
                  }}</v-list-item-title>
                  <v-select
                    :items="modes"
                    item-title="name"
                    item-value="code"
                    hide-details
                    :model-value="currentMode"
                    @update:model-value="setCurrentMode($event)"
                  ></v-select>
                </v-list-item>
                <CommonBotSettings
                  :settings="settings"
                  brand-id="general"
                  mutation-type="setGeneral"
                ></CommonBotSettings>
              </div>

              <div v-if="tab == 'proxy'">
                <component :is="proxy"></component>
              </div>

              <div v-if="tab == 'chat'">
                <component :is="chat" @close-dialog="closeDialog"></component>
              </div>

              <template v-for="(setting, index) in botSettings" :key="index">
                <component
                  v-if="tab == index"
                  :is="setting.component"
                ></component>
              </template>
            </v-list>
          </v-col>
        </v-row>
      </div>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { computed, ref, watch } from "vue";
import { useStore } from "vuex";
import { useI18n } from "vue-i18n";
import { useTheme } from "vuetify";
import { Type } from "@/components/BotSettings/settings.const";

import ProxySettings from "@/components/ProxySetting.vue";
import ChatSettings from "@/components/ChatSetting.vue";
import CommonBotSettings from "@/components/BotSettings/CommonBotSettings.vue";

import ChatGPTBotSettings from "@/components/BotSettings/ChatGPTBotSettings.vue";
import OpenAIAPIBotSettings from "@/components/BotSettings/OpenAIAPIBotSettings.vue";
import GeminiAPIBotSettings from "@/components/BotSettings/GeminiAPIBotSettings.vue";
import AzureOpenAIAPIBotSettings from "./BotSettings/AzureOpenAIAPIBotSettings.vue";
import BingChatBotSettings from "@/components/BotSettings/BingChatBotSettings.vue";
import SparkBotSettings from "./BotSettings/SparkBotSettings.vue";
import BardBotSettings from "@/components/BotSettings/BardBotSettings.vue";
import MistralBotSettings from "@/components/BotSettings/MistralBotSettings.vue";
import MOSSBotSettings from "@/components/BotSettings/MOSSBotSettings.vue";
import WenxinQianfanBotSettings from "@/components/BotSettings/WenxinQianfanBotSettings.vue";
import GradioAppBotSettings from "@/components/BotSettings/GradioAppBotSettings.vue";
import Falcon180bBotSettings from "@/components/BotSettings/Falcon180bBotSettings.vue";
import LMSYSBotSettings from "@/components/BotSettings/LMSYSBotSettings.vue";
import HuggingChatBotSettings from "@/components/BotSettings/HuggingChatBotSettings.vue";
import QianWenBotSettings from "@/components/BotSettings/QianWenBotSettings.vue";
import PoeBotSettings from "@/components/BotSettings/PoeBotSettings.vue";
import SkyWorkBotSettings from "@/components/BotSettings/SkyWorkBotSettings.vue";
import YouChatBotSettings from "@/components/BotSettings/YouChatBotSettings.vue";
import PerplexityBotSettings from "@/components/BotSettings/PerplexityBotSettings.vue";
import PhindBotSettings from "@/components/BotSettings/PhindBotSettings.vue";
import PiBotSettings from "@/components/BotSettings/PiBotSettings.vue";
import Qihoo360AIBrainBotSettings from "./BotSettings/Qihoo360AIBrainBotSettings.vue";
import CharacterAIBotSettings from "./BotSettings/CharacterAIBotSettings.vue";
import ClaudeAIBotSettings from "./BotSettings/ClaudeAIBotSettings.vue";
import ChatGLMBotSettings from "./BotSettings/ChatGLMBotSettings.vue";
import CohereAPIBotSettings from "./BotSettings/CohereAPIBotSettings.vue";
import KimiBotSettings from "./BotSettings/KimiBotSettings.vue";
import DeepSeekAPIBotSettings from "./BotSettings/DeepSeekAPIBotSettings.vue";

import { resolveTheme, applyTheme, Mode } from "../theme";
import ClaudeAPIBotSettings from "./BotSettings/ClaudeAPIBotSettings.vue";
import GroqAPIBotSettings from "./BotSettings/GroqAPIBotSettings.vue";

const { ipcRenderer } = window.require("electron");
const { t: $t, locale } = useI18n();
const store = useStore();
const vuetifyTheme = useTheme();

const props = defineProps(["open"]);
const emit = defineEmits(["update:open", "done"]);

const tab = ref(null);

const botSettings = [
  { brand: "360AiBrain", component: Qihoo360AIBrainBotSettings },
  { brand: "azureOpenaiApi", component: AzureOpenAIAPIBotSettings },
  { brand: "bard", component: BardBotSettings },
  { brand: "bingChat", component: BingChatBotSettings },
  { brand: "characterAI", component: CharacterAIBotSettings },
  { brand: "chatGlm", component: ChatGLMBotSettings },
  { brand: "chatGpt", component: ChatGPTBotSettings },
  { brand: "claudeAi", component: ClaudeAIBotSettings },
  { brand: "claudeApi", component: ClaudeAPIBotSettings },
  { brand: "cohereApi", component: CohereAPIBotSettings },
  { brand: "deepSeekApi", component: DeepSeekAPIBotSettings },
  { brand: "falcon", component: Falcon180bBotSettings },
  { brand: "geminiApi", component: GeminiAPIBotSettings },
  { brand: "gradio", component: GradioAppBotSettings },
  { brand: "groqApi", component: GroqAPIBotSettings },
  { brand: "huggingChat", component: HuggingChatBotSettings },
  { brand: "kimi", component: KimiBotSettings },
  { brand: "lmsys", component: LMSYSBotSettings },
  { brand: "mistral", component: MistralBotSettings },
  { brand: "moss", component: MOSSBotSettings },
  { brand: "openaiApi", component: OpenAIAPIBotSettings },
  { brand: "perplexity", component: PerplexityBotSettings },
  { brand: "phind", component: PhindBotSettings },
  { brand: "pi", component: PiBotSettings },
  { brand: "poe", component: PoeBotSettings },
  { brand: "qianWen", component: QianWenBotSettings },
  { brand: "skyWork", component: SkyWorkBotSettings },
  { brand: "spark", component: SparkBotSettings },
  { brand: "wenxinQianfan", component: WenxinQianfanBotSettings },
  { brand: "youChat", component: YouChatBotSettings },
];

const proxy = ProxySettings;
const chat = ChatSettings;
const languages = computed(() => [
  { name: $t("settings.system"), code: "auto" },
  { name: "Deutsch", code: "de" },
  { name: "English", code: "en" },
  { name: "Español", code: "es" },
  { name: "Français", code: "fr" },
  { name: "Italiano", code: "it" },
  { name: "日本語", code: "ja" },
  { name: "한국어", code: "ko" },
  { name: "Русский", code: "ru" },
  { name: "Tiếng Việt", code: "vi" },
  { name: "简体中文", code: "zh" },
  { name: "繁體中文", code: "zhtw" },
]);

const modes = computed(() => [
  { name: $t("settings.system"), code: Mode.SYSTEM },
  { name: $t("settings.light"), code: Mode.LIGHT },
  { name: $t("settings.dark"), code: Mode.DARK },
]);

const lang = computed(() => store.state.lang);
const currentMode = computed(() => store.state.mode);

const setCurrentLanguage = (lang) => {
  locale.value = lang;
  store.commit("setCurrentLanguage", lang);
};
const setCurrentMode = async (mode) => {
  const resolvedTheme = await resolveTheme(mode, ipcRenderer);
  store.commit("setMode", mode);
  store.commit("setTheme", resolvedTheme);
  applyTheme(resolvedTheme, vuetifyTheme);
};
const closeDialog = () => {
  emit("update:open", false);
  emit("done");
};

const settings = [
  {
    type: Type.Checkbox,
    name: "isShowMenuBar",
    label: $t("settings.showMenuBar"),
  },
];

watch(
  () => store.state.general.isShowMenuBar,
  () =>
    ipcRenderer.invoke(
      "set-is-show-menu-bar",
      store.state.general.isShowMenuBar,
    ),
);
</script>

<style scoped>
:deep() .v-slider-thumb__label {
  color: rgb(var(--v-theme-font));
}

/* Keep the orignal case of tab names */
.v-btn {
  text-transform: none !important;
}
</style>
