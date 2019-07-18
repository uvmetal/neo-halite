import React, { Component } from 'react';
import { Collapse, Button, CardBody, Card } from 'reactstrap';
import VerticalNav from './components/VerticalNav/VerticalNav'
// import sqlite3 from 'sqlite3';
// import {promisify} from 'bluebird';
import Main from './components/Main/Main'

let headerContent =  ''

let leftPaneContent = <VerticalNav />

// let leftPaneContent = 'left paneleft paneleft paneleft paneleft paneleft paneleft paneleft paneleft paneleft paneleft paneleft paneleft paneleft paneleft paneleft paneleft paneleft paneleft pane'

let rightPaneContent = 'rightpane rightpane rightpane right pane rightpanerightpanee'

let footerContent = 'footer footer footer footer footer footer footer footer footer footer footer footer footer footer footer footer footer footer footer footer footer footer footer footer footer footer footer footer footer '

class BlockItem extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = { collapse: false };
  }
  state = {
    blockdata: {}
  }
  toggle() {
    this.setState(state => ({ collapse: !state.collapse }));
  }

  componentWillMount()
  {
  //   const dbPath = '/Users/joe/Library/Application Support/neo-one/plugin/neo-one-server-plugin-neotracker/neotracker/manager/resources/neotracker9/db.sqlite';
  //   const db = new sqlite3.Database(dbPath, sqlite3.OPEN_READONLY);
  //   db.get = promisify(db.get);
  //   console.log("Getting block data for " + this.props.blockhash);
  //   db.get(`SELECT * FROM block WHERE hash = ?`, this.props.blockhash)
  //   .then((result) => {
  //     this.state.blockdata = JSON.stringify(result, null, 2);
  // });

  }


  render() {
    return (
      <div>
        <Main headerContent={headerContent} leftPaneContent={leftPaneContent} rightPaneContent={rightPaneContent} footerContent={footerContent} hidden='true'/>
      </div>
    );
  }
}

export default BlockItem;
