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
                      'quickstart',
                      'quickstop'
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
  // TODO add options to save a network with a name and access from saved networks later
  // For now the network, data, wallet, and blocks are all cleared by default each quickstart
  console.log('Quickstarting a Neo One instance.')
  startServer(null, null, () => {
    createNetwork(null, null, () => {
      startNetwork(null, null, () => {
        createWallet(null, null, () => {
          createNeotracker(null, null, () => {
            startNeotracker()
          })
        })
      })
    })
  })
  // createNeotracker()
}

function quickstop (event, arg) {
  console.log('Quickstopping a Neo One instance.')
  stopServer()
}

function startServer (event, arg, callback) {
  // TODO verify if we shouldn't allow multiple server instances, until then do debounce:
  setTimeout(() => {
    if (neoOne.serverPID) return

    console.log('startServer(): ' + neoOne.serverPath + ' init')

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
      if (callback) callback()
    })
  }, functionDebounce)
}

function stopServer (event, arg, callback) {
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
      if (callback) callback()
    })
  }, functionDebounce)
}

function createNeotracker (event, arg, callback) {
  setTimeout(() => {
    if (!arg) {
      // TODO code a name generator for networks, wallets, etc
      arg = {
        wallet: 'halite', network: 'halite', neotracker: 'halite'
      }
    }

    const p = spawn(neoOne.serverPath, ['create', 'neotracker', arg.neotracker, '--network', arg.network])

    console.log('createNeotracker(): ' + neoOne.serverPath + ' create neotracker ' + arg.neotracker + ' --network ' + arg.network)

    p.stdout.on('data', (data) => {
      console.log(`stdout: ${data}`)
    })

    p.stderr.on('data', (data) => {
      console.log(`stderr: ${data}`)
    })

    p.on('close', (code) => {
      console.log(`child process exited with code ${code}`)
      if (callback) callback()
    })
  }, functionDebounce)
}

function deleteNeotracker (event, arg, callback) {
  setTimeout(() => {
    if (!arg) {
      // TODO code a name generator for networks, wallets, etc
      arg = {
        wallet: 'halite', network: 'halite', neotracker: 'halite'
      }
    }

    const p = spawn(neoOne.serverPath, ['delete', 'neotracker', arg.neotracker])

    console.log('deleteNeotracker(): ' + neoOne.serverPath + ' delete neotracker ' + arg.neotracker)

    p.stdout.on('data', (data) => {
      console.log(`stdout: ${data}`)
    })

    p.stderr.on('data', (data) => {
      console.log(`stderr: ${data}`)
    })

    p.on('close', (code) => {
      console.log(`child process exited with code ${code}`)
      if (callback) callback()
    })
  }, functionDebounce)
}

function describeNeotracker (event, arg, callback) {
  setTimeout(() => {
    if (!arg) {
      // TODO code a name generator for networks, wallets, etc
      arg = {
        wallet: 'halite', network: 'halite', neotracker: 'halite'
      }
    }

    const p = spawn(neoOne.serverPath, ['describe', 'neotracker', arg.neotracker])

    console.log('describeNeotracker(): ' + neoOne.serverPath + ' describe neotracker ' + arg.neotracker)

    p.stdout.on('data', (data) => {
      console.log(`stdout: ${data}`)
    })

    p.stderr.on('data', (data) => {
      console.log(`stderr: ${data}`)
    })

    p.on('close', (code) => {
      console.log(`child process exited with code ${code}`)
      if (callback) callback()
    })
  }, functionDebounce)
}

function getNeotracker (event, arg, callback) {
  setTimeout(() => {
    if (!arg) {
      // TODO code a name generator for networks, wallets, etc
      arg = {
        wallet: 'halite', network: 'halite', neotracker: 'halite'
      }
    }

    const p = spawn(neoOne.serverPath, ['get', 'neotracker', arg.neotracker])

    console.log('getNeotracker(): ' + neoOne.serverPath + ' get neotracker ' + arg.neotracker)

    p.stdout.on('data', (data) => {
      console.log(`stdout: ${data}`)
    })

    p.stderr.on('data', (data) => {
      console.log(`stderr: ${data}`)
    })

    p.on('close', (code) => {
      console.log(`child process exited with code ${code}`)
      if (callback) callback()
    })
  }, functionDebounce)
}

