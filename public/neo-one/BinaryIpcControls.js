// Control neo-one with electron ipc

const { spawn } = require('child_process')
const ipc = require('electron').ipcMain

let neoOneCommands = ['startServer',
                      'stopServer',
                      'createNeotracker',
                      'deleteNeotracker',
                      'describeNeotracker',
                      'getNeotracker',
                      'startNeotracker',
                      'stopNeotracker',
                      'activateNetwork',
                      'createNetwork',
                      'deactivateNetwork',
                      'deleteNetwork',
                      'describeNetwork',
                      'getNetwork',
                      'startNetwork',
                      'stopNetwork',
                      'activateWallet',
                      'createWallet',
                      'deactivateWallet',
                      'deleteWallet',
                      'describeWallet',
                      'getWallet',
                      'bootstrap',
                      'build',
                      'init',
                      'verify',
                      'version',
                      'quickstart'
                    ]

// Quickstart should automatically fill in network names

// Create a new Network with 'name'
// neo-one create network name

// List Wallets for Network 'name'
// neo-one get wallet --network name

// Get private key from Wallet
// neo-one describe wallet --network networkName walletNameq

// Create Neotracker block explorer with 'name' on network 'name'
// neo-one create neotracker trackerName --network netName

let neoOneFullCommandSequence = [ 'startServer',
                                  'createNetwork',
                                  'createNeotracker',
                               ]

let neoOneQuickstartCommandSequence = [ 'startServer',
                                  'createNetwork',
                                  'createNeotracker',
                               ]

const functionDebounce = 1000

let neoOne = {}

exports.addIpcListeners = function (global, neoone) {

  console.log('Adding all IPC listeners for main process control of neo-one.')

  neoOne = neoone

  ipc.on('quickstart', quickstart)
  ipc.on('quickstop', quickstop)
  ipc.on('startServer', startServer)
  ipc.on('stopServer', stopServer)
  ipc.on('createNeotracker', createNeotracker)
  ipc.on('deleteNeotracker', deleteNeotracker)
  ipc.on('describeNeotracker', describeNeotracker)
  ipc.on('getNeotracker', getNeotracker)
  ipc.on('startNeotracker', startNeotracker)
  ipc.on('stopNeotracker', stopNeotracker)
  ipc.on('activateNetwork', activateNetwork)
  ipc.on('createNetwork', createNetwork)
  ipc.on('deactivateNetwork', deactivateNetwork)
  ipc.on('deleteNetwork', deleteNetwork)
  ipc.on('describeNetwork', describeNetwork)
  ipc.on('getNetwork', getNetwork)
  ipc.on('startNetwork', startNetwork)
  ipc.on('stopNetwork', stopNetwork)
  ipc.on('activateWallet', activateWallet)
  ipc.on('createWallet', createWallet)
  ipc.on('deactivateWallet', deactivateWallet)
  ipc.on('deleteWallet', deleteWallet)
  ipc.on('describeWallet', describeWallet)
  ipc.on('getWallet', getWallet)
  ipc.on('bootstrap', bootstrap)
  ipc.on('build', build)
  ipc.on('init', init)
  ipc.on('verify', verify)
  ipc.on('version', version)
}

exports.removeIpcListeners = function () {
  neoOneCommands.forEach((command) => {
    console.log('removing IPC listener: '+command)
    ipc.removeAllListeners(command)
  })
}

exports.stopAll = function () {

}


function quickstart (event, arg) {
  // TODO verify if we shouldn't allow multiple server instances, until then do debounce:
  setTimeout(() => {
    if (neoOne.serverPID) return

    const p = spawn(neoOne.serverPath, ['init'])

    p.stdout.on('data', (data) => {
      console.log(`stdout: ${data}`)
    })

    p.stderr.on('data', (data) => {
      console.log(`stderr: ${data}`)

      const regex = /.*\(pid=([0-9].*)\)\n/
      const found = data.toString().replace(regex, '$1')
      console.log(`found ${found}`)
      neoOne.serverPID = found
    })

    p.on('close', (code) => {
      console.log(`child process exited with code ${code}`)
    })
  }, functionDebounce)
}

