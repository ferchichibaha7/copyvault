const { app, BrowserWindow ,screen ,ipcMain} = require('electron')


function onTbarEvent() {

  ipcMain.on('tbar', (event,arg) => {
    switch (arg) {
      case 'close':

        break;
        case 'maximum':

          break;
      default:
        break;
    }

  });

}
