var Sails = require('sails').constructor

var rc = require('sails/accessible/rc')

var util = require('util')

const electron = require('electron')
const app = electron.app
const BrowserWindow = electron.BrowserWindow

const path = require('path')
const url = require('url')
const isDev = require('electron-is-dev')

const ipc = require('electron').ipcMain

const firstRun = require('electron-first-run')

const neoOneServer = require('./neo-one/BinaryIpcControls')

const sailsServer = require('./neo-one/sails')

const { spawn } = require('child_process')

const isFirstRun = firstRun()

let mainWindow, systemConfig

let sailsServerPath, sailsIsPackaged, sailsServerPort = 2328

let neoone = {
  serverPID: undefined,
  serverPath: './server/node_modules/.bin/neo-one'
}

global.serverConfig = { useSails: false }

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

  // console.log(util.inspect(mainWindow, {depth: null}))

  let systemConfig = getSystemProfile()

  if (app.isPackaged) {
    sailsIsPackaged = true
    sailsServerPath = systemConfig.exe + '/../server'
    const re = /\/neo-halite$/
    neoone.serverPath = systemConfig.exe.replace(re, '/server/node_modules/.bin/neo-one')
  } else {
    sailsIsPackaged = false
    sailsServerPath = './server'
    neoone.serverPath = './server/node_modules/.bin/neo-one'
  }

  console.log('neoone.serverPath: '+neoone.serverPath)

  sailsServer.stopAll()
  sailsServer.removeIpcListeners()
  neoOneServer.addIpcListeners(global, neoone)
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

ipc.on('use-sails', function (event, arg) {
  console.log('Toggled checkbox to use Sails.js to: '+arg)
  // TODO add flag to configure from environment or cli

  if (global.serverConfig.useSails) {
    // TODO: Test, as this is known to work on Ubuntu 18, but it could cause problems on other platforms; see below.

    // sailsServer.lift(sailsServerPath, sailsServerPort, sailsIsPackaged)
    neoOneServer.stopAll()
    neoOneServer.removeIpcListeners()
    sailsServer.addIpcListeners()

  } else { // Assume neo-one direct control for now
    sailsServer.stopAll()
    sailsServer.removeIpcListeners()
    neoOneServer.addIpcListeners(global, neoone)
  }
})

// This manages events from the terminal widget under Workspace/Console
ipc.on('setup-event-manager', function (event, arg) {
  neoOneServer.setupEventManager(event)
})

ipc.on('check-install', function (event, arg) {
  console.log('Checking your software installation...')

  let systemConfig = getSystemProfile()

  if (isFirstRun) {
    console.log('Your software is installing. ' + isFirstRun)
    mainWindow.webContents.send('installing')
  } else {
    console.log('Your software is already installed.')
  }

  event.sender.send('check-install-reply', systemConfig)
})

ipc.on('update-system-profile', function (event, arg) {
  console.log('Checking your software installation...')

  let systemConfig = getSystemProfile()

  if (isFirstRun) {
    console.log('Your software is installing. ' + isFirstRun)
    mainWindow.webContents.send('installing')
  } else {
    console.log('Your software is already installed.')
  }

  event.sender.send('update-system-profile-reply', systemConfig)
})

function getSystemProfile() {
  let home, appData, userData, temp, exe, mod, desktop, documents, music, pictures, videos, logs, pepperFlashSystemPlugin, version, gpuInfo, isAccessibilitySupportEnabled, isPackaged

  function configError(error) {
    console.log('Install config: ' + error)
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
  try { version = app.getVersion() } catch(error) { configError(error) }
  try { appMetrics = app.getAppMetrics() } catch(error) { configError(error) }
  try { gpuInfo = app.getGPUInfo('complete') } catch(error) { configError(error) }
  try { isAccessibilitySupportEnabled = app.isAccessibilitySupportEnabled() } catch(error) { configError(error) }
  try { isPackaged = app.isPackaged } catch(error) { configError(error) }

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
    pepperFlashSystemPlugin: pepperFlashSystemPlugin,
    version: version,
    appMetrics: appMetrics,
    gpuInfo: gpuInfo,
    isAccessibilitySupportEnabled: isAccessibilitySupportEnabled,
    isPackaged: isPackaged,
    consoleBuffer: ['Welcome to Neo-Halite']
  }

  console.log('systemConfig is ' + util.inspect(systemConfig, {depth: null}))

  return systemConfig
}