function quickstop (event, arg) {
  // TODO verify if we shouldn't allow multiple server instances, until then do debounce:
  setTimeout(() => {
    if (neoOne.serverPID) return

    const p = spawn(neoOne.serverPath, ['init'])

    p.stdout.on('data', (data) => {
      console.log(`stdout: ${data}`)
    })

    p.stderr.on('data', (data) => {
      console.log(`stderr: ${data}`)

      const regex = /.*\(pid=([0-9].*)\)\n/
      const found = data.toString().replace(regex, '$1')
      console.log(`found ${found}`)
      neoOne.serverPID = found
    })

    p.on('close', (code) => {
      console.log(`child process exited with code ${code}`)
    })
  }, functionDebounce)
}

function startServer (event, arg) {
  // TODO verify if we shouldn't allow multiple server instances, until then do debounce:
  setTimeout(() => {
    if (neoOne.serverPID) return

    const p = spawn(neoOne.serverPath, ['init'])

    p.stdout.on('data', (data) => {
      console.log(`stdout: ${data}`)
    })

    p.stderr.on('data', (data) => {
      console.log(`stderr: ${data}`)

      const regex = /.*\(pid=([0-9].*)\)\n/
      const found = data.toString().replace(regex, '$1')
      console.log(`found ${found}`)
      neoOne.serverPID = found
    })

    p.on('close', (code) => {
      console.log(`child process exited with code ${code}`)
    })
  }, functionDebounce)
}

function stopServer (event, arg) {
  setTimeout(() => {
    if (neoOne.serverPID === undefined) return

    const pid = neoOne.serverPID

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

      if (code === 0) neoOne.serverPID = undefined
    })
  }, functionDebounce)
}

function createNeotracker (event, arg) {
  setTimeout(() => {
    const p = spawn(neoOne.serverPath, ['create', 'neotracker', arg])

    p.stdout.on('data', (data) => {
      console.log(`stdout: ${data}`)
    })

    p.stderr.on('data', (data) => {
      console.log(`stderr: ${data}`)
    })

    p.on('close', (code) => {
      console.log(`child process exited with code ${code}`)
    })
  }, functionDebounce)
}

function deleteNeotracker (event, arg) {
  setTimeout(() => {
    const p = spawn(neoOne.serverPath, ['delete', 'neotracker', arg])

    p.stdout.on('data', (data) => {
      console.log(`stdout: ${data}`)
    })

    p.stderr.on('data', (data) => {
      console.log(`stderr: ${data}`)
    })

    p.on('close', (code) => {
      console.log(`child process exited with code ${code}`)
    })
  }, functionDebounce)
}

function describeNeotracker (event, arg) {
  setTimeout(() => {
    const p = spawn(neoOne.serverPath, ['describe', 'neotracker', arg])

    p.stdout.on('data', (data) => {
      console.log(`stdout: ${data}`)
    })

    p.stderr.on('data', (data) => {
      console.log(`stderr: ${data}`)
    })

    p.on('close', (code) => {
      console.log(`child process exited with code ${code}`)
    })
  }, functionDebounce)
}

function getNeotracker (event, arg) {
  setTimeout(() => {
    const p = spawn(neoOne.serverPath, ['get', 'neotracker'])

    p.stdout.on('data', (data) => {
      console.log(`stdout: ${data}`)
    })

    p.stderr.on('data', (data) => {
      console.log(`stderr: ${data}`)
    })

    p.on('close', (code) => {
      console.log(`child process exited with code ${code}`)
    })
  }, functionDebounce)
}

function startNeotracker (event, arg) {
  setTimeout(() => {
    const p = spawn(neoOne.serverPath, ['start', 'neotracker', arg])

    p.stdout.on('data', (data) => {
      console.log(`stdout: ${data}`)
    })

    p.stderr.on('data', (data) => {
      console.log(`stderr: ${data}`)
    })

    p.on('close', (code) => {
      console.log(`child process exited with code ${code}`)
    })
  }, functionDebounce)
}

function stopNeotracker (event, arg) {
  setTimeout(() => {
    const p = spawn(neoOne.serverPath, ['stop', 'neotracker', arg])

    p.stdout.on('data', (data) => {
      console.log(`stdout: ${data}`)
    })

    p.stderr.on('data', (data) => {
      console.log(`stderr: ${data}`)
    })

    p.on('close', (code) => {
      console.log(`child process exited with code ${code}`)
    })
  }, functionDebounce)
}

