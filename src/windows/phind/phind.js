import waitForElement from "!raw-loader!../helper/waitForElement.js";
import sendScript from "!raw-loader!./send.js";
import { BrowserWindow } from "electron";
import { getInjectScript } from "../helper/inject";

/**
 * @async
 * @param {Object} options - The options object.
 * @param {BrowserWindow} options.win - The Electron BrowserWindow instance.
 * @returns {Promise<void>} A Promise that resolves when the window is created.
 */
export async function sendPhind({ win, prompt }) {
  win.hide();
  let scriptDone = false;
  const _debugger = win.webContents.debugger;
  _debugger.attach();
  _debugger.on("message", async (_event, method, params) => {
    if (method === "Fetch.requestPaused") {
      if (
        params?.request?.url?.startsWith(
          "https://www.phind.com/api/stripe/subscriptions",
        ) &&
        params?.request?.method === "POST" &&
        !scriptDone
      ) {
        win.webContents.executeJavaScript(getInjectScript(waitForElement));
        await win.webContents.executeJavaScript(
          sendScript.replace("{prompt}", prompt),
        );
        scriptDone = true;
      }
      if (
        params?.request?.url?.startsWith(
          "https://https.api.phind.com/agent/",
        ) &&
        params?.request?.method === "POST"
      ) {
        const data = params.request.postData;
        global.mainWindow.webContents.send("phind-request", data);
      } else {
        await _debugger.sendCommand("Fetch.continueRequest", {
          requestId: params?.requestId,
        });
      }
    }
  });

  win.on("closed", () => _debugger.detach());
  await _debugger.sendCommand("Fetch.enable", {
    patterns: [{ urlPattern: "*", interceptionStage: "Request" }],
  });
}
