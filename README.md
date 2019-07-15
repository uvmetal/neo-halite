
# Hive

![honeycomb](images/honecomb.png)

Welcome to the Hive. Neo Hive is a suite of tools designed to make the Neo Smart Economy easier to use. Get started fast using the Hive.

  * Rest, RPC, and Desktop Control Surfaces
  * One-click Private Net
  * One-click Deployment
  * Multi-user Options - Join or build a collective. Hi, honey, you're home.
  * Orchestration

# Honeycomb

The hive is made up of many moving parts, but we only want you to worry about one. Honeycomb is your portal into the Hive complex. Control everything from the golden comfort of your home in Honeycomb.

# Plan

Neo Hive - Private Net Orchestration System Draft v1 based on concept codename Neodymium.

# Neodymium City of Zion Project Requirements
New:
[Project Goals](./docs/ProjectGoals.md)

Original:
https://gist.github.com/hal0x2328/7c95e58ebbb27091790b153160763fad


# Build strict Neo Hive Orchestration requirements
* Determine additional modules for control, if needed, and if rpc can run everything alone
  * Integrate RPC control module into Neo-Black
  * Integrate command line control module into Neo-Black (if needed)


# Build Presentation Framework (front end)

  Currently running:
  * electron
  * react
  * redux
  * webpack

# Build Server Framework

Sailsjs is used on the backend to facilitate everything necessary for Neo privatenet abstraction: database, REST, RPC, and core node network.

* Sailsjs

  Wrap RPC, REST, and Database in Sailsjs routes. These routes should be strictly version controlled while the adapter layer could leverage the underlying modules for Neo-One, NeoTracker, etc directly, through IPC, by process spawn, or any other mechanism. It is preferred to directly implement the underlying modules for the tightest integration.

* Localhost-only

  Dynamic port determination to front end checks if port use that conflicts with any system feature and notifies the user to offer an easy solution to fix. Either stop the port and change to another at install time.

* Modular, Configurable, and Movable

  In case users want to scale to devs or devs want to scale to service they can imagine. Hive should be the base for all derived work.

* Database Agnostic

  The system will wrap core Neo tools for data like NeoTracker and Neo-One, but easy portability to other formats and or databases would be ideal. This should include capability to use Sailsjs schema abstraction technology to easily port chain to new databases.

## Screens for Neo Hive Presentation Framework (front end) (WIP)

This sections describes the control surface views within the front end.

Please see the mock UI spreadsheet at for full details:

[Neo Hive Mock UI](project-planning/mock/ui/Neo Hive Mock UI.xlsx)

Snapshot (the braces represent buttons)

* [New]
* [Quickstart]
* Workspace [rollup]
  * [gear] [Accounts]
  * [gear] [Blocks]
  * [gear] [Contracts]
  * [gear] [Export]
  * [gear] [Transactions]
  * [gear] [Storage]
* System Settings [rollup]
  * [Database]
  * [Export]
  * [Logs]
  * [Rest]
  * [RPC]
  * [Session]
* [About]


# Control Surfaces (RPC, REST, Database APIs)

At this time, it looks like most of the system control is done via command line and process management that is OS-specific.

Systems that we need to control:
 * Neo-One
  * Neo-tracker
  * @neo-one/client
  * @neo-one/smart-contract

* Neo-One-Playground
  * https://github.com/neo-one-suite/neo-one-playground

* Neo network RPC control via neo-tools RPC module

  These have been tested with neo-tools

  * https://github.com/neo-one-suite/neo-one/blob/ec89546f72b4ec12b499337434efeac4dae6d7a0/packages/neo-one-client-core/src/provider/JSONR


* grpc controls?
  * https://github.com/neo-one-suite/neo-one/blob/7781fc1ab09107d8301bade113538ddae761b3c7/packages/neo-one-server-grpc/proto/server.proto



# Build

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app) and fine-tuned to support Electron by [UVMetal](https://github.com/uvmetal).

## Notes


## Available Scripts

In the project directory, you can run (I prefer to replace `npm` with `yarn`):

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn electron-dev`

Run a dev version packaged with Electron.

### `yarn electron-pack`

Package a distribution file with Electron and send it to the `./dist/` folder.

For example, to run stand-alone, do:

```
cd ./dist
./neoblack\ 0.1.0.AppImage
```

### `yarn electron-prepack`

Build react first, then package with Electron

### `yarn clean`

Delete the ``./dist/`` folder. This can grow quite large.


## Learn More