function activateNetwork (event, arg) {
  setTimeout(() => {
    const p = spawn(neoOne.serverPath, ['activate', 'network', arg])

    p.stdout.on('data', (data) => {
      console.log(`stdout: ${data}`)
    })

    p.stderr.on('data', (data) => {
      console.log(`stderr: ${data}`)
    })

    p.on('close', (code) => {
      console.log(`child process exited with code ${code}`)
    })
  }, functionDebounce)
}

function createNetwork (event, arg) {
  setTimeout(() => {
    const p = spawn(neoOne.serverPath, ['create', 'network', arg])

    p.stdout.on('data', (data) => {
      console.log(`stdout: ${data}`)
    })

    p.stderr.on('data', (data) => {
      console.log(`stderr: ${data}`)
    })

    p.on('close', (code) => {
      console.log(`child process exited with code ${code}`)
    })
  }, functionDebounce)
}

function deactivateNetwork (event, arg) {
  setTimeout(() => {
    const p = spawn(neoOne.serverPath, ['deactivate', 'network', arg])

    p.stdout.on('data', (data) => {
      console.log(`stdout: ${data}`)
    })

    p.stderr.on('data', (data) => {
      console.log(`stderr: ${data}`)
    })

    p.on('close', (code) => {
      console.log(`child process exited with code ${code}`)
    })
  }, functionDebounce)
}

function deleteNetwork (event, arg) {
  setTimeout(() => {
    const p = spawn(neoOne.serverPath, ['delete', 'network', arg])

    p.stdout.on('data', (data) => {
      console.log(`stdout: ${data}`)
    })

    p.stderr.on('data', (data) => {
      console.log(`stderr: ${data}`)
    })

    p.on('close', (code) => {
      console.log(`child process exited with code ${code}`)
    })
  }, functionDebounce)
}

function describeNetwork (event, arg) {
  setTimeout(() => {
    const p = spawn(neoOne.serverPath, ['describe', 'network', arg])

    p.stdout.on('data', (data) => {
      console.log(`stdout: ${data}`)
    })

    p.stderr.on('data', (data) => {
      console.log(`stderr: ${data}`)
    })

    p.on('close', (code) => {
      console.log(`child process exited with code ${code}`)
    })
  }, functionDebounce)
}

function getNetwork (event, arg) {
  setTimeout(() => {
    const p = spawn(neoOne.serverPath, ['get', 'network'])

    p.stdout.on('data', (data) => {
      console.log(`stdout: ${data}`)
    })

    p.stderr.on('data', (data) => {
      console.log(`stderr: ${data}`)
    })

    p.on('close', (code) => {
      console.log(`child process exited with code ${code}`)
    })
  }, functionDebounce)
}

function startNetwork (event, arg) {
  setTimeout(() => {
    const p = spawn(neoOne.serverPath, ['start', 'network', arg])

    p.stdout.on('data', (data) => {
      console.log(`stdout: ${data}`)
    })

    p.stderr.on('data', (data) => {
      console.log(`stderr: ${data}`)
    })

    p.on('close', (code) => {
      console.log(`child process exited with code ${code}`)
    })
  }, functionDebounce)
}

function stopNetwork (event, arg) {
 setTimeout(() => {
   const p = spawn(neoOne.serverPath, ['stop', 'network', arg])

   p.stdout.on('data', (data) => {
     console.log(`stdout: ${data}`)
   })

   p.stderr.on('data', (data) => {
     console.log(`stderr: ${data}`)
   })

   p.on('close', (code) => {
     console.log(`child process exited with code ${code}`)
   })
 }, functionDebounce)
}

function activateWallet (event, arg) {
  setTimeout(() => {
    const p = spawn(neoOne.serverPath, ['activate', 'wallet', arg])

    p.stdout.on('data', (data) => {
      console.log(`stdout: ${data}`)
    })

    p.stderr.on('data', (data) => {
      console.log(`stderr: ${data}`)
    })

    p.on('close', (code) => {
      console.log(`child process exited with code ${code}`)
    })
  }, functionDebounce)
}

