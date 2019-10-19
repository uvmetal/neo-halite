// Control neo-one with electron ipc

const { spawn } = require('child_process')
const ipc = require('electron').ipcMain

let neoOneCommands = ['start-server',
                      'stop-server',
                      'create-neotracker',
                      'delete-neotracker',
                      'describe-neotracker',
                      'get-neotracker',
                      'start-neotracker',
                      'stop-neotracker',
                      'activate-network',
                      'create-network',
                      'deactivate-network',
                      'delete-network',
                      'describe-network',
                      'get-network',
                      'start-network',
                      'stop-network',
                      'activate-wallet',
                      'create-wallet',
                      'deactivate-wallet',
                      'delete-wallet',
                      'describe-wallet',
                      'get-wallet',
                      'bootstrap',
                      'build',
                      'init',
                      'verify',
                      'version'
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

let neoOneFullCommandSequence = [ 'start-server',
                                  'create-network',
                                  'create-neotracker',
                               ]

const functionDebounce = 1000

exports.addIpcListeners = function (global, neoone) {

  console.log('Adding all IPC listeners for main process control of neo-one.')

  ipc.on('start-server', function (event, arg) {

    // TODO verify if we shouldn't allow multiple server instances, until then do debounce:
    setTimeout(() => {
      if (neoone.serverPID) return

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
    }, functionDebounce)
  })

  ipc.on('stop-server', function (event, arg) {
    setTimeout(() => {
      if (neoone.serverPID === undefined) return

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

        if (code === 0) neoone.serverPID = undefined
      })
    }, functionDebounce)
  })

  ipc.on('create-neotracker', function (event, arg) {
    setTimeout(() => {
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
    }, functionDebounce)
  })

  ipc.on('delete-neotracker', function (event, arg) {
    setTimeout(() => {
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
    }, functionDebounce)
  })

  ipc.on('describe-neotracker', function (event, arg) {
    setTimeout(() => {
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
    }, functionDebounce)
  })

  ipc.on('get-neotracker', function (event, arg) {
    setTimeout(() => {
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
    }, functionDebounce)
  })

  ipc.on('start-neotracker', function (event, arg) {
    setTimeout(() => {
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
    }, functionDebounce)
  })

  ipc.on('stop-neotracker', function (event, arg) {
    setTimeout(() => {
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
    }, functionDebounce)
  })

  ipc.on('activate-network', function (event, arg) {
    setTimeout(() => {
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
    }, functionDebounce)
  })

  ipc.on('create-network', function (event, arg) {
    setTimeout(() => {
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
    }, functionDebounce)
  })

  ipc.on('deactivate-network', function (event, arg) {
    setTimeout(() => {
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
    }, functionDebounce)
  })

  ipc.on('delete-network', function (event, arg) {
    setTimeout(() => {
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
    }, functionDebounce)
  })

  ipc.on('describe-network', function (event, arg) {
    setTimeout(() => {
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
    }, functionDebounce)
  })

  ipc.on('get-network', function (event, arg) {
    setTimeout(() => {
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
    }, functionDebounce)
  })

  ipc.on('start-network', function (event, arg) {
    setTimeout(() => {
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
    }, functionDebounce)
  })

  ipc.on('stop-network', function (event, arg) {
    setTimeout(() => {
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
    }, functionDebounce)
  })

  ipc.on('activate-wallet', function (event, arg) {
    setTimeout(() => {
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
    }, functionDebounce)
  })

  ipc.on('create-wallet', function (event, arg) {
    setTimeout(() => {
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
    }, functionDebounce)
  })

  ipc.on('deactivate-wallet', function (event, arg) {
    setTimeout(() => {
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
    }, functionDebounce)
  })

  ipc.on('delete-wallet', function (event, arg) {
    setTimeout(() => {
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
    }, functionDebounce)
  })

  ipc.on('describe-wallet', function (event, arg) {
    setTimeout(() => {
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
    }, functionDebounce)
  })

  ipc.on('get-wallet', function (event, arg) {
    setTimeout(() => {
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
    }, functionDebounce)
  })

  ipc.on('bootstrap', function (event, arg) {
    setTimeout(() => {
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
    }, functionDebounce)
  })

  ipc.on('build', function (event, arg) {
    setTimeout(() => {
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
    }, functionDebounce)
  })

  ipc.on('init', function (event, arg) {
    setTimeout(() => {
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
    }, functionDebounce)
  })

  ipc.on('verify', function (event, arg) {
    setTimeout(() => {
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
    }, functionDebounce)
  })

  ipc.on('version', function (event, arg) {
    setTimeout(() => {
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
    }, functionDebounce)
  })
}

exports.removeIpcListeners = function () {
  neoOneCommands.forEach((command) => {
    console.log('removing IPC listener: '+command)
    ipc.removeAllListeners(command)
  })
}

exports.stopAll = function () {

}
