

/**
 * Require dependencies.
 */
const electron = require("electron");
const path = require('path')
const url = require('url')


/**
 * Instantiate electron objects.
 */
const ipc = electron.ipcMain;
const dialog = electron.dialog;
const Menu = electron.Menu;
const MenuItem = electron.MenuItem;
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const globalShortcut = electron.globalShortcut;
const Tray = electron.Tray;
const iconPath = path.join(__dirname,'resources/icon/50x50.png');


let win = null;
let tray = null;

function createWindow() {

  win = new BrowserWindow({
    webPreferences: {
      nodeIntegration: true,
      nodeIntegrationInWorker: true
    }
  });

  win.loadURL(url.format({
    pathname: path.join(__dirname, './app/view/index.html'),
    protocol: 'file:',
    slashes: true,
    show: false
  }));

  win.on('closed', () => {
    win = null
  });

  win.once('ready-to-show', () => {
    win.show()
  })

  win.maximize();
}

app.on('ready', function () {

  createWindow();

  const template = [
    {

      label: "Help",
      
      submenu: [
        {
          label: 'Debug',
          role: 'toggledevtools'
        },
        {
          type: 'separator'
        },
        {
          label: 'Contant me!',
          click: function () {
            electron.shell.openExternal('https://github.com/stnv');
          },
          accelerator: 'CmdOrCtrl + Shift + H'
        }
      ]
    }
  ];

  const menu = Menu.buildFromTemplate(template);

  Menu.setApplicationMenu(menu);
  
  const ctxMenu = new Menu();
  
  ctxMenu.append(new MenuItem({
    label: 'Debug',
    role: 'toggleDevTools'
  }));

  win.webContents.on('context-menu', function(e,params){
    ctxMenu.popup(win,params.x,params.y);
  });

  globalShortcut.register('Alt + 1', function() {
    win.show();
  });

  tray = new Tray(iconPath);
  tray.setToolTip('Code Flow Visualizer');
});

app.on('will-quit', function() {
  globalShortcut.unregisterAll();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (win === null) {
    createWindow();
  }
});
