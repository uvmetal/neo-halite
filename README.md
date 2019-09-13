
# Neo-Halite

<!-- TOC depthFrom:1 depthTo:6 withLinks:1 updateOnSave:1 orderedList:0 -->

- [Neo-Halite](#neo-halite)
- [Overview](#overview)
- [Plan](#plan)
	- [Instant Neo Private Net and Orchestration](#instant-neo-private-net-and-orchestration)
	- [Goals](#goals)
	- [Technology](#technology)
	- [Feature List (From City of Zion Project Requirements)](#feature-list-from-city-of-zion-project-requirements)
	- [Build strict Orchestration requirements](#build-strict-orchestration-requirements)
	- [Build Presentation Framework (front-end)](#build-presentation-framework-front-end)
	- [Server Framework Goals](#server-framework-goals)
		- [Server Framework Detail](#server-framework-detail)
- [Install Software](#install-software)
	- [Manual Server Software Installation](#manual-server-software-installation)
	- [Server Configuration Notes](#server-configuration-notes)
		- [Default Server Port](#default-server-port)
- [Development](#development)
	- [Build](#build)
	- [Create the Package](#create-the-package)
	- [Run or Install the Package](#run-or-install-the-package)
	- [Clean](#clean)
	- [Errors](#errors)
- [Todo](#todo)
	- [Architecture](#architecture)
		- [Server](#server)
		- [Client](#client)
			- [State](#state)
			- [UI Components](#ui-components)
			- [UI Design](#ui-design)
- [Learn More](#learn-more)

<!-- /TOC -->


# Overview

Welcome. Neo-Halite is a suite of tools designed to make the Neo Smart Economy easier to use.

* Rest, RPC, and Desktop Control Surfaces
* One-click Private Net
* One-click Deployment
* Multi-user Options - Join or build a collective.
* Orchestration

The project is made up of many moving parts, but we only want you to worry about one. Neo-Halite is your portal to the Neo Smart Economy development universe.

# Plan

Private Net Orchestration System Draft v1 based on concept codename Neodymium. This plan is largely based off of the requirements set out by City of Zion in the following section.

## Instant Neo Private Net and Orchestration

## Goals
* Provide developers a "download-and-double-click" solution to deploy a Neo private net
* Make system completely GUI-based with no CLI knowledge required to operate
* Design modern and attractive UI to show Neo's tooling
* Provide UX with easy transition for users migrating from Ethereum/Ganache
* Easy integration with other Neo tools like neo-python or neocompiler.io

## Technology
* Node.js
* Electron
* React
* Redux
* Sails.js
* Neon-js
* Neo-One and the TypeScript NeoVM implementation
* Neotracker

## Feature List (From City of Zion Project Requirements)
* Must Have
  * Quickstart
  * Accounts browser
  * Blocks browser
  * Transactions browser
  * Logs/Notifications browser
  * Neoscan-compatible API (required for Neon-js)
  * Neo-cli compatible RPC API
  * Contracts browser
  * Dynamic update support
* Should Have  
  * One-click chain reset
  * Blocks created on-demand
* Nice to Have
  * Multiple workspace configurations
  * Contract storage browser
  * Simple chain export and sharing


## Build strict Orchestration requirements
* Determine additional modules for control, if needed, and if RPC can run everything alone
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
* Neotracker https://github.com/neotracker/
* Neo-One https://github.com/neo-one-suite/neo-one
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

The standard build uses Sailjs as a localhost server. Before you can lift sails you will need to install the software requirements for Sails manually like so.

```
cd server
yarn
```

Test by doing `sails lift` and then browse to localhost:2328.

*TODO*: What should be on the page if you browse directly to the Sailsjs back-end?
* service status
* service manager / admin login
* branding and reference
* interface to decouple service from the front-end in the form of a deployment package along with instructions on how to point the front-end to it

## Server Configuration Notes

### Default Server Port

To modify the Sailjs server port that is used when starting Sails from Electron, for now, you will have to edit `public/electron.js` and change the variable `serverPort`.

*TODO*: Server service configuration option should be able to control this directly from the Electron front-end.

For `sails lift`, edit `server/.sailsrc` and change the port configuration variable.

# Development

Run an interactive dev version packaged with Electron.

`yarn dev`

# Rebuild Server Binaries with Electron Compatibility

If you start Sails and see errors about sqlite3 and/or grpc, do the following to build compatible binaries for Electron.

`yarn electron-rebuild-bins`

## Build

Only build the software. Do not package it.

`yarn prepack` or `yarn build`

## Create the Package

To build and package a distribution file with Electron and send it to the `./dist/` folder do:

`yarn package`

## Run or Install the Package

The following should be suitable to install on Linux. This has been tested on Ubuntu 18.04

```
cd ./dist
./neo-halite\ 0.1.0.AppImage
```

For complete installation on Ubuntu 18.04 Linux to default directory /opt/ use:

```
cd ./dist
sudo dpkg -i neo-halite_0.1.0_amd64.deb
sudo chown -R youruser.youruser /opt/neo-halite/
```

*TODO*: Add post-install Debian script to chown post-intsall.
See https://www.electron.build/configuration/linux

*TODO*: Develop and test Windows installer code
*TODO*: Develop and test macOS installer code


## Clean

Delete the ``./dist/`` folder. This can grow quite large.

`yarn clean`

## Errors

If during the course of development on Linux you should encounter an error along the lines of the following please check the instructions at the link below.

```
Error: ENOSPC
```

https://stackoverflow.com/questions/22475849/node-js-what-is-enospc-error-and-how-to-solve?lq=1


# Todo

Create project board for the following:

## Architecture

There are two main portions of neo-halite, the server, and the client. The system was designed this way to support modular deployment and separation from a singular, full-client installation to easily facilitate development decision use-cases for the users and developers that build on the codebase.

### Server

The server tightly integrates with neo-one providing API routes to control a neo-one instance: starting, stopping, status, and network data like contracts, events, accounts, blocks, transactions, etc are available.

For status and planning of the server component please see: [Server README.md](/server/README.md)

### Client

The client or front end is the user interface that tightly couples with the server and focuses on presenting those server controls to the user.

#### State
(front-end)
* Add state management with redux before the prop passing and state lifting gets out of hand


#### UI Components
* Componentize network status button overlay flyout
* Abstract nav away from vertical/horizontal
* Event-driven flyout states
  - I.e., clicking hamburger doesn't close session status automatically
  - Ideally, this could be configurable flag
* Main UI panes do not scroll independently, consider best approach i.e., add scroll or not


#### UI Design
* Theme - the current UI design and layout was for testing and example
* Dark Mode
* Flex nav flyout

# Learn More
