const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("tokenAPI", {
  getToken: () => ipcRenderer.invoke("token:get"),
  setToken: (token) => ipcRenderer.invoke("token:set", token),
});
