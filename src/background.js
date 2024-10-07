"use strict";
import * as urlLib from "url";

import { BrowserWindow, app, ipcMain, nativeTheme, protocol } from "electron";
import { createProtocol } from "vue-cli-plugin-electron-builder/lib";
import installExtension from "electron-devtools-installer";
import fs from "fs";
import path from "path";
import { setMenuItems } from "./menu";
import updateApp from "./update";
const isDevelopment = process.env.NODE_ENV !== "production";

const DEFAULT_USER_AGENT = ""; // Empty string to use the Electron default
/** @type {BrowserWindow} */
let mainWindow = null;

// start - makes  application a Single Instance Application
const singleInstanceLock = app.requestSingleInstanceLock();
if (!singleInstanceLock) {
  app.quit();
} else {
  app.on("second-instance", () => {
    // Someone tried to run a second instance, we should focus our window.
    if (mainWindow) {
      if (mainWindow.isMinimized()) mainWindow.restore();
      mainWindow.focus();
    }
  });
}
// end - makes application a Single Instance Application

// Disable QUIC
// Prevent Cloudflare from detecting the real IP when using a proxy that bypasses UDP traffic
app.commandLine.appendSwitch("disable-quic");

const userDataPath = app.getPath("userData");
const proxySettingPath = path.join(userDataPath, "proxySetting.json");
const defaultProxySetting = {
  enableProxy: false,
  proxyMode: "normal",
  proxyServer: "",
  proxyBypassList: "<local>",
  pacUrl: "",
  pacFile: "",
  bypassBotsProxy: "[]",
};
let proxySetting;

getProxySetting();

function getBase64(file) {
  let fileData = fs.readFileSync(file).toString("base64");
  return "data:text/plain;base64," + fileData;
}

async function initProxyDefault() {
  fs.writeFile(
    proxySettingPath,
    JSON.stringify(defaultProxySetting),
    "utf8",
    (err) => {
      if (err) {
        console.error(`Create proxy setting file failed: ${err}`);
        return false;
      } else {
        console.info(`Create proxy setting file success.`);
        return true;
      }
    },
  );
}

async function getProxySetting() {
  if (fs.existsSync(proxySettingPath)) {
    // If file exist, try read the setting
    try {
      proxySetting = JSON.parse(fs.readFileSync(proxySettingPath, "utf8"));

      // Check the proxySetting file, if some key is missing, write it back to the file
      let isChanged = false;
      for (let key in defaultProxySetting) {
        // eslint-disable-next-line no-prototype-builtins
        if (!proxySetting.hasOwnProperty(key)) {
          proxySetting[key] = defaultProxySetting[key];
          isChanged = true;
        }
      }
      if (isChanged) {
        fs.writeFileSync(
          proxySettingPath,
          JSON.stringify(proxySetting),
          "utf8",
        );
      }

      // Set the proxy
      if (proxySetting.enableProxy) {
        if (proxySetting.proxyMode === "normal") {
          console.log("Set.proxySetting.normal");
          if (proxySetting.proxyServer) {
            app.commandLine.appendSwitch(
              "proxy-server",
              proxySetting.proxyServer,
            );
            app.commandLine.appendSwitch(
              "proxy-bypass-list",
              proxySetting.proxyBypassList ?? "",
            );
          } else {
            console.log("Proxy enable but no set any proxy.");
          }
        } else if (proxySetting.proxyMode === "pacFile") {
          if (proxySetting.pacFile) {
            console.log("Set.proxySetting.pacFile");
            let data = getBase64(proxySetting.pacFile);
            console.log(data);
            app.commandLine.appendSwitch("proxy-pac-url", data);
          } else {
            console.log(
              "Proxy enable and pacFile mode set but no set any file.",
            );
          }
        } else if (proxySetting.proxyMode === "pacUrl") {
          console.log("Set.proxySetting.pacUrl");
          if (proxySetting.pacUrl) {
            app.commandLine.appendSwitch("proxy-pac-url", proxySetting.pacUrl);
          } else {
            console.log("Proxy enable and pacUrl mode set but no set any url.");
          }
        }
      }
    } catch (err) {
      console.error(`Read proxy setting file failed: ${err}`);
    }
  } else {
    // If file not exist, create the file and write the default setting
    await initProxyDefault();
  }
}
// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([
  { scheme: "app", privileges: { secure: true, standard: true } },
]);

