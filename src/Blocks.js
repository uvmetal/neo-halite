import React, { Component } from 'react'
import NavBar from './components/NavBar/NavBar'
// import BlockItem from './BlockItem'
// import Neon, { rpc } from "@cityofzion/neon-js"
// var initSqlJs = require('sql.js');
// import { Database } from "sqlite3";
// import sqlite3 from 'sqlite3'
// import sqlite3 from 'sqlite3'
// sqlite3.verbose()
// import {promisify} from 'bluebird';

// const { remote } = require( "electron" );
// const {ipcRenderer: ipc} = require('electron-better-ipc');
// const cli_1 = require('@neo-one/cli');
// const rxjs_1 = require("rxjs");
// const server_client_1 = require("@neo-one/server-client")

class Blocks extends Component {
  constructor(props) {
    super(props);
    // this.getBlocks = this.getBlocks.bind(this);
  }

  state = {
    items: [],
    blocks: [],
    nodeReady: false,
    rpcAddress: ''
  };
  getBlocks(rpcurl) {
    // const client = Neon.create.rpcClient(rpcurl);
    //
    // client.getBlockCount().then((response) => {
    //   console.log("getting blocks 0-" + response);
    //   var height = parseInt(response);
    //   for (var i=0; i < 10; i++)
    //   {
    //     client.getBlock(i).then((response) => {
    //       const id = response.hash;
    //       this.state.items.push({blockid: id, blockdata: "Block " + response.index + ":\n" + JSON.stringify(response, null, 2)});
    //       this.setState({ state: this.state });
    //     });
    //   }
    // })
  };

  getBlocksSqlite()
  {
   //  initSqlJs().then(function(SQL){
   //   const dbPath = '/'
   //   var db = new SQL.Database(dbPath);
   // })
  //   const dbPath = '/Users/joe/Library/Application Support/neo-one/plugin/neo-one-server-plugin-neotracker/neotracker/manager/resources/neotracker9/db.sqlite';
  //   const db = new sqlite3.Database(dbPath, sqlite3.OPEN_READONLY);
  //   db.all = promisify(db.all);
  //
  //   db.all(`SELECT id, hash FROM block LIMIT 10`)
  //   .then((result) => {
  //     this.state.blocks = result;
  //     console.log(JSON.stringify(result))
  // });
  }

  componentWillMount() {

    // const client = new server_client_1.Client({port: 40100});
    //
    // let cancel$ = new rxjs_1.ReplaySubject();
    // client.createResource({
    //                         plugin: "@neo-one/server-plugin-network",
    //                         resourceType: "network",
    //                         name: "neodymium9",
    //                         options: {},
    //                         cancel$: cancel$ })
    // .then((result) => {
    //   console.log("create network result: " + JSON.stringify(result));
    //   this.state.rpcAddress = result.nodes[0].rpcAddress;
    //   client.startResource$({
    //                         plugin: "@neo-one/server-plugin-network",
    //                         resourceType: "network",
    //                         name: "neodymium9",
    //                         options: {},
    //                         cancel$: cancel$ })
    //   .subscribe((res) => {
    //     console.log("start network result: " + JSON.stringify(res));
    //     this.getBlocks(this.state.rpcAddress);
        this.getBlocksSqlite();
    //   });
    // });
  }


  render() {
    return(
  <div>
    <NavBar />
    <div className="container">
    <h2 className="text-muted">Blocks</h2>

    </div>
  </div>
    );
  }
}

export default Blocks;
