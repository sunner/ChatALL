<template>
  <v-avatar
    rounded="rounded"
    :class="{ active: active, filter: enable_filter(bot) }"
    :image="bot.getLogo()"
    :alt="bot.getFullname()"
    :title="bot.getFullname()"
  ></v-avatar>
</template>

<script setup>
import { useStore } from "vuex";
import { Theme } from "@/theme";

const store = useStore();

defineProps(["bot", "active"]);

function enable_filter(bot) {
  const dark_icon_classname = [
    "OpenAIAPI35Bot",
    "OpenAIAPI3516KBot",
    "OpenAIAPI4Bot",
    "SkyWorkBot",
    "AzureOpenAIAPIBot",
    "DevBot",
  ];
  const is_dark = store.state.theme == Theme.DARK;
  const is_dark_bot = dark_icon_classname.includes(bot.getClassname());
  return is_dark && is_dark_bot;
}
</script>

<style>
.v-avatar {
  opacity: 0.5;
  filter: grayscale(100%);
  cursor: pointer;
}

.active {
  opacity: 1;
  filter: grayscale(0%);
}

.filter{
  filter: invert(100%);
}
</style>
