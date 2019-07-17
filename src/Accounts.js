import React from 'react'
import NavBar from './components/navbar'

import Panel from './components/panel'

// let title =  <h2  className="text-muted">Accounts</h2>
let headerContent =  <NavBar />

let leftPaneContent = 'left paneleft paneleft paneleft paneleft paneleft paneleft paneleft paneleft paneleft paneleft paneleft paneleft paneleft paneleft paneleft paneleft paneleft paneleft pane'

let rightPaneContent = 'rightpane rightpane rightpane right pane rightpanerightpane r ight pane right paner ightp anerig htpan erightpaner ightpaneright paneri ghtpane rightpane'

const Accounts = () => (
  <div>
    <Panel headerContent={headerContent} leftPaneContent={leftPaneContent} rightPaneContent={rightPaneContent}/>
  </div>
);

export default Accounts
