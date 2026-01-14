const fs = require("fs");
const path = require("path");
const os = require("os");

const APP_NAME = "Electron Token App";
const TOKEN_FILENAME = "token.cache";

function getUserDataPath() {
  if (process.platform === "win32") {
    const appData = process.env.APPDATA || path.join(os.homedir(), "AppData", "Roaming");
    return path.join(appData, APP_NAME);
  }
  if (process.platform === "darwin") {
    return path.join(os.homedir(), "Library", "Application Support", APP_NAME);
  }
  return path.join(os.homedir(), ".config", APP_NAME);
}

function cleanup() {
  const tokenPath = path.join(getUserDataPath(), TOKEN_FILENAME);
  try {
    fs.rmSync(tokenPath, { force: true });
    fs.rmdirSync(path.dirname(tokenPath), { recursive: false });
  } catch {
    // Best-effort cleanup; ignore missing files or non-empty directory.
  }
}

cleanup();
