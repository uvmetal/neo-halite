# server

a [Sails v1](https://sailsjs.com) application


### Links

+ [Sails framework documentation](https://sailsjs.com/get-started)
+ [Version notes / upgrading](https://sailsjs.com/documentation/upgrading)
+ [Deployment tips](https://sailsjs.com/documentation/concepts/deployment)
+ [Community support options](https://sailsjs.com/support)
+ [Professional / enterprise options](https://sailsjs.com/enterprise)


### Version info

This app was originally generated on Sun Jul 28 2019 12:47:26 GMT-0500 (Central Daylight Time) using Sails v1.2.3.

<!-- Internally, Sails used [`sails-generate@1.16.13`](https://github.com/balderdashy/sails-generate/tree/v1.16.13/lib/core-generators/new). -->


This project's boilerplate is based on an expanded seed app provided by the [Sails core team](https://sailsjs.com/about) to make it easier for you to build on top of ready-made features like authentication, enrollment, email verification, and billing.  For more information, [drop us a line](https://sailsjs.com/support).


<!--
Note:  Generators are usually run using the globally-installed `sails` CLI (command-line interface).  This CLI version is _environment-specific_ rather than app-specific, thus over time, as a project's dependencies are upgraded or the project is worked on by different developers on different computers using different versions of Node.js, the Sails dependency in its package.json file may differ from the globally-installed Sails CLI release it was originally generated with.  (Be sure to always check out the relevant [upgrading guides](https://sailsjs.com/upgrading) before upgrading the version of Sails used by your app.  If you're stuck, [get help here](https://sailsjs.com/support).)
-->


# Architecture

There are two main portions of neo-halite, the server, and the client. The system was designed this way to support modular deployment and separation from a singular, full-client installation to easily facilitate development decision use-cases for the users and developers that build on the codebase.

## Server

The server tightly integrates with neo-one providing API routes to control a neo-one instance: starting, stopping, status, and network data like contracts, events, accounts, blocks, transactions, etc are available.

## Client

The client or front end is the user interface that tightly couples with the server and focuses on presenting those server controls to the user.


# Plan

1. Refine server architectural control over neo-one with tightest integration possible for starting, stopping, status'ing, and interfacing with basic network instance data.
  * accounts, blocks, contracts, events, transactions
  * Add configuration options to decouple and run services independently of the front-end (in-progress)
  * Verify sails is in fact stopped by checking port and page status (in-progress)
  * Integrate Neo-One and Neotracker (in-progress)
2. Notes on Neo-One integration and architecture:
  * Need input / sanity check from neo-one devs on tightest ingetration. Is a singular code module available to package and expose all of these requirements? See /server/api/controllers/neo-one/ folder structure for further insight.
  * Proposed API namespace requires an RPC URL or a private network name / workspace instance name as a parameter to scope the request / response workflow. As such, each API endpoint currently has two input parameters: `rpcurl` and `network` that scopes the requests to a given running instance.
    * What happens if an instance is requested but it isn't running? Do we start it automatically? Does a client need to be authenticated? These are future feature design considerations.
