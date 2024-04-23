<template>
  <login-setting :bot="bot"></login-setting>
</template>

<script>
import Bot from "@/bots/PhindBot";
import LoginSetting from "@/components/BotSettings/LoginSetting.vue";

export default {
  components: {
    LoginSetting,
  },
  data() {
    return {
      bot: Bot.getInstance(),
    };
  },
};
</script>
