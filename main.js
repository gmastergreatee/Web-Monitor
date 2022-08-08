const { app, BrowserWindow } = require("electron");
const path = require("path");

const mutex = app.requestSingleInstanceLock();
if (!mutex) {
  app.quit();
}

app.commandLine.appendSwitch("disable-site-isolation-trials");
app.commandLine.appendSwitch("disable-features", "OutOfBlinkCors");

let mainWindow;

const createWindow = () => {
  mainWindow = new BrowserWindow({
    width: 1000,
    height: 600,
    minWidth: 1000,
    minHeight: 600,
    darkTheme: true,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      webSecurity: false,
      webviewTag: true,
    },
    show: false,
    autoHideMenuBar: true,
  });
  // mainWindow.setIcon(path.join(__dirname, "Icon.png"));

  mainWindow.webContents.on("did-attach-webview", (e, webContents) => {
    webContents.on("new-window", (e, url) => {
      e.preventDefault();
      webContents.loadURL(url);
    });
  });

  mainWindow.on("ready-to-show", () => {
    mainWindow.show();
  });

  // and load the index.html of the app.
  // mainWindow.loadURL("http://localhost:5500/index.html");
  mainWindow.loadFile(path.join(__dirname, "index.html"));

  // Open the DevTools.
  mainWindow.webContents.openDevTools();
};

app.whenReady().then(() => {
  createWindow();

  app.on("activate", () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