function createWallet (event, arg) {
  setTimeout(() => {
    const p = spawn(neoOne.serverPath, ['create', 'wallet', arg])

    p.stdout.on('data', (data) => {
      console.log(`stdout: ${data}`)
    })

    p.stderr.on('data', (data) => {
      console.log(`stderr: ${data}`)
    })

    p.on('close', (code) => {
      console.log(`child process exited with code ${code}`)
    })
  }, functionDebounce)
}

function deactivateWallet (event, arg) {
  setTimeout(() => {
    const p = spawn(neoOne.serverPath, ['deactivate', 'wallet', arg])

    p.stdout.on('data', (data) => {
      console.log(`stdout: ${data}`)
    })

    p.stderr.on('data', (data) => {
      console.log(`stderr: ${data}`)
    })

    p.on('close', (code) => {
      console.log(`child process exited with code ${code}`)
    })
  }, functionDebounce)
}

function deleteWallet (event, arg) {
  setTimeout(() => {
    const p = spawn(neoOne.serverPath, ['delete', 'wallet', arg])

    p.stdout.on('data', (data) => {
      console.log(`stdout: ${data}`)
    })

    p.stderr.on('data', (data) => {
      console.log(`stderr: ${data}`)
    })

    p.on('close', (code) => {
      console.log(`child process exited with code ${code}`)
    })
  }, functionDebounce)
}

function describeWallet (event, arg) {
  setTimeout(() => {
    const p = spawn(neoOne.serverPath, ['describe', 'wallet', arg])

    p.stdout.on('data', (data) => {
      console.log(`stdout: ${data}`)
    })

    p.stderr.on('data', (data) => {
      console.log(`stderr: ${data}`)
    })

    p.on('close', (code) => {
      console.log(`child process exited with code ${code}`)
    })
  }, functionDebounce)
}

function getWallet (event, arg) {
  setTimeout(() => {
    const p = spawn(neoOne.serverPath, ['get', 'wallet'])

    p.stdout.on('data', (data) => {
      console.log(`stdout: ${data}`)
    })

    p.stderr.on('data', (data) => {
      console.log(`stderr: ${data}`)
    })

    p.on('close', (code) => {
      console.log(`child process exited with code ${code}`)
    })
  }, functionDebounce)
}

function bootstrap (event, arg) {
  setTimeout(() => {
    const p = spawn(neoOne.serverPath, ['bootstrap'])

    p.stdout.on('data', (data) => {
      console.log(`stdout: ${data}`)
    })

    p.stderr.on('data', (data) => {
      console.log(`stderr: ${data}`)
    })

    p.on('close', (code) => {
      console.log(`child process exited with code ${code}`)
    })
  }, functionDebounce)
}

function build (event, arg) {
  setTimeout(() => {
    const p = spawn(neoOne.serverPath, ['build'])

    p.stdout.on('data', (data) => {
      console.log(`stdout: ${data}`)
    })

    p.stderr.on('data', (data) => {
      console.log(`stderr: ${data}`)
    })

    p.on('close', (code) => {
      console.log(`child process exited with code ${code}`)
    })
  }, functionDebounce)
}

function init (event, arg) {
  setTimeout(() => {
    const p = spawn(neoOne.serverPath, ['init'])

    p.stdout.on('data', (data) => {
      console.log(`stdout: ${data}`)
    })

    p.stderr.on('data', (data) => {
      console.log(`stderr: ${data}`)
    })

    p.on('close', (code) => {
      console.log(`child process exited with code ${code}`)
    })
  }, functionDebounce)
}

function verify (event, arg) {
  setTimeout(() => {
    const p = spawn(neoOne.serverPath, ['verify'])

    p.stdout.on('data', (data) => {
     console.log(`stdout: ${data}`)
    })

    p.stderr.on('data', (data) => {
     console.log(`stderr: ${data}`)
    })

    p.on('close', (code) => {
     console.log(`child process exited with code ${code}`)
    })
  }, functionDebounce)
}

function version (event, arg) {
  setTimeout(() => {
    const p = spawn(neoOne.serverPath, ['version'])

    p.stdout.on('data', (data) => {
      console.log(`stdout: ${data}`)
    })

    p.stderr.on('data', (data) => {
      console.log(`stderr: ${data}`)
    })

    p.on('close', (code) => {
      console.log(`child process exited with code ${code}`)
    })
  }, functionDebounce)
}
