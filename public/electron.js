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

const { spawn } = require('child_process')

const isFirstRun = firstRun()

let mainWindow, systemConfig, sailsIsPackaged

let sailsServer = null

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
})


ipc.on('start-server', function (event, arg) {
  if (global.serverConfig.useSails) {
    if (sailsServer === null) {
      sailsServer = new Sails()

      // TODO: Test, as this is known to work on Ubuntu 18, but it could cause problems on other platforms; see below.
      let serverPath

      if (app.isPackaged) {
        sailsIsPackaged = true
        serverPath = systemConfig.exe + '/../server'
      } else {
        sailsIsPackaged = false
        serverPath = './server'
      }

      // sailsIsPackaged = true

      // TODO add flag to configure from environment or cli
      let serverPort = 2328

      console.log('Lifting server at: ' + serverPath)

      sailsServer.lift({appPath: serverPath, port: serverPort, isPackaged: sailsIsPackaged}, function(err) {
        if (err) {
            console.log('Error occurred lifting Sails app:', err)
            return
          }
          console.log('Sails app lifted successfully!')
      })
    } else console.log('Sails server is already running.')
  } else {
    console.log('Not using Sails. Starting Neo-One server directly from Electron.')

    const p = spawn(neoone.serverPath, ['init'])

    p.stdout.on('data', (data) => {
      console.log(`stdout: ${data}`)
    })

    p.stderr.on('data', (data) => {
      console.log(`stderr: ${data}`)

      const regex = /.*\(pid=([0-9].*)\)\n/
      const found = data.toString().replace(regex, '$1')
      console.log(`found ${found}`)
      neoone.serverPID = found
    })

    p.on('close', (code) => {
      console.log(`child process exited with code ${code}`)
    })
  }
})

ipc.on('stop-server', function (event, arg) {
  if (global.serverConfig.useSails) {
    if (sailsServer !== null) {
      sailsServer.lower(
        function (err) {
          sailsServer = null
          if (err) {
            return console.log("Error occurred lowering Sails app: ", err)
          }
          console.log("Sails app lowered successfully!")
        }
      )
    } else console.log('Sails is not running.')
  } else {
    console.log('Not using Sails. Stopping Neo-One server directly from Electron.')

    const pid = neoone.serverPID

    console.log(`kill ${pid}`)

    const p = spawn('kill', [pid])

    p.stdout.on('data', (data) => {
      console.log(`stdout: ${data}`)
    })

    p.stderr.on('data', (data) => {
      console.log(`stderr: ${data}`)
    })

    p.on('close', (code) => {
      console.log(`child process exited with code ${code}`)
    })
  }
})

ipc.on('create-neotracker', function (event, arg) {
  if (global.serverConfig.useSails) {

  } else {
    console.log('Not using Sails. Neo-One create neotracker directly from Electron.')

    const p = spawn(neoone.serverPath, ['create', 'neotracker', arg])

    p.stdout.on('data', (data) => {
      console.log(`stdout: ${data}`)
    })

    p.stderr.on('data', (data) => {
      console.log(`stderr: ${data}`)
    })

    p.on('close', (code) => {
      console.log(`child process exited with code ${code}`)
    })
  }
})

ipc.on('delete-neotracker', function (event, arg) {
  if (global.serverConfig.useSails) {

  } else {
    console.log('Not using Sails. Neo-One delete neotracker directly from Electron.')

    const p = spawn(neoone.serverPath, ['delete', 'neotracker', arg])

    p.stdout.on('data', (data) => {
      console.log(`stdout: ${data}`)
    })

    p.stderr.on('data', (data) => {
      console.log(`stderr: ${data}`)
    })

    p.on('close', (code) => {
      console.log(`child process exited with code ${code}`)
    })
  }
})

ipc.on('describe-neotracker', function (event, arg) {
  if (global.serverConfig.useSails) {

  } else {
    console.log('Not using Sails. Neo-One describe neotracker directly from Electron.')

    const p = spawn(neoone.serverPath, ['describe', 'neotracker', arg])

    p.stdout.on('data', (data) => {
      console.log(`stdout: ${data}`)
    })

    p.stderr.on('data', (data) => {
      console.log(`stderr: ${data}`)
    })

    p.on('close', (code) => {
      console.log(`child process exited with code ${code}`)
    })
  }
})

