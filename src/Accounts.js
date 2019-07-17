import React from 'react'
import NavBar from './components/NavBar'
import HeaderControls from './components/HeaderControls/HeaderControls'

import Panel from './components/Panel/Panel'

// let title =  <h2  className="text-muted">Accounts</h2>
// let headerContent =  <NavBar />
// let headerContent =  <HeaderControls />
let headerContent =  ''

let leftPaneContent = 'left paneleft paneleft paneleft paneleft paneleft paneleft paneleft paneleft paneleft paneleft paneleft paneleft paneleft paneleft paneleft paneleft paneleft paneleft pane'

let rightPaneContent = 'rightpane rightpane rightpane right pane rightpanerightpanee'

let footerContent = 'footer footer footer footer footer footer footer footer footer footer footer footer footer footer footer footer footer footer footer footer footer footer footer footer footer footer footer footer footer '

const Accounts = () => (
  <div>
    <Panel headerContent={headerContent} leftPaneContent={leftPaneContent} rightPaneContent={rightPaneContent} footerContent={footerContent} hidden='true'/>
  </div>
);

export default Accounts
