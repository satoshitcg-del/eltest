const path = require("path");
const { app, BrowserWindow, ipcMain } = require("electron");
const { readToken, writeToken } = require("./tokenStore");

const APP_NAME = "Electron Token App";

app.setName(APP_NAME);
app.setPath("userData", path.join(app.getPath("appData"), APP_NAME));

function createWindow() {
  const win = new BrowserWindow({
    width: 520,
    height: 220,
    resizable: false,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      contextIsolation: true,
      nodeIntegration: false,
    },
  });

  win.loadFile("index.html");
}

ipcMain.handle("token:get", () => readToken());
ipcMain.handle("token:set", (_event, token) => {
  writeToken(String(token ?? ""));
  return true;
});

app.whenReady().then(() => {
  createWindow();
  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