ipc.on('get-neotracker', function (event, arg) {
  if (global.serverConfig.useSails) {

  } else {
    console.log('Not using Sails. Neo-One get neotracker directly from Electron.')

    const p = spawn(neoone.serverPath, ['get', 'neotracker'])

    p.stdout.on('data', (data) => {
      console.log(`stdout: ${data}`)
    })

    p.stderr.on('data', (data) => {
      console.log(`stderr: ${data}`)
    })

    p.on('close', (code) => {
      console.log(`child process exited with code ${code}`)
    })
  }
})

ipc.on('start-neotracker', function (event, arg) {
  if (global.serverConfig.useSails) {

  } else {
    console.log('Not using Sails. Neo-One start neotracker directly from Electron.')

    const p = spawn(neoone.serverPath, ['start', 'neotracker', arg])

    p.stdout.on('data', (data) => {
      console.log(`stdout: ${data}`)
    })

    p.stderr.on('data', (data) => {
      console.log(`stderr: ${data}`)
    })

    p.on('close', (code) => {
      console.log(`child process exited with code ${code}`)
    })
  }
})

ipc.on('stop-neotracker', function (event, arg) {
  if (global.serverConfig.useSails) {

  } else {
    console.log('Not using Sails. Neo-One stop neotracker directly from Electron.')

    const p = spawn(neoone.serverPath, ['stop', 'neotracker', arg])

    p.stdout.on('data', (data) => {
      console.log(`stdout: ${data}`)
    })

    p.stderr.on('data', (data) => {
      console.log(`stderr: ${data}`)
    })

    p.on('close', (code) => {
      console.log(`child process exited with code ${code}`)
    })
  }
})

ipc.on('activate-network', function (event, arg) {
  if (global.serverConfig.useSails) {

  } else {
    console.log('Not using Sails. Neo-One activate network directly from Electron.')

    const p = spawn(neoone.serverPath, ['activate', 'network', arg])

    p.stdout.on('data', (data) => {
      console.log(`stdout: ${data}`)
    })

    p.stderr.on('data', (data) => {
      console.log(`stderr: ${data}`)
    })

    p.on('close', (code) => {
      console.log(`child process exited with code ${code}`)
    })
  }
})

ipc.on('create-network', function (event, arg) {
  if (global.serverConfig.useSails) {

  } else {
    console.log('Not using Sails. Neo-One create network directly from Electron.')

    const p = spawn(neoone.serverPath, ['create', 'network', arg])

    p.stdout.on('data', (data) => {
      console.log(`stdout: ${data}`)
    })

    p.stderr.on('data', (data) => {
      console.log(`stderr: ${data}`)
    })

    p.on('close', (code) => {
      console.log(`child process exited with code ${code}`)
    })
  }
})

ipc.on('deactivate-network', function (event, arg) {
  if (global.serverConfig.useSails) {

  } else {
    console.log('Not using Sails. Neo-One deactivate network directly from Electron.')

    const p = spawn(neoone.serverPath, ['deactivate', 'network', arg])

    p.stdout.on('data', (data) => {
      console.log(`stdout: ${data}`)
    })

    p.stderr.on('data', (data) => {
      console.log(`stderr: ${data}`)
    })

    p.on('close', (code) => {
      console.log(`child process exited with code ${code}`)
    })
  }
})

ipc.on('delete-network', function (event, arg) {
  if (global.serverConfig.useSails) {

  } else {
    console.log('Not using Sails. Neo-One delete network directly from Electron.')

    const p = spawn(neoone.serverPath, ['delete', 'network', arg])

    p.stdout.on('data', (data) => {
      console.log(`stdout: ${data}`)
    })

    p.stderr.on('data', (data) => {
      console.log(`stderr: ${data}`)
    })

    p.on('close', (code) => {
      console.log(`child process exited with code ${code}`)
    })
  }
})

