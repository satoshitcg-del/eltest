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

function writeToken(token) {
  const tokenPath = path.join(getUserDataPath(), TOKEN_FILENAME);
  fs.mkdirSync(path.dirname(tokenPath), { recursive: true });
  fs.writeFileSync(tokenPath, token, "utf8");
}

function main() {
  const token = process.argv.slice(2).join(" ");
  if (!token) {
    console.log("Usage: npm run set-token -- YOUR_TOKEN");
    process.exit(1);
  }
  writeToken(token);
  console.log("Token saved.");
}

main();
