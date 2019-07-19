import React, { Component } from 'react'
import { Container, Row, Col, Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle, Button } from 'reactstrap';

import HeaderControls from '../HeaderControls/HeaderControls'
import VerticalNav from '../VerticalNav/VerticalNav'

import Home from '../../App/Home'
import About from '../../App/About'
import Accounts from '../../App/Workspace/Accounts'
import Blocks from '../../App/Workspace/Blocks'
import Console from '../../App/Workspace/Console'
import Contracts from '../../App/Workspace/Contracts'
import Events from '../../App/Events'
import Export from '../../App/Workspace/Export'
import Quickstart from '../../App/Quickstart'
import Storage from '../../App/Workspace/Storage'
import Transactions from '../../App/Workspace/Transactions'

import cozLogo from '../../../images/coz-inverted.svg'

import './style.css'

import util from 'util'

class Main extends Component {
  constructor(props) {
    super(props)

    this.leftPaneToggleHidden = this.leftPaneToggleHidden.bind(this)

    this.state = {
      leftPaneHidden: true
    }
  }

  componentDidMount() {
  }

  leftPaneToggleHidden () {
    this.setState({
      leftPaneHidden: !this.state.leftPaneHidden
    })
  }

  render() {
    let headerContent = this.props.headerContent ? this.props.headerContent :
      <HeaderControls hideLeftPane={this.leftPaneToggleHidden} />
    // let leftPaneContent = this.props.leftPaneContent ? this.props.leftPaneContent : ''
    let rightPaneContent = this.props.rightPaneContent ? this.props.rightPaneContent : ''
    let footerContent = this.props.footerContent ? this.props.footerContent : ''
    footerContent = 'footer footer footer'
    // footerContent = 'footer footer footer footer footer footerfooter footer footerfooter footer footerfooter footer footerfooter footer footerfooter footer footerfooter footer footerfooter footer footerfooter footer footerfooter footer footerfooter footer footer'
    // console.log('this.props: '+util.inspect(this.props, {depth: null}))

    if (this.props && this.props.location && this.props.location.pathname) {

    console.log('pathname: ' + this.props.location.pathname)

    rightPaneContent = <Home />

    switch(this.props.location.pathname) {

        case '/Accounts':
          rightPaneContent = <Accounts />
        break;

        case '/About':
          rightPaneContent = <About />
        break;

        case '/Blocks':
          rightPaneContent = <Blocks />
        break;

        case '/Console':
          rightPaneContent = <Console />
        break;

        case '/Contracts':
          rightPaneContent = <Contracts />
        break;

        case '/Events':
          rightPaneContent = <Events />
        break;

        case '/Export':
          rightPaneContent = <Export />
        break;

        case '/Quickstart':
          rightPaneContent = <Quickstart />
        break;

        case '/Storage':
          rightPaneContent = <Storage />
        break;

        case '/Transactions':
          rightPaneContent = <Transactions />
        break;

        default:
          rightPaneContent = <Home />
      }
    }

    return (
        <div class='wrapper'>
          <div class='headerContent'>{headerContent}</div>
          { !this.state.leftPaneHidden &&
            <div class='leftPaneContent'>
            <VerticalNav hidden={this.state.leftPaneHidden}/>
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
