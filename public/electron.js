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

const firstRun = require('electron-first-run')

const isFirstRun = firstRun()

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
    if (sailsServer === null) {
      sailsServer = new Sails()



      sailsServer.lift({appPath: './server/'}, function(err) {
        if (err) {
            console.log('Error occurred lifting Sails app:', err)
            return
          }
          console.log('Sails app lifted successfully!')
      })
    } else console.log('sails server is already running')
})

ipc.on('stop-server', function (event, arg) {
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

ipc.on('check-install', function (event, arg) {
  console.log('Checking your software installation...')
  // console.log('Directories: ')
  // console.log('home: ' + app.getPath('home'))
  // console.log('appData: ' + app.getPath('appData'))
  // console.log('userData: ' + app.getPath('userData'))
  // console.log('temp: ' + app.getPath('temp'))
  // console.log('exe: ' + app.getPath('exe'))
  // console.log('module: ' + app.getPath('module'))
  // console.log('desktop: ' + app.getPath('desktop'))
  // console.log('documents: ' + app.getPath('documents'))
  // console.log('downloads: ' + app.getPath('downloads'))
  // console.log('music: ' + app.getPath('music'))
  // console.log('pictures: ' + app.getPath('pictures'))
  // console.log('videos: ' + app.getPath('videos'))
  // console.log('logs: ' + app.getPath('logs'))
  // console.log('pepperFlashSystemPlugin: ' + app.getPath('pepperFlashSystemPlugin'))

  let home, appData, userData, temp, exe, mod, desktop, documents, music, pictures, videos, logs, pepperFlashSystemPlugin

  let systemConfig

  function configError(error) {
    console.log('install config: ' + error)
  }

  try { home = app.getPath('home') } catch(error) { configError(error) }
  try { appData = app.getPath('appData') } catch(error) { configError(error) }
  try { userData = app.getPath('userData') } catch(error) { configError(error) }
  try { temp = app.getPath('temp') } catch(error) { configError(error) }
  try { exe = app.getPath('exe') } catch(error) { configError(error) }
  try { mod = app.getPath('module') } catch(error) { configError(error) }
  try { desktop = app.getPath('desktop') } catch(error) { configError(error) }
  try { documents = app.getPath('documents') } catch(error) { configError(error) }
  try { music = app.getPath('music') } catch(error) { configError(error) }
  try { tepicturesmp = app.getPath('pictures') } catch(error) { configError(error) }
  try { videos = app.getPath('videos') } catch(error) { configError(error) }
  try { logs = app.getPath('logs') } catch(error) { configError(error) }
  try { pepperFlashSystemPlugin = app.getPath('pepperFlashSystemPlugin') } catch(error) { configError(error) }

  systemConfig = {
    isFirstRun: isFirstRun,
    home: home,
    appData: appData,
    userData: userData,
    temp: temp,
    exe: exe,
    module: mod,
    desktop: desktop,
    documents: documents,
    music: music,
    pictures: pictures,
    videos: videos,
    logs: logs,
    pepperFlashSystemPlugin: pepperFlashSystemPlugin
  }

  console.log('systemConfig is ' + util.inspect(systemConfig, {depth: null}))

  if (isFirstRun) {
    console.log('Your software is installing. ' + isFirstRun)
    mainWindow.webContents.send('installing')
  } else {
    console.log('Your software is already installed.')
  }

  event.sender.send('check-install-reply', systemConfig)
})