function startNeotracker (event, arg, callback) {
  setTimeout(() => {
    if (!arg) {
      // TODO code a name generator for networks, wallets, etc
      arg = {
        wallet: 'halite', network: 'halite', neotracker: 'halite'
      }
    }

    const p = spawn(neoOne.serverPath, ['start', 'neotracker', arg.neotracker, '--network', arg.network])

    console.log('startNeotracker(): ' + neoOne.serverPath + ' start neotracker ' + arg.neotracker + ' --network ' + arg.network)

    p.stdout.on('data', (data) => {
      console.log(`stdout: ${data}`)
    })

    p.stderr.on('data', (data) => {
      console.log(`stderr: ${data}`)
    })

    p.on('close', (code) => {
      console.log(`child process exited with code ${code}`)
      if (callback) callback()
    })
  }, functionDebounce)
}

function stopNeotracker (event, arg, callback) {
  setTimeout(() => {
    if (!arg) {
      // TODO code a name generator for networks, wallets, etc
      arg = {
        wallet: 'halite', network: 'halite', neotracker: 'halite'
      }
    }

    const p = spawn(neoOne.serverPath, ['stop', 'neotracker', arg.neotracker, '--network', arg.network])

    console.log('stopNeotracker(): ' + neoOne.serverPath + ' stop neotracker ' + arg.neotracker + ' --network ' + arg.network)

    p.stdout.on('data', (data) => {
      console.log(`stdout: ${data}`)
    })

    p.stderr.on('data', (data) => {
      console.log(`stderr: ${data}`)
    })

    p.on('close', (code) => {
      console.log(`child process exited with code ${code}`)
      if (callback) callback()
    })
  }, functionDebounce)
}

function activateNetwork (event, arg, callback) {
  setTimeout(() => {
    if (!arg) {
      // TODO code a name generator for networks, wallets, etc
      arg = {
        wallet: 'halite', network: 'halite', neotracker: 'halite'
      }
    }

    const p = spawn(neoOne.serverPath, ['activate', 'network', arg.network])

    console.log('activateNetwork(): ' + neoOne.serverPath + ' activate network ' + arg.network)

    p.stdout.on('data', (data) => {
      console.log(`stdout: ${data}`)
    })

    p.stderr.on('data', (data) => {
      console.log(`stderr: ${data}`)
    })

    p.on('close', (code) => {
      console.log(`child process exited with code ${code}`)
      if (callback) callback()
    })
  }, functionDebounce)
}

function createNetwork (event, arg, callback) {
  setTimeout(() => {
    if (!arg) {
      // TODO code a name generator for networks, wallets, etc
      arg = {
        wallet: 'halite', network: 'halite', neotracker: 'halite'

      }
    }

    const p = spawn(neoOne.serverPath, ['create', 'network', arg.network])

    console.log('createNetwork(): ' + neoOne.serverPath + ' create network ' + arg.network)

    p.stdout.on('data', (data) => {
      console.log(`stdout: ${data}`)
    })

    p.stderr.on('data', (data) => {
      console.log(`stderr: ${data}`)
    })

    p.on('close', (code) => {
      console.log(`child process exited with code ${code}`)
      if (callback) callback()
    })
  }, functionDebounce)
}

function deactivateNetwork (event, arg, callback) {
  setTimeout(() => {
    if (!arg) {
      // TODO code a name generator for networks, wallets, etc
      arg = {
        wallet: 'halite', network: 'halite', neotracker: 'halite'

      }
    }

    const p = spawn(neoOne.serverPath, ['deactivate', 'network', arg.network])

    console.log('deactivateNetwork(): ' + neoOne.serverPath + ' deactivate network ' + arg.network)

    p.stdout.on('data', (data) => {
      console.log(`stdout: ${data}`)
    })

    p.stderr.on('data', (data) => {
      console.log(`stderr: ${data}`)
    })

    p.on('close', (code) => {
      console.log(`child process exited with code ${code}`)
      if (callback) callback()
    })
  }, functionDebounce)
}