ipc.on('describe-network', function (event, arg) {
  if (global.serverConfig.useSails) {

  } else {
    console.log('Not using Sails. Neo-One describe network directly from Electron.')

    const p = spawn(neoone.serverPath, ['describe', 'network', arg])

    p.stdout.on('data', (data) => {
      console.log(`stdout: ${data}`)
    })

    p.stderr.on('data', (data) => {
      console.log(`stderr: ${data}`)
    })

    p.on('close', (code) => {
      console.log(`child process exited with code ${code}`)
    })
  }
})

ipc.on('get-network', function (event, arg) {
  if (global.serverConfig.useSails) {

  } else {
    console.log('Not using Sails. Neo-One get network directly from Electron.')

    const p = spawn(neoone.serverPath, ['get', 'network'])

    p.stdout.on('data', (data) => {
      console.log(`stdout: ${data}`)
    })

    p.stderr.on('data', (data) => {
      console.log(`stderr: ${data}`)
    })

    p.on('close', (code) => {
      console.log(`child process exited with code ${code}`)
    })
  }
})

ipc.on('start-network', function (event, arg) {
  if (global.serverConfig.useSails) {

  } else {
    console.log('Not using Sails. Neo-One start network directly from Electron.')

    const p = spawn(neoone.serverPath, ['start', 'network', arg])

    p.stdout.on('data', (data) => {
      console.log(`stdout: ${data}`)
    })

    p.stderr.on('data', (data) => {
      console.log(`stderr: ${data}`)
    })

    p.on('close', (code) => {
      console.log(`child process exited with code ${code}`)
    })
  }
})

ipc.on('stop-network', function (event, arg) {
  if (global.serverConfig.useSails) {

  } else {
    console.log('Not using Sails. Neo-One stop network directly from Electron.')

    const p = spawn(neoone.serverPath, ['stop', 'network', arg])

    p.stdout.on('data', (data) => {
      console.log(`stdout: ${data}`)
    })

    p.stderr.on('data', (data) => {
      console.log(`stderr: ${data}`)
    })

    p.on('close', (code) => {
      console.log(`child process exited with code ${code}`)
    })
  }
})

ipc.on('activate-wallet', function (event, arg) {
  if (global.serverConfig.useSails) {

  } else {
    console.log('Not using Sails. Neo-One actiave wallet directly from Electron.')

    const p = spawn(neoone.serverPath, ['activate', 'wallet', arg])

    p.stdout.on('data', (data) => {
      console.log(`stdout: ${data}`)
    })

    p.stderr.on('data', (data) => {
      console.log(`stderr: ${data}`)
    })

    p.on('close', (code) => {
      console.log(`child process exited with code ${code}`)
    })
  }
})

ipc.on('create-wallet', function (event, arg) {
  if (global.serverConfig.useSails) {

  } else {
    console.log('Not using Sails. Neo-One create wallet directly from Electron.')

    const p = spawn(neoone.serverPath, ['create', 'wallet', arg])

    p.stdout.on('data', (data) => {
      console.log(`stdout: ${data}`)
    })

    p.stderr.on('data', (data) => {
      console.log(`stderr: ${data}`)
    })

    p.on('close', (code) => {
      console.log(`child process exited with code ${code}`)
    })
  }
})

ipc.on('deactivate-wallet', function (event, arg) {
  if (global.serverConfig.useSails) {

  } else {
    console.log('Not using Sails. Neo-One deactivate wallet directly from Electron.')

    const p = spawn(neoone.serverPath, ['deactivate', 'wallet', arg])

    p.stdout.on('data', (data) => {
      console.log(`stdout: ${data}`)
    })

    p.stderr.on('data', (data) => {
      console.log(`stderr: ${data}`)
    })

    p.on('close', (code) => {
      console.log(`child process exited with code ${code}`)
    })
  }
})

ipc.on('delete-wallet', function (event, arg) {
  if (global.serverConfig.useSails) {

  } else {
    console.log('Not using Sails. Neo-One delete wallet directly from Electron.')

    const p = spawn(neoone.serverPath, ['delete', 'wallet', arg])

    p.stdout.on('data', (data) => {
      console.log(`stdout: ${data}`)
    })

    p.stderr.on('data', (data) => {
      console.log(`stderr: ${data}`)
    })

    p.on('close', (code) => {
      console.log(`child process exited with code ${code}`)
    })
  }
})

