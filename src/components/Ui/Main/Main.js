import React, { Component } from 'react'

import HeaderControls from '../HeaderControls/HeaderControls'
import VerticalNav from '../VerticalNav/VerticalNav'

import WorkSpaceAccounts from '../../App/Workspace/Accounts'
import WorkspaceBlocks from '../../App/Workspace/Blocks'
import WorkspaceConsole from '../../App/Workspace/Console'
import WorkspaceContracts from '../../App/Workspace/Contracts'
import WorkspaceExport from '../../App/Workspace/Export'
import WorkspaceStorage from '../../App/Workspace/Storage'
import WorkspaceServer from '../../App/Workspace/Server'
import WorkspaceTransactions from '../../App/Workspace/Transactions'

import SettingsDatabase from '../../App/Settings/Database'
import SettingsExport from '../../App/Settings/Export'
import SettingsLogs from '../../App/Settings/Logs'
import SettingsRest from '../../App/Settings/Rest'
import SettingsRpc from '../../App/Settings/Rpc'
import SettingsSession from '../../App/Settings/Session'

import InstallerMain  from '../../App/Installer/Main'

import About from '../../App/About'
import Events from '../../App/Events'
import Home from '../../App/Home'
import Quickstart from '../../App/Quickstart'

// import util from 'util'

// import cozLogo from '../../../images/coz-inverted.svg'

import './style.css'

class Main extends Component {
  constructor(props) {
    super(props)

    this.leftPaneToggleHidden = this.leftPaneToggleHidden.bind(this)
    this.toggleVerticalNavRollup = this.toggleVerticalNavRollup.bind(this)

    this.state = {
      leftPaneHidden: true,
      hideWorkspaceRollup: true,
      hideSettingsRollup: true,
    }
  }

  componentDidMount() {

  }

  toggleVerticalNavRollup(rollup) {
    if(rollup === 'workspace') {
      this.setState({
        hideWorkspaceRollup: !this.state.hideWorkspaceRollup,
      })
    }
    else {
      this.setState({
        hideSettingsRollup: !this.state.hideSettingsRollup,
      })
    }
  }

  leftPaneToggleHidden () {
    this.setState({
      leftPaneHidden: !this.state.leftPaneHidden
    })
  }

  render() {
    let headerContent = this.props.headerContent ? this.props.headerContent :
      <HeaderControls leftPaneToggleHidden={this.leftPaneToggleHidden} />
    // let leftPaneContent = this.props.leftPaneContent ? this.props.leftPaneContent : ''
    let rightPaneContent = this.props.rightPaneContent ? this.props.rightPaneContent : ''
    let footerContent = this.props.footerContent ? this.props.footerContent : ''
    footerContent = 'footer footer footer'

    if (this.props && this.props.location && this.props.location.pathname) {

      console.log('pathname: ' + this.props.location.pathname)

      if (this.props.redirect) {
        if (this.props.config) {
          rightPaneContent = <InstallerMain config={this.props.config} />
        } else {
          rightPaneContent = <InstallerMain />
        }
        console.log('redirecting to: ' + this.props.redirect)
      } else {
        rightPaneContent = <Home />

        switch(this.props.location.pathname) {

          case '/About':
          rightPaneContent = <About />
          break

          case '/Events':
          rightPaneContent = <Events />
          break

          case '/Quickstart':
            rightPaneContent = <Quickstart />
          break

          case '/WorkspaceAccounts':
            rightPaneContent = <WorkSpaceAccounts />
          break

          case '/WorkspaceBlocks':
          rightPaneContent = <WorkspaceBlocks />
          break

          case '/WorkspaceConsole':
            rightPaneContent = <WorkspaceConsole />
          break

          case '/WorkspaceContracts':
            rightPaneContent = <WorkspaceContracts />
          break

          case '/WorkspaceExport':
            rightPaneContent = <WorkspaceExport />
          break

          case '/WorkspaceStorage':
          rightPaneContent = <WorkspaceStorage />
          break;

          case '/WorkspaceServer':
          rightPaneContent = <WorkspaceServer />
          break;

          case '/WorkspaceTransactions':
          rightPaneContent = <WorkspaceTransactions />
          break

          case '/SettingsDatabase':
            rightPaneContent = <SettingsDatabase />
          break

          case '/SettingsExport':
            rightPaneContent = <SettingsExport />
          break

          case '/SettingsLogs':
            rightPaneContent = <SettingsLogs />
          break

          case '/SettingsRest':
            rightPaneContent = <SettingsRest />
          break

          case '/SettingsRpc':
            rightPaneContent = <SettingsRpc />
          break

          case '/SettingsSession':
            rightPaneContent = <SettingsSession />
          break

          case '/InstallerMain':
            rightPaneContent = <InstallerMain />
          break

          default:
            rightPaneContent = <Home />
        }
      }
    }

    return (
        <div class='wrapper'>
          <div class='headerContent'>{headerContent}</div>
          { !this.state.leftPaneHidden &&
            <div class='leftPaneContent'>
            <VerticalNav hidden={this.state.leftPaneHidden}
             hideWorkspaceRollup={this.state.hideWorkspaceRollup}
             hideSettingsRollup={this.state.hideSettingsRollup} toggleRollup={this.toggleVerticalNavRollup}
            />
            </div>
          }
          <div class='rightPaneContent'>
          {rightPaneContent}
          </div>
          <div class='footerContent'>{footerContent}</div>
        </div>
    )
  }
}
export default Main
