const { app, BrowserWindow, Menu } = require('electron');
const path = require('path');
const remoteMain = require('@electron/remote/main');
require('update-electron-app')()


const fs = require('fs');

remoteMain.initialize();

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
// eslint-disable-next-line global-require
if (require('electron-squirrel-startup')) {
  app.quit();
}

const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 1600,
    height: 1000,
    autoHideMenuBar: true,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true,
      devTools: true,
      preload: path.join(__dirname, 'preload.js')
    },
  });

  mainWindow.setMenuBarVisibility(false)
  mainWindow.setMenu(null)
  
  mainWindow.on('closed', () => {
    win = null
  })
  
  // and load the index.html of the app.
  mainWindow.loadFile(path.join(__dirname, 'index.html'));
  
  // Open the DevTools.

  remoteMain.enable(mainWindow.webContents)

  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
  })

  mainWindow.webContents.openDevTools()
  
  setMainMenu(mainWindow)
};


// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

function setMainMenu(win) {
  const template = [
    {
      label: 'Filter',
      submenu: [
        {
          label: 'Hello',
          accelerator: 'Shift+CmdOrCtrl+H',
          click() {
              console.log("dont")
          }
        },
        {
          label: 'Quit',
          accelerator: 'Cmd+Q',
          click() {
            app.quit()
          }
        },
        {
          label: "Reload",
          accelerator: "Cmd+R",
          click() {
            win.reload()
          }
        },
        {
          label: "Open dev tools",
          accelerator: "f12",
          click() {
            win.openDevTools()
          }
        }
      ]
      
    }, 
    {
      label: "Edit",
      submenu: [
          { label: "Undo", accelerator: "CmdOrCtrl+Z", selector: "undo:" },
          { label: "Redo", accelerator: "Shift+CmdOrCtrl+Z", selector: "redo:" },
          { type: "separator" },
          { label: "Cut", accelerator: "CmdOrCtrl+X", selector: "cut:" },
          { label: "Copy", accelerator: "CmdOrCtrl+C", selector: "copy:" },
          { label: "Paste", accelerator: "CmdOrCtrl+V", selector: "paste:" },
          { label: "Select All", accelerator: "CmdOrCtrl+A", selector: "selectAll:" }
      ]}
  ];
  Menu.setApplicationMenu(Menu.buildFromTemplate(template));
}


// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