function deleteNetwork (event, arg, callback) {
  setTimeout(() => {
    if (!arg) {
      // TODO code a name generator for networks, wallets, etc
      arg = {
        wallet: 'halite', network: 'halite', neotracker: 'halite'

      }
    }

    const p = spawn(neoOne.serverPath, ['delete', 'network', arg.network])

    console.log('deleteNetwork(): ' + neoOne.serverPath + ' delete network ' + arg.network)

    p.stdout.on('data', (data) => {
      console.log(`stdout: ${data}`)
    })

    p.stderr.on('data', (data) => {
      console.log(`stderr: ${data}`)
    })

    p.on('close', (code) => {
      console.log(`child process exited with code ${code}`)
      if (callback) callback()
    })
  }, functionDebounce)
}

function describeNetwork (event, arg, callback) {
  setTimeout(() => {
    if (!arg) {
      // TODO code a name generator for networks, wallets, etc
      arg = {
        wallet: 'halite', network: 'halite', neotracker: 'halite'

      }
    }

    const p = spawn(neoOne.serverPath, ['describe', 'network', arg.network])

    console.log('describeNetwork(): ' + neoOne.serverPath + ' describe network ' + arg.network)

    p.stdout.on('data', (data) => {
      console.log(`stdout: ${data}`)
    })

    p.stderr.on('data', (data) => {
      console.log(`stderr: ${data}`)
    })

    p.on('close', (code) => {
      console.log(`child process exited with code ${code}`)
      if (callback) callback()
    })
  }, functionDebounce)
}

function getNetwork (event, arg, callback) {
  setTimeout(() => {
    if (!arg) {
      // TODO code a name generator for networks, wallets, etc
      arg = {
        wallet: 'halite', network: 'halite', neotracker: 'halite'

      }
    }

    const p = spawn(neoOne.serverPath, ['get', 'network', arg.network])

    console.log('getNetwork(): ' + neoOne.serverPath + ' get network ' + arg.network)

    p.stdout.on('data', (data) => {
      console.log(`stdout: ${data}`)
    })

    p.stderr.on('data', (data) => {
      console.log(`stderr: ${data}`)
    })

    p.on('close', (code) => {
      console.log(`child process exited with code ${code}`)
      if (callback) callback()
    })
  }, functionDebounce)
}

function startNetwork (event, arg, callback) {
  setTimeout(() => {
    if (!arg) {
      // TODO code a name generator for networks, wallets, etc
      arg = {
        wallet: 'halite', network: 'halite', neotracker: 'halite'

      }
    }

    const p = spawn(neoOne.serverPath, ['start', 'network', arg.network])

    console.log('startNetwork(): ' + neoOne.serverPath + ' start network ' + arg.network)

    p.stdout.on('data', (data) => {
      console.log(`stdout: ${data}`)
    })

    p.stderr.on('data', (data) => {
      console.log(`stderr: ${data}`)
    })

    p.on('close', (code) => {
      console.log(`child process exited with code ${code}`)
      if (callback) callback()
    })
  }, functionDebounce)
}

function stopNetwork (event, arg, callback) {
 setTimeout(() => {
   if (!arg) {
     // TODO code a name generator for networks, wallets, etc
     arg = {
       wallet: 'halite', network: 'halite', neotracker: 'halite'

     }
   }

   const p = spawn(neoOne.serverPath, ['stop', 'network', arg.network])

   console.log('stopNetwork(): ' + neoOne.serverPath + ' stop network ' + arg.network)

   p.stdout.on('data', (data) => {
     console.log(`stdout: ${data}`)
   })

   p.stderr.on('data', (data) => {
     console.log(`stderr: ${data}`)
   })

   p.on('close', (code) => {
     console.log(`child process exited with code ${code}`)
     if (callback) callback()
   })
 }, functionDebounce)
}

function activateWallet (event, arg, callback) {
  setTimeout(() => {
    if (!arg) {
      // TODO code a name generator for networks, wallets, etc
      arg = {
        wallet: 'halite', network: 'halite', neotracker: 'halite'

      }
    }
    const p = spawn(neoOne.serverPath, ['activate', 'wallet', arg.wallet, '--network', arg.network])

    console.log('activateWallet(): ' + neoOne.serverPath + ' activate wallet ' + arg.wallet + ' --network ' + arg.network)

    p.stdout.on('data', (data) => {
      console.log(`stdout: ${data}`)
    })

    p.stderr.on('data', (data) => {
      console.log(`stderr: ${data}`)
    })

    p.on('close', (code) => {
      console.log(`child process exited with code ${code}`)
      if (callback) callback()
    })
  }, functionDebounce)
}

