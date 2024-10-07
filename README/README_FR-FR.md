<div align="center">
  <img src="../src/assets/logo-cover.png" width=256></img>
  <p><strong>Discutez avec tous les bots IA simultanément pour sélectionner la meilleure réponse</strong></p>

[Deutsch](README_DE-DE.md) | [English](../README.md) | [Español](README_ES-ES.md) | Français | [Italian](README_IT-IT.md) | [日本語](README_JA-JP.md) | [한국어](README_KO-KR.md) | [Русский](README_RU-RU.md) | [Tiếng Việt](README_VI-VN.md) | [العربية](README_AR-AR.md)| [简体中文](README_ZH-CN.md) | [繁體中文](README_ZH-TC.md)

[![Open in GitHub Codespaces](https://github.com/codespaces/badge.svg)](https://codespaces.new/sunner/ChatALL)

</div>

## Captures d'écran

![Screenshot](../screenshots/screenshot-1.png?raw=true)

## Fonctionnalités

Les robots d'intelligence artificielle basés sur les grands modèles de langage (Large Language Models ou LLMs) sont incroyables. Cependant, leur comportement peut être aléatoire et différents robots excellent dans différentes tâches. Si vous voulez la meilleure expérience, ne les essayez pas un par un. ChatALL (nom chinois : 齐叨) peut envoyer des invites à plusieurs robots IA simultanément afin de vous permettre de sélectionner la réponse qui vous semblera la plus pertinante.

### Bots pris en charge

| AI Bots                                                                        | Accès web     | API           | Notes                                             |
| ------------------------------------------------------------------------------ | ------------- | ------------- | ------------------------------------------------- |
| [360 AI Brain](https://ai.360.cn/)                                             | Oui           | Non           |                                                   |
| [Baidu ERNIE](https://yiyan.baidu.com/)                                        | Non           | Oui           |                                                   |
| [Character.AI](https://character.ai/)                                          | Oui           | Non           |                                                   |
| [ChatGLM2 6B & 130B](https://chatglm.cn/)                                      | Oui           | Non           | Pas besoin de compte ou de clé API                |
| [ChatGPT](https://chatgpt.com)                                             | Oui           | Oui           | Navigation web, inclut services Azure OpenAI      |
| [Claude](https://www.anthropic.com/claude)                                     | Oui           | Oui           |                                                   |
| [Code Llama](https://ai.meta.com/blog/code-llama-large-language-model-coding/) | Oui           | Non           |                                                   |
| [Cohere Aya 23](https://cohere.com/blog/aya23)                                 | Non           | Oui           |                                                   |
| [Cohere Command R Models](https://cohere.com/command)                          | Non           | Oui           |                                                   |
| [Copilot](https://copilot.microsoft.com/)                                      | Oui           | Non           |                                                   |
| [Dedao Learning Assistant](https://ai.dedao.cn/)                               | Prochainement | Non           |                                                   |
| [Falcon 180B](https://huggingface.co/tiiuae/falcon-180B-chat)                  | Oui           | Non           |                                                   |
| [Gemini](https://gemini.google.com/)                                           | Oui           | Oui           |                                                   |
| [Gemma 2B & 7B](https://blog.google/technology/developers/gemma-open-models/)  | Oui           | Non           |                                                   |
| [Gradio](https://gradio.app/)                                                  | Oui           | Non           | Pour les modèles Hugging Face space/self-deployed |
| [Groq Cloud](https://console.groq.com/docs/models)                             | Non           | Oui           |                                                   |
| [HuggingChat](https://huggingface.co/chat/)                                    | Oui           | Non           |                                                   |
| [iFLYTEK SPARK](http://xinghuo.xfyun.cn/)                                      | Oui           | Prochainement |                                                   |
| [Kimi](https://kimi.moonshot.cn/)                                              | Oui           | Non           |                                                   |
| [Llama 2 13B & 70B](https://ai.meta.com/llama/)                                | Oui           | Non           |                                                   |
| [MOSS](https://moss.fastnlp.top/)                                              | Oui           | Non           |                                                   |
| [Perplexity](https://www.perplexity.ai/)                                       | Oui           | Non           |                                                   |
| [Phind](https://www.phind.com/)                                                | Oui           | Non           |                                                   |
| [Pi](https://pi.ai)                                                            | Oui           | Non           |                                                   |
| [Poe](https://poe.com/)                                                        | Oui           | Prochainement |                                                   |
| [SkyWork](https://neice.tiangong.cn/)                                          | Oui           | Prochainement |                                                   |
| [Tongyi Qianwen](http://tongyi.aliyun.com/)                                    | Oui           | Prochainement |                                                   |
| [Vicuna 13B & 33B](https://lmsys.org/blog/2023-03-30-vicuna/)                  | Oui           | Non           | Pas besoin de compte ou de clé API                |
| [WizardLM 70B](https://github.com/nlpxucan/WizardLM)                           | Oui           | Non           |                                                   |
| [YouChat](https://you.com/)                                                    | Oui           | Non           |                                                   |
| [You](https://you.com/)                                                        | Oui           | Non           |                                                   |
| [Zephyr](https://huggingface.co/spaces/HuggingFaceH4/zephyr-chat)              | Oui           | Non           |                                                   |

Et plus...

### Autres fonctionalités

- Mode d'invite rapide : envoyez l'invite suivante sans attendre la fin de la demande précédente.
- Stockage local de l'historique du chat, pour protéger votre vie privée
- Mettez en évidence les réponses que vous aimez, supprimez les mauvaises
- Maintien automatique de la session ChatGPT en vie
- Activer/désactiver les bots à tout moment
- Choix de l'affichage en une, deux ou trois colonnes
- Supporte plusieurs langues (en, zh)
- [TODO] Meilleures recommandations

## Prérequis

ChatALL est un client, pas un proxy. Par conséquent, vous devez :

1. Avoir des comptes et/ou des jetons API fonctionnels pour les bots.
2. Avoir des connexions réseau fiables avec les bots.
3. Si vous utilisez un VPN, il doit être configuré comme proxy système/global.

## Télécharger / Installer

Télécharger depuis https://github.com/sunner/ChatALL/releases

### Sur Windows

Just download the \*-win.exe file and proceed with the setup.

### Sur macOS

Pour les Macs de type Apple Silicon (M1, M2 CPU), téléchargez le fichier \*-mac-arm64.dmg.

Pour les autres Macs (Intel), téléchargez le fichier \*-mac-x64.dmg.

### Sur Linux

Téléchargez le fichier .AppImage, rendez-le exécutable et profitez de l'expérience du "click-to-run".

## Pour les développeurs

### Contribuer à un bot

[Le guide](https://github.com/sunner/ChatALL/wiki/%E5%A6%82%E4%BD%95%E6%B7%BB%E5%8A%A0%E4%B8%80%E4%B8%AA%E6%96%B0%E7%9A%84-AI-%E5%AF%B9%E8%AF%9D%E6%9C%BA%E5%99%A8%E4%BA%BA) may help you.

### Lancement

```bash
npm install
npm run electron:serve
```

### Build

Build pour votre plateforme actuelle:

```bash
npm run electron:build
```

Build pour toutes les plateformes:

```bash
npm run electron:build -- -wml --x64 --arm64
```

## Credits

### Contributeurs

<a href="https://github.com/sunner/ChatALL/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=sunner/ChatALL" />
</a>

### Autres

- GPT-4 a contribué à une grande partie du code
- ChatGPT, Copilot et Google fournissent de nombreuses solutions (classées par ordre).
- Inspiré par [ChatHub] (https://github.com/chathub-dev/chathub). Respect !

## Sponsor

Si vous aimez ce projet, veuillez envisager:

[![ko-fi](https://ko-fi.com/img/githubbutton_sm.svg)](https://ko-fi.com/F1F8KZJGJ)