async function createWindow() {
  // Create the browser window.
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    backgroundColor: nativeTheme.shouldUseDarkColors ? "#1a1a20" : "#fff",
    show: false,
    webPreferences: {
      // Use pluginOptions.nodeIntegration, leave this alone
      // See nklayman.github.io/vue-cli-plugin-electron-builder/guide/security.html#node-integration for more info
      nodeIntegration: true,
      contextIsolation: false,
      webSecurity: false,
      preload: "./preload.js",
    },
  });

  mainWindow = win;

  // Force the SameSite attribute to None for all cookies
  // This is required for the cross-origin request to work
  win.webContents.session.cookies.on(
    "changed",
    async (event, cookie, cause, removed) => {
      if (
        !removed &&
        cause === "explicit" &&
        cookie.sameSite !== "no_restriction"
      ) {
        try {
          const domain = cookie.domain.startsWith(".")
            ? cookie.domain.substring(1)
            : cookie.domain;
          const url = `https://${domain}${cookie.path}`;
          let newCookie = {
            url: url,
            name: cookie.name,
            value: cookie.value,
            path: cookie.path,
            httpOnly: cookie.httpOnly,
            expirationDate: cookie.expirationDate,
            secure: true, // Must be true for cross-origin cookies
            sameSite: "no_restriction",
          };
          // If the domain starts with a dot, set the domain as is.
          // Otherwise, Electron will use the url domain without the first dot as default.
          if (cookie.domain.startsWith(".")) {
            newCookie.domain = cookie.domain;
          }
          // Handle the session cookie for QianWen
          if (
            isAllowedDomain(cookie.domain)
          ) {
            newCookie.expirationDate = setCookieExpireDate(7);
          }
          await win.webContents.session.cookies.set(newCookie);
        } catch (error) {
          console.error(error, cookie);
        }
      }
    },
  );

  function isAllowedDomain(domain) {
    const allowedDomains = [
      "aliyun.com",
      "qianwen.aliyun.com"
    ];
    const parsedHost = new URL(`https://${domain.startsWith(".") ? domain.substring(1) : domain}`).host;
    return allowedDomains.some(
      (allowedDomain) =>
        parsedHost === allowedDomain || parsedHost.endsWith(`.${allowedDomain}`)
    );
  }

  // Modify the Referer header for each request and special patch for some sites.
  win.webContents.session.webRequest.onBeforeSendHeaders(
    (details, callback) => {
      const { url, requestHeaders } = details;
      const urlObj = new URL(url);

      // Only replace outbound access and electron origin
      if (["http:", "https:"].includes(urlObj.protocol)) {
        const referer = `${urlObj.protocol}//${urlObj.host}/`;
        if (!requestHeaders["Referer"]) {
          // Force add referer header. This is required for QianWen.
          requestHeaders["Referer"] = referer;
        } else if (
          requestHeaders["Referer"].includes("127.0.0.1") ||
          requestHeaders["Referer"].includes("localhost")
        ) {
          // Replace the referer header if it is the default one.
          requestHeaders["Referer"] = referer;
        }
      }

      // To depress the 403 error
      if (url.startsWith("https://gemini.google.com/app")) {
        requestHeaders["sec-fetch-mode"] = "navigate";
      } else if (url.includes("BardChatUi")) {
        requestHeaders["origin"] = "https://gemini.google.com";
        requestHeaders["sec-fetch-site"] = "same-origin";
      }

      // To make Copilot work
      if (url.startsWith("wss://sydney.bing.com/")) {
        requestHeaders["Origin"] = "https://copilot.microsoft.com";
      }

      if (
        url.startsWith("https://character.ai/_next/data/") &&
        /^https:\/\/character\.ai\/_next\/data\/.+\/index\.json/.test(url)
      ) {
        const parts = url.split("/");
        if (parts.length >= 6) {
          mainWindow.webContents.send("commit", "setCharacterAI", {
            version: parts[5],
          });
        }
      }

      callback({ requestHeaders });
    },
  );

  if (process.env.WEBPACK_DEV_SERVER_URL) {
    // Load the url of the dev server if in development mode
    await win.loadURL(process.env.WEBPACK_DEV_SERVER_URL);
    win.show();
    if (!process.env.IS_TEST) win.webContents.openDevTools();
  } else {
    createProtocol("app");
    // Load the index.html when not in development
    await win.loadURL("app://./index.html");
    win.show();
  }
}