function createWallet (event, arg, callback) {
  setTimeout(() => {
    if (!arg) {
      // TODO code a name generator for networks, wallets, etc
      arg = {
        wallet: 'halite', network: 'halite', neotracker: 'halite'

      }
    }

    const p = spawn(neoOne.serverPath, ['create', 'wallet', arg.wallet, '--network', arg.network])

    console.log('createWallet(): ' + neoOne.serverPath + ' create wallet ' + arg.wallet + ' --network ' + arg.network)

    p.stdout.on('data', (data) => {
      console.log(`stdout: ${data}`)
    })

    p.stderr.on('data', (data) => {
      console.log(`stderr: ${data}`)
    })

    p.on('close', (code) => {
      console.log(`child process exited with code ${code}`)
      if (callback) callback()
    })
  }, functionDebounce)
}

function deactivateWallet (event, arg, callback) {
  setTimeout(() => {
    if (!arg) {
      // TODO code a name generator for networks, wallets, etc
      arg = {
        wallet: 'halite', network: 'halite', neotracker: 'halite'
      }
    }

    const p = spawn(neoOne.serverPath, ['deactivate', 'wallet', arg.wallet, '--network', arg.network])

    console.log('deactivateWallet(): ' + neoOne.serverPath + ' deactivate wallet ' + arg.wallet + ' --network ' + arg.network)

    p.stdout.on('data', (data) => {
      console.log(`stdout: ${data}`)
    })

    p.stderr.on('data', (data) => {
      console.log(`stderr: ${data}`)
    })

    p.on('close', (code) => {
      console.log(`child process exited with code ${code}`)
      if (callback) callback()
    })
  }, functionDebounce)
}

function deleteWallet (event, arg, callback) {
  setTimeout(() => {
    if (!arg) {
      // TODO code a name generator for networks, wallets, etc
      arg = {
        wallet: 'halite', network: 'halite', neotracker: 'halite'

      }
    }

    const p = spawn(neoOne.serverPath, ['delete', 'wallet', arg.wallet, '--network', arg.network])

    console.log('deleteWallet(): ' + neoOne.serverPath + ' delete wallet ' + arg.wallet + ' --network ' + arg.network)

    p.stdout.on('data', (data) => {
      console.log(`stdout: ${data}`)
    })

    p.stderr.on('data', (data) => {
      console.log(`stderr: ${data}`)
    })

    p.on('close', (code) => {
      console.log(`child process exited with code ${code}`)
      if (callback) callback()
    })
  }, functionDebounce)
}

function describeWallet (event, arg, callback) {
  setTimeout(() => {
    if (!arg) {
      // TODO code a name generator for networks, wallets, etc
      arg = {
        wallet: 'halite', network: 'halite', neotracker: 'halite'

      }
    }

    const p = spawn(neoOne.serverPath, ['describe', 'wallet', arg.wallet, '--network', arg.network])

    console.log('describeWallet(): ' + neoOne.serverPath + ' describe wallet ' + arg.wallet + ' --network ' + arg.network)

    p.stdout.on('data', (data) => {
      console.log(`stdout: ${data}`)
    })

    p.stderr.on('data', (data) => {
      console.log(`stderr: ${data}`)
    })

    p.on('close', (code) => {
      console.log(`child process exited with code ${code}`)
      if (callback) callback()
    })
  }, functionDebounce)
}

function getWallet (event, arg, callback) {
  setTimeout(() => {
    if (!arg) {
      // TODO code a name generator for networks, wallets, etc
      arg = {
        wallet: 'halite', network: 'halite', neotracker: 'halite'

      }
    }

    const p = spawn(neoOne.serverPath, ['get', 'wallet', arg.wallet, '--network', arg.network])

    console.log('getWallet(): ' + neoOne.serverPath + ' get wallet ' + arg.wallet + ' --network ' + arg.network)

    p.stdout.on('data', (data) => {
      console.log(`stdout: ${data}`)
    })

    p.stderr.on('data', (data) => {
      console.log(`stderr: ${data}`)
    })

    p.on('close', (code) => {
      console.log(`child process exited with code ${code}`)
      if (callback) callback()
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
