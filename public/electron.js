var Sails = require('sails').constructor

var rc = require('sails/accessible/rc')

var util = require('util')

let sailsServer = null

const electron = require('electron')
const app = electron.app
const BrowserWindow = electron.BrowserWindow

const path = require('path')
const url = require('url')
const isDev = require('electron-is-dev')

const ipc = require('electron').ipcMain

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow(
    {
      width: 900,
      height: 680,
      webPreferences: {
        nodeIntegration: true,
        preload: __dirname + '/preload.js'
      }
  })
  mainWindow.loadURL(isDev ? 'http://localhost:3000' : `file://${path.join(__dirname, '../build/index.html')}`)
  mainWindow.on('closed', () => mainWindow = null)
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})

ipc.on('start-server', function (event, arg) {
  // win.webContents.send('targetPriceVal', arg)
    if (sailsServer === null) {
      sailsServer = new Sails()

      sailsServer.lift({appPath: './server/'}, function(err) {
        if (err) {
            console.log('Error occurred lifting Sails app:', err)
            return
          }

          console.log('Sails app lifted successfully!')
          // console.log('sails.config: ' + util.inspect(sailsServer.config, {depth: null}))
      })
    } else console.log('sails server is already running')
})

ipc.on('stop-server', function (event, arg) {
  // win.webContents.send('targetPriceVal', arg)
  if (sailsServer !== null) {
    sailsServer.lower(
      function (err) {
        sailsServer = null
        if (err) {
          return console.log("Error occurred lowering Sails app: ", err);
        }
        console.log("Sails app lowered successfully!");
      }
    )
  } else console.log('sails is not running')
})