function createNewWindow({ url, userAgent = "", loginScript }) {
  const newWin = new BrowserWindow({
    width: 800,
    height: 600,
    show: false,
    backgroundColor: nativeTheme.shouldUseDarkColors ? "#1a1a20" : "#fff",
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      // webSecurity: false,  // false will break Cloudflare captcha challenge
    },
  });

  if (userAgent) {
    newWin.webContents.setUserAgent(userAgent);
  }
  if (process.platform !== "darwin") newWin.minimize();
  newWin.loadURL(url);
  newWin.show();
  newWin.webContents.once("dom-ready", () => {
    if (loginScript) {
      newWin.webContents.executeJavaScript(loginScript);
    }
  });
  newWin.on("close", async (e) => {
    e.preventDefault(); // Prevent the window from closing

    try {
      // Hacking secrets
      const getLocalStorage = async (key) => {
        return await newWin.webContents.executeJavaScript(
          `localStorage.getItem("${key}");`,
        );
      };

      const getCookie = async (key) => {
        return await newWin.webContents.executeJavaScript(
          `document.cookie.split("; ").find((cookie) => cookie.startsWith("${key}="))?.split("=")[1];`,
        );
      };

      if (url.startsWith("https://moss.fastnlp.top/")) {
        // Get the secret of MOSS
        const secret = await getLocalStorage("flutter.token");
        mainWindow.webContents.send("moss-secret", secret);
      } else if (url.startsWith("https://qianwen.aliyun.com/")) {
        // Get QianWen bot's XSRF-TOKEN
        const token = await getCookie("XSRF-TOKEN");
        mainWindow.webContents.send("QIANWEN-XSRF-TOKEN", token);
      } else if (url.startsWith("https://chat.tiangong.cn/")) {
        // Get the tokens of SkyWork
        const inviteToken = await getLocalStorage("aiChatQueueWaitToken");
        const token = await getLocalStorage("aiChatResearchToken");
        mainWindow.webContents.send("SKYWORK-TOKENS", { inviteToken, token });
      } else if (url.startsWith("https://claude.ai/")) {
        const org = await getCookie("lastActiveOrg");
        mainWindow.webContents.send("CLAUDE-2-ORG", org);
      } else if (url.startsWith("https://poe.com/")) {
        const formkey = await newWin.webContents.executeJavaScript(
          "window.ereNdsRqhp2Rd3LEW();",
        );
        mainWindow.webContents.send("POE-FORMKEY", formkey);
      } else if (url.startsWith("https://chatglm.cn/")) {
        const token = await getCookie("chatglm_token");
        mainWindow.webContents.send("CHATGLM-TOKENS", { token });
      } else if (url.startsWith("https://kimi.moonshot.cn/")) {
        const access_token = await getLocalStorage("access_token");
        const refresh_token = await getLocalStorage("refresh_token");
        mainWindow.webContents.send("KIMI-TOKENS", {
          access_token,
          refresh_token,
        });
      }
    } catch (err) {
      console.error(err);
    }

    newWin.destroy(); // Destroy the window manually
    // Tell renderer process to check aviability
    mainWindow.webContents.send("CHECK-AVAILABILITY", url);
  });
}

async function getCookies(filter) {
  const cookies = await mainWindow.webContents.session.cookies.get({
    ...filter,
  });
  return cookies;
}

ipcMain.handle(
  "create-new-window",
  (event, { url, userAgent, loginScript }) => {
    createNewWindow({ url, userAgent, loginScript });
  },
);

ipcMain.handle("get-native-theme", () => {
  return Promise.resolve({
    shouldUseDarkColors: nativeTheme.shouldUseDarkColors,
  });
});

// For Proxy Setting Vue Page
ipcMain.handle("get-proxy-setting-path", async () => {
  return proxySettingPath;
});

ipcMain.handle("get-proxy-setting-content", async () => {
  await getProxySetting();
  return proxySetting;
});

ipcMain.handle("reset-proxy-default-setting", async () => {
  const resetResut = await initProxyDefault();
  return resetResut;
});

ipcMain.handle("save-proxy-setting", async (event, args) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(proxySettingPath, JSON.stringify(args.data), "utf8", (err) => {
      if (err) {
        reject({ success: false, error: err });
      } else {
        resolve({ success: true });
      }
    });
  });
});

ipcMain.handle("save-proxy-and-restart", async () => {
  app.relaunch();
  app.exit();
  return "";
});
// Proxy Setting End

ipcMain.handle("set-is-show-menu-bar", (_, isShowMenuBar) => {
  mainWindow.setMenuBarVisibility(isShowMenuBar);
});

ipcMain.handle("get-cookies", async (event, filter) => {
  return await getCookies(filter);
});

nativeTheme.on("updated", () => {
  mainWindow.webContents.send("on-updated-system-theme");
});

// Quit when all windows are closed.
app.on("window-all-closed", () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", async () => {
  if (isDevelopment && !process.env.IS_TEST) {
    // Install Vue Devtools
    try {
      await installExtension("nhdogjmejiglipccpnnnanhbledajbpd");
    } catch (e) {
      console.error("Vue Devtools failed to install:", e.toString());
    }
  }

  if (DEFAULT_USER_AGENT) {
    app.userAgentFallback = DEFAULT_USER_AGENT;
  }

  createWindow();
  setMenuItems();
  updateApp(mainWindow);
});

// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
  if (process.platform === "win32") {
    process.on("message", (data) => {
      if (data === "graceful-exit") {
        app.quit();
      }
    });
  } else {
    process.on("SIGTERM", () => {
      app.quit();
    });
  }
}

function setCookieExpireDate(days) {
  const expirationDate = new Date();
  expirationDate.setTime(expirationDate.getTime() + days * 24 * 60 * 60 * 1000);
  return expirationDate.getTime() / 1000;
}
