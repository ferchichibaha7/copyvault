const { app, BrowserWindow ,screen ,ipcMain,remote } = require('electron')
var path = require('path');
var url = require('url');

require('@electron/remote/main').initialize();

let win = null;
const isWindows = process.platform === "win32";

const args = process.argv.slice(1),
  serve = args.some(val => val === '--serve');

function createWindow() {

  const electronScreen = screen;
  const size = electronScreen.getPrimaryDisplay().workAreaSize;

  // Create the browser window.
  win = new BrowserWindow({
    x:(size.width/2) - (930/2),
    y: (size.height/2) - (605/2),
    width: 930,
    minWidth:600,
    minHeight:400,
    height: 605,
    frame: isWindows ? false : true , //Remove frame to hide default menu

    webPreferences: {
      nodeIntegration: true,
      allowRunningInsecureContent: (serve) ? true : false,
      devTools: (serve) ? true : false,
      contextIsolation: false,  // false if you want to run 2e2 test with Spectron
      enableRemoteModule : true, // true if you want to run 2e2 test  with Spectron or use remote module in renderer context (ie. Angular)

    },
  });


  ipcMain.on('tbar', (event,data) => {
    switch (data.event) {
      case 'minimize':
        win.minimize()
        break;
        case 'close':
          win.close()
          break;
          case 'restore':
            if (win.isMaximized()) {
              win.restore();
            } else {
              win.maximize();
            }
            break;
      default:
        break;
    }
  });


  if (serve) {

    win.webContents.openDevTools();
    require('electron-reload')(__dirname, {
      electron: require(`${__dirname}/node_modules/electron`)
    });
    win.loadURL('http://localhost:4200');

  } else {
    win.loadURL(url.format({
      pathname: path.join(__dirname, 'dist/index.html'),
      protocol: 'file:',
      slashes: true
    }));
  }

  // Emitted when the window is closed.
  win.on('closed', () => {
    // Dereference the window object, usually you would store window
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    win = null;
  });

  return win;
}

try {
  // This method will be called when Electron has finished
  // initialization and is ready to create browser windows.
  // Some APIs can only be used after this event occurs.
  // Added 400 ms to fix the black background issue while using transparent window. More detais at https://github.com/electron/electron/issues/15947
  app.on('ready', () => {setTimeout(createWindow, 400)

  });

  // Quit when all windows are closed.
  app.on('window-all-closed', () => {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
      app.quit();
    }
  });

  app.on('activate', () => {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (win === null) {
      createWindow();
    }
  });

} catch (e) {
  // Catch Error
  // throw e;
}

