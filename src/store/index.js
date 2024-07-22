import { getMatomo } from "@/composables/matomo";
import i18n from "@/i18n";
import localForage from "localforage";
import { isProxy, isReactive, isRef, toRaw } from "vue";
import { createStore } from "vuex";
import VuexPersistence from "vuex-persist";
import Chats from "@/store/chats";
import Messages from "@/store/messages";
import { v4 as uuidv4 } from "uuid";
import Threads from "./threads";
import { messageQueue, threadMessageQueue } from "./queue";

const vuexPersist = new VuexPersistence({
  key: "chatall-app",
  storage: localForage,
  asyncStorage: true,
  reducer: (state) => {
    /* eslint-disable no-unused-vars */
    const { updateCounter, selectedResponses, ...persistedState } = state;
    /* eslint-enable no-unused-vars */
    return deepToRaw(persistedState);
  },
});

export default createStore({
  state: {
    uuid: "",
    lang: "auto",
    columns: 2,
    geminiApi: {
      apiKey: "",
      temperature: 0.7,
      pastRounds: 5,
      topK: 16,
      topP: 0.95,
    },
    claudeApi: {
      apiKey: "",
      temperature: 0,
      alterUrl: "",
      maxTokens: 1000,
    },
    cohereApi: {
      apiKey: "",
      temperature: 0.8,
      pastRounds: 5,
    },
    deepSeekApi: {
      apiKey: "",
      temperature: 1.0,
      pastRounds: 10,
    },
    openaiApi: {
      apiKey: "",
      temperature: 1,
      pastRounds: 5,
      alterUrl: "",
    },
    azureOpenaiApi: {
      azureApiKey: "",
      temperature: 1,
      pastRounds: 5,
      azureApiInstanceName: "",
      azureOpenAIApiDeploymentName: "",
      azureOpenAIApiVersion: "",
    },
    chatgpt: {
      refreshCycle: 0,
      riskConfirmed: false,
    },
    gradio: {
      url: "",
      fnIndex: 0,
    },
    mistral: {
      model: "mistral-large",
    },
    groqApi: {
      apiKey: "",
      temperature: 0,
      maxTokens: 1000,
      pastRounds: 1,
    },
    moss: {
      token: "",
    },
    chatGlm: {
      token: "",
    },
    kimi: {
      access_token: "",
      refresh_token: "",
    },
    qianWen: {
      xsrfToken: "",
    },
    skyWork: {
      inviteToken: "",
      token: "",
    },
    wenxinQianfan: {
      apiKey: "",
      secretKey: "",
      pastRounds: 5,
    },
    characterAI: {
      characterId: "YntB_ZeqRq2l_aVf2gWDCZl4oBttQzDvhj9cXafWcF8",
      version: "",
      username: "",
      id: "",
    },
    claudeAi: {
      org: "",
    },
    perplexity: {
      version: "2.5",
    },
    poe: {
      formkey: "",
    },
    falcon: {
      temperature: 0.9,
      maxNewTokens: 256,
      topP: 0.9,
      repetitionPenalty: 1.2,
    },
    phind: {
      model: "Phind Model",
    },
    currentChatIndex: 0,
    updateCounter: 0,
    theme: undefined,
    mode: "system",
    isChatDrawerOpen: true,
    prompts: [],
    actions: [
      {
        name: "Summarize 1",
        prefix:
          "Summarize the data below in a markdown table with the bot name, difference, and response rating (1-5) columns.\nDo not include the response' value column in your table.\nSimplify the data and identify the differences.\nEach response is delimited by the `resp` tag.\nInside every response, the bot's name is delimited by the `name` tag, and the bot's response is delimited by the `value` tag.",
        template:
          "<resp>\n  <name>{botName}</name>\n  <value>{botResponse}</value>\n</resp>",
        suffix: "Give me the best response.",
        index: 0,
      },
    ],
    selectedResponses: [],
    chat: {
      updateDebounceInterval: 100,
    },
    general: {
      isShowMenuBar: true,
      isShowAppBar: true,
    },
  },
  mutations: {
    changeColumns(state, n) {
      state.columns = n;
    },
    setUuid(state, uuid) {
      state.uuid = uuid;
    },
    async setBotSelected(state, { botClassname, selected }) {
      const currentChat = await Chats.getCurrentChat();
      for (let i = 0; i < currentChat.favBots.length; i++) {
        const bot = currentChat.favBots[i];
        if (bot.classname === botClassname) {
          bot.selected = selected;
          await Chats.table.update(currentChat.index, {
            favBots: currentChat.favBots,
          });
          return;
        }
      }
    },
    async setFavBotOrder(state, newOrder) {
      const currentChat = await Chats.getCurrentChat();
      newOrder.forEach((botClassname, order) => {
        const bot = currentChat.favBots.find(
          (bot) => bot.classname === botClassname,
        );
        if (bot) bot.order = order;
      });
      Chats.table.update(currentChat.index, { favBots: currentChat.favBots });
    },
    async addFavoriteBot(state, botClassname) {
      const currentChat = await Chats.getCurrentChat();
      const favBots = currentChat.favBots;
      currentChat.favBots.push({ classname: botClassname, selected: true });
      Chats.table.update(currentChat.index, {
        favBots,
      });
    },
    async setFavoriteBot(state, favBots) {
      const currentChat = await Chats.getCurrentChat();
      Chats.table.update(currentChat.index, {
        favBots,
      });
    },
    async removeFavoriteBot(state, botClassname) {
      const currentChat = await Chats.getCurrentChat();
      for (let i = 0; i < currentChat.favBots.length; i++) {
        const bot = currentChat.favBots[i];
        if (bot.classname === botClassname) {
          currentChat.favBots.splice(i, 1);

          await Chats.table.update(currentChat.index, {
            favBots: currentChat.favBots,
          });
          return;
        }
      }
    },
    setCurrentLanguage(state, language) {
      state.lang = language;
      i18n.global.locale = language;
    },
    setChatgpt(state, refreshCycle) {
      state.chatgpt.refreshCycle = refreshCycle;
    },
    setDeepSeekApi(state, values) {
      state.deepSeekApi = { ...state.deepSeekApi, ...values };
    },
    setGeminiApi(state, values) {
      state.geminiApi = { ...state.geminiApi, ...values };
    },
    setOpenaiApi(state, values) {
      state.openaiApi = { ...state.openaiApi, ...values };
    },
    setAzureOpenaiApi(state, values) {
      state.azureOpenaiApi = { ...state.azureOpenaiApi, ...values };
    },
    setMoss(state, token) {
      state.moss.token = token;
    },
    setChatGLM(state, token) {
      state.chatGlm = { ...state.chatGlm, ...token };
    },
    setQianWenToken(state, token) {
      state.qianWen.xsrfToken = token;
    },
    setSkyWork(state, tokens) {
      state.skyWork = { ...state.skyWork, ...tokens };
    },
    setKimi(state, tokens) {
      state.kimi = { ...state.kimi, ...tokens };
    },
    setWenxinQianfan(state, values) {
      state.wenxinQianfan = { ...state.wenxinQianfan, ...values };
    },
    setGradio(state, values) {
      state.gradio = { ...state.gradio, ...values };
    },
    setGroq(state, values) {
      state.groq = { ...state.groq, ...values };
    },
    setCharacterAI(state, values) {
      state.characterAI = { ...state.characterAI, ...values };
    },
    setClaudeAi(state, values) {
      state.claudeAi = { ...state.claudeAi, ...values };
    },
    setClaudeApi(state, values) {
      state.claudeApi = { ...state.claudeApi, ...values };
    },
    setCohereApi(state, values) {
      state.cohereApi = { ...state.cohereApi, ...values };
    },
    setPerplexity(state, values) {
      state.perplexity = { ...state.perplexity, ...values };
    },
    setPoe(state, values) {
      state.poe = { ...state.poe, ...values };
    },
    setPhind(state, values) {
      state.phind = { ...state.phind, ...values };
    },
    setMistral(state, values) {
      state.mistral = { ...state.mistral, ...values };
    },
    setLatestPromptIndex(state, promptIndex) {
      Chats.table.update(state.currentChatIndex, {
        latestPromptIndex: promptIndex,
      });
    },
    setLatestThreadPromptIndex(state, { promptIndex, messageIndex }) {
      Chats.table.update(state.currentChatIndex, {
        latestThreadPromptIndex: promptIndex,
      });
      Messages.table.update(messageIndex, {
        hasThread: true,
      });
    },
    setResponseThreadIndex(state, { responseIndex, threadIndex }) {
      const currentChat = state.chats[state.currentChatIndex];
      currentChat.messages[responseIndex].threadIndex = threadIndex;
    },
    setMessages(state, messages) {
      const currentChat = state.chats[state.currentChatIndex];
      currentChat.messages = messages;
    },
    incrementUpdateCounter(state) {
      state.updateCounter += 1;
    },
    setChatContext(state, { botClassname, context }) {
      Chats.table.update(state.currentChatIndex, {
        [`contexts.${botClassname}`]: context,
      });
    },
    clearMessages(state) {
      Chats.table.where("index").equals(state.currentChatIndex).modify({
        contexts: {},
      });
      Messages.table.where("chatIndex").equals(state.currentChatIndex).delete();
    },
    setTheme(state, theme) {
      state.theme = theme;
    },
    setMode(state, mode) {
      state.mode = mode;
    },
    setGeneral(state, values) {
      state.general = { ...state.general, ...values };
    },
    createChat(state) {
      const { favBots } = state.chats[state.currentChatIndex];
      const chatIndex =
        state.chats.push({
          favBots,
          contexts: {},
          messages: [],
          threads: [],
          createdTime: new Date().getTime(),
        }) - 1;
      state.chats[chatIndex].index = chatIndex;
      state.chats[chatIndex].title = `${i18n.global.t("chat.newChat")} ${
        chatIndex + 1
      }`;
    },
    selectChat(state, index) {
      state.currentChatIndex = index;
      Chats.table.update(index, { selectedTime: new Date().getTime() });
    },
    hideChat(state) {
      state.chats[state.currentChatIndex].hide = true;
    },
    async editChatTitle(state, { index, payload }) {
      const currentChat = await Chats.table.get(index);
      if (currentChat) {
        if (
          payload.isEditedByUser ||
          (!currentChat.isTitleUserEdited && !payload.isEditedByUser)
        ) {
          Chats.update(index, {
            ...payload,
            isTitleUserEdited: payload.isEditedByUser
              ? true
              : currentChat.isTitleUserEdited,
          });
        }
      }
    },
    setIsChatDrawerOpen(state, isChatDrawerOpen) {
      state.isChatDrawerOpen = isChatDrawerOpen;
    },
    async deleteChats(state) {
      const currentChat = await Chats.getCurrentChat();
      await Chats.table.clear();
      await Messages.table.clear();
      await Threads.table.clear();
      state.currentChatIndex = await Chats.add({
        favBots: currentChat ? currentChat.favBots : [],
      });
      Chats.table.update(state.currentChatIndex, {
        selectedTime: new Date().getTime(),
      });
    },
    addPrompt(state, values) {
      state.prompts.push({ ...values, index: uuidv4() });
    },
    editPrompt(state, values) {
      const { index } = values;
      const prompt = state.prompts.find((item) => item.index === index);
      for (const key in values) {
        prompt[key] = values[key];
      }
    },
    deletePrompt(state, values) {
      const { index } = values;
      let prompt = state.prompts.find((item) => item.index === index);
      prompt.hide = true;
    },
    addAction(state, values) {
      state.actions.push({ ...values, index: uuidv4() });
    },
    editAction(state, values) {
      const { index } = values;
      const action = state.actions.find((item) => item.index === index);
      for (const key in values) {
        action[key] = values[key];
      }
    },
    deleteAction(state, values) {
      const { index } = values;
      let action = state.actions.find((item) => item.index === index);
      action.hide = true;
    },
    addSelectedResponses(state, value) {
      value.selectedIndex = state.selectedResponses.push(value) - 1;
    },
    deleteSelectedResponses(state, value) {
      const index = state.selectedResponses.findIndex(
        (r) => r.selectedIndex === value,
      );
      state.selectedResponses.splice(index, 1);
    },
    deleteAllSelectedResponses(state) {
      state.selectedResponses = [];
    },
    migrateSettingsPrompts(state) {
      if (localStorage.getItem("isMigratedSettingsPrompts") === "true") {
        return;
      }
      const app = JSON.parse(localStorage.getItem("chatall-app"));
      const promptsData = JSON.parse(localStorage.getItem("chatall-prompts"));
      for (const key in app) {
        state[key] = app[key];
      }
      state.prompts = promptsData ? promptsData.prompts : [];
      localStorage.setItem("isMigratedSettingsPrompts", true);
    },
    updateSetting(state, { key, value }) {
      state[key] = value;
    },
    updateSettingArray(state, { key, value, index }) {
      for (const prop in state[key][index]) {
        state[key][index][prop] = value[prop];
      }
    },
    pushSettingArray(state, { key, value }) {
      state[key].push(value);
    },
    migrateSettingArrayIndexUseUUID(state) {
      if (
        localStorage.getItem("isMigrateSettingArrayIndexUseUUID") === "true"
      ) {
        return;
      }
      const settings = toRaw(state);
      for (const key in settings) {
        if (Array.isArray(state[key])) {
          for (const item of state[key]) {
            if (typeof item.index === "number" || !item.index) {
              item.index = uuidv4();
            }
          }
        }
      }
      localStorage.setItem("isMigrateSettingArrayIndexUseUUID", true);
    },
    setChat(state, values) {
      values = {
        ...values,
        updateDebounceInterval: parseInt(values.updateDebounceInterval),
      };
      state.chat = { ...state.chat, ...values };
    },
  },
  actions: {
    async setBotSelected(_, { botClassname, selected }) {
      const currentChat = await Chats.getCurrentChat();
      for (let i = 0; i < currentChat.favBots.length; i++) {
        const bot = currentChat.favBots[i];
        if (bot.classname === botClassname) {
          bot.selected = selected;
          await Chats.table.update(currentChat.index, {
            favBots: currentChat.favBots,
          });
          return;
        }
      }
    },
    async sendPrompt({ commit, dispatch }, { prompt, bots, promptIndex }) {
      const currentChat = await Chats.getCurrentChat();
      if (promptIndex === undefined) {
        // if promptIndex not found, not resend, push to messages array
        const promptMessage = {
          type: "prompt",
          content: prompt,
          done: true,
        };
        // add message
        promptIndex = await Messages.add(currentChat.index, promptMessage);
      }
      commit("setLatestPromptIndex", promptIndex); // to keep track of the latest prompt index for hiding old prompt's resend button

      const msgs = [];
      for (const bot of bots) {
        const msg = {
          index: uuidv4(),
          promptIndex: promptIndex,
          chatIndex: currentChat.index,
          type: "response",
          content: "",
          format: bot.getOutputFormat(),
          model: bot.constructor._model,
          className: bot.getClassname(),
          createdTime: new Date().getTime(),
        };
        await Messages.table.add(msg);
        msgs.push(msg);
      }
      for (let i = 0; i < bots.length; i++) {
        const bot = bots[i];
        const message = msgs[i];
        bot.sendPrompt(
          prompt,
          (index, values) =>
            dispatch("updateMessage", { index, message: values }),
          message.index,
        );

        getMatomo()?.trackEvent(
          "prompt",
          "sendTo",
          message.className,
          prompt.length,
        );
      }
    },
    async sendPromptInThread(
      { commit, state, dispatch },
      { prompt, bot, messageIndex, promptIndex },
    ) {
      if (!promptIndex) {
        // not resend
        const threadPromptMessage = {
          type: "prompt",
          content: prompt,
        };
        promptIndex = await Threads.add(
          state.currentChatIndex,
          messageIndex,
          threadPromptMessage,
        );
      }
      commit("setLatestThreadPromptIndex", { promptIndex, messageIndex }); // to keep track of the latest prompt index for hiding old prompt's resend button

      const threadResponseMessage = {
        type: "response",
        content: "",
        format: bot.getOutputFormat(),
        model: bot.constructor._model,
        className: bot.getClassname(),
        promptIndex: promptIndex,
      };
      threadResponseMessage.index = await Threads.add(
        state.currentChatIndex,
        messageIndex,
        threadResponseMessage,
      );

      bot.sendPrompt(
        prompt,
        (index, values) =>
          dispatch("updateThreadMessage", { index, message: values }),
        threadResponseMessage.index,
      );

      getMatomo()?.trackEvent(
        "prompt",
        "replyTo",
        bot.getClassname(),
        prompt.length,
      );
    },
    async updateMessage(_, { index, message: values }) {
      messageQueue.queue.push({ index, message: values });
      if (values.done) {
        const chat = await Messages.table.get(index);
        const message = { ...chat, ...values };
        getMatomo()?.trackEvent(
          "prompt",
          "received",
          message.className,
          message.content.length,
        );
      }
    },
    async updateThreadMessage(_, { index, message: values }) {
      threadMessageQueue.queue.push({ index, message: values });
      if (values.done) {
        const thread = await Threads.table.get(index);
        let message = { ...thread, ...values };
        getMatomo()?.trackEvent(
          "prompt",
          "received",
          message.className,
          message.content.length,
        );
      }
    },
    addSelectedResponses({ commit, state }, value) {
      commit("addSelectedResponses", value);
      return state.selectedResponses.length - 1;
    },
  },
  getters: {
    currentChat: async (state) => {
      const currentChat = await Chats.table.get(state.currentChatIndex);
      return currentChat;
    },
    // get current chat prompt
    getCurrentChatPrompt: (state, getters) => {
      const messages = getters.currentChat.messages;
      return messages.filter((message) => message?.type === "prompt");
    },
  },
  modules: {},
  plugins: [vuexPersist.plugin],
});

// call toRaw to nested array before storing with localForage
function deepToRaw(sourceObj) {
  const objectIterator = (input) => {
    if (Array.isArray(input)) {
      const result = [];
      for (const item of input) {
        result.push(objectIterator(item));
      }
      return result;
    }
    if (isRef(input) || isReactive(input) || isProxy(input)) {
      return objectIterator(toRaw(input));
    }
    if (input && typeof input === "object") {
      return Object.keys(input).reduce((acc, key) => {
        acc[key] = objectIterator(input[key]);
        return acc;
      }, {});
    }
    return input;
  };

  return objectIterator(sourceObj);
}