ipc.on('describe-wallet', function (event, arg) {
  if (global.serverConfig.useSails) {

  } else {
    console.log('Not using Sails. Neo-One describe wallet directly from Electron.')

    const p = spawn(neoone.serverPath, ['describe', 'wallet', arg])

    p.stdout.on('data', (data) => {
      console.log(`stdout: ${data}`)
    })

    p.stderr.on('data', (data) => {
      console.log(`stderr: ${data}`)
    })

    p.on('close', (code) => {
      console.log(`child process exited with code ${code}`)
    })
  }
})

ipc.on('get-wallet', function (event, arg) {
  if (global.serverConfig.useSails) {

  } else {
    console.log('Not using Sails. Neo-One get wallet directly from Electron.')

    const p = spawn(neoone.serverPath, ['get', 'wallet'])

    p.stdout.on('data', (data) => {
      console.log(`stdout: ${data}`)
    })

    p.stderr.on('data', (data) => {
      console.log(`stderr: ${data}`)
    })

    p.on('close', (code) => {
      console.log(`child process exited with code ${code}`)
    })
  }
})

ipc.on('bootstrap', function (event, arg) {
  if (global.serverConfig.useSails) {

  } else {
    console.log('Not using Sails. Neo-One bootstrap directly from Electron.')

    const p = spawn(neoone.serverPath, ['bootstrap'])

    p.stdout.on('data', (data) => {
      console.log(`stdout: ${data}`)
    })

    p.stderr.on('data', (data) => {
      console.log(`stderr: ${data}`)
    })

    p.on('close', (code) => {
      console.log(`child process exited with code ${code}`)
    })
  }
})

ipc.on('build', function (event, arg) {
  if (global.serverConfig.useSails) {

  } else {
    console.log('Not using Sails. Neo-One build directly from Electron.')

    const p = spawn(neoone.serverPath, ['build'])

    p.stdout.on('data', (data) => {
      console.log(`stdout: ${data}`)
    })

    p.stderr.on('data', (data) => {
      console.log(`stderr: ${data}`)
    })

    p.on('close', (code) => {
      console.log(`child process exited with code ${code}`)
    })
  }
})

ipc.on('init', function (event, arg) {
  if (global.serverConfig.useSails) {

  } else {
    console.log('Not using Sails. Neo-One init directly from Electron.')

    const p = spawn(neoone.serverPath, ['init'])

    p.stdout.on('data', (data) => {
      console.log(`stdout: ${data}`)
    })

    p.stderr.on('data', (data) => {
      console.log(`stderr: ${data}`)
    })

    p.on('close', (code) => {
      console.log(`child process exited with code ${code}`)
    })
  }
})

ipc.on('verify', function (event, arg) {
  if (global.serverConfig.useSails) {

  } else {
    console.log('Not using Sails. Neo-One verify directly from Electron.')

    const p = spawn(neoone.serverPath, ['verify'])

    p.stdout.on('data', (data) => {
      console.log(`stdout: ${data}`)
    })

    p.stderr.on('data', (data) => {
      console.log(`stderr: ${data}`)
    })

    p.on('close', (code) => {
      console.log(`child process exited with code ${code}`)
    })
  }
})

ipc.on('version', function (event, arg) {
  if (global.serverConfig.useSails) {

  } else {
    console.log('Not using Sails. Neo-One version directly from Electron.')

    const p = spawn(neoone.serverPath, ['version'])

    p.stdout.on('data', (data) => {
      console.log(`stdout: ${data}`)
    })

    p.stderr.on('data', (data) => {
      console.log(`stderr: ${data}`)
    })

    p.on('close', (code) => {
      console.log(`child process exited with code ${code}`)
    })
  }
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
    isPackaged: isPackaged
  }

  console.log('systemConfig is ' + util.inspect(systemConfig, {depth: null}))

  return systemConfig
}
