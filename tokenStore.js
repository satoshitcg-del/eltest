const fs = require("fs");
const path = require("path");
const { app } = require("electron");

const TOKEN_FILENAME = "token.cache";

function getTokenPath() {
  return path.join(app.getPath("userData"), TOKEN_FILENAME);
}

function readToken() {
  try {
    const tokenPath = getTokenPath();
    if (!fs.existsSync(tokenPath)) {
      return "";
    }
    return fs.readFileSync(tokenPath, "utf8").trim();
  } catch {
    return "";
  }
}

function writeToken(token) {
  const tokenPath = getTokenPath();
  fs.mkdirSync(path.dirname(tokenPath), { recursive: true });
  fs.writeFileSync(tokenPath, token ?? "", "utf8");
}

module.exports = {
  getTokenPath,
  readToken,
  writeToken,
};
