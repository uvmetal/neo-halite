
# Neodymium

Welcome. This is a suite of tools designed to make the Neo Smart Economy easier to use.

  * Rest, RPC, and Desktop Control Surfaces
  * One-click Private Net
  * One-click Deployment
  * Multi-user Options - Join or build a collective.
  * Orchestration

# Overview

The project is made up of many moving parts, but we only want you to worry about one. The front-end is your portal into the Neo Smart Economy development universe.

# Plan

Private Net Orchestration System Draft v1 based on concept codename Neodymium. This plan is largely based off of the requirements set out by City of Zion in the following section.

## City of Zion Project Requirements per codename Neodymium

Reformatted Goals:

[Project Goals](./docs/ProjectGoals.md)

Original:

https://gist.github.com/hal0x2328/7c95e58ebbb27091790b153160763fad

## Build strict Orchestration requirements
* Determine additional modules for control, if needed, and if rpc can run everything alone
  * Integrate RPC control module
  * Integrate command line control module (if needed)

## Build Presentation Framework (front-end)

  Currently running:
  * Electron
    * This is the only working option right now even thought react is supported. Native system access is required to control Sailsjs server component with Electronjs main process.
  * React
    * Partially supported; front-end works, but React cannot bypass chrome sandbox to start server piece.
  * Webpack

  *TODO*: Add build flags to control server deployment and front-end options.

### Screens for the Neodymium Presentation Framework (front-end) (WIP)

This sections describes the control surface views within the front-end.

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

## Server Framework Goals

Sailsjs is used on the backend to facilitate everything necessary for Neo privatenet abstraction: database, REST, RPC, and core node network.

* Sailsjs

  Wrap RPC, REST, and Database in Sailsjs routes. These routes should be strictly version controlled while the adapter layer could leverage the underlying modules for Neo-One, NeoTracker, etc directly, through IPC, by process spawn, or any other mechanism. It is preferred to directly implement the underlying modules for the tightest integration.

* Localhost-only By Default

  Dynamic port determination to front-end checks if port use that conflicts with any system feature and notifies the user to offer an easy solution to fix. Either stop the port and change to another at install time or dynamically allocate new ones.

  Future: Allow easy configuration to expose services to the world. See next section.

* Modular, Configurable, and Movable

  Plan for cases where users want to scale to devs or devs want to scale to services. They can build anything they can imagine on this function primitive. This project should be the base for all derived work.

* Database Agnostic

  The system will wrap existing Neo Smart Economy technology for data like NeoTracker and Neo-One, but easy portability to other formats or databases would be ideal. This is enabled by capability to use Sailsjs schema abstraction to easily port any chains to any databases.

### Server Framework Detail

This section is for control surfaces (RPC, REST, Database APIs).

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

# Install Software

`yarn`

## Manual Server Software Installation

This step shouldn't be necessary unless you are customizing your build.

The standard build uses Sailjs as a localhost server. Install the software requirements for Sails manually like so.

```
cd server
yarn
```

# Development

Run an interactive dev version packaged with Electron.

### `yarn dev`

# Build

Only build the software. Do not package it.

`yarn prepack` or `yarn build`

# Create the Package

To build and package a distribution file with Electron and send it to the `./dist/` folder do:

`yarn pack`

## Run or Install the Package

```
cd ./dist
./projectname\ 0.1.0.AppImage
```

For complete installation on Ubuntu 18.04 Linux to default directory /opt/ use:

```
cd ./dist
sudo dpkg -i projectname_0.1.0_amd64.deb
sudo chown -R youruser.youruser /opt/projectname/
```

*TODO*: Add post-install Debian script to chown post-intsall.
See https://www.electron.build/configuration/linux

*TODO*: Develop and test Windows installer code
*TODO*: Develop and test macOS installer code


# Clean

Delete the ``./dist/`` folder. This can grow quite large.

`yarn clean`

## Errors

If during the course of development on Linux you should encounter an error along the lines of the following please check the instructions at the link below.

```
Error: ENOSPC
```

https://stackoverflow.com/questions/22475849/node-js-what-is-enospc-error-and-how-to-solve?lq=1

## Learn More
