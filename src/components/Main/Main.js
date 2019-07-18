import React, { Component } from 'react'
import { Container, Row, Col, Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle, Button } from 'reactstrap';
import HeaderControls from '../../components/HeaderControls/HeaderControls'
import VerticalNav from '../../components/VerticalNav/VerticalNav'
import Home from '../../Home'
import Console from '../../Console'
// import Quickstart from './Quickstart'
import Blocks from '../../Blocks'
import Transactions from '../../Transactions'
import Contracts from '../../Contracts'
import Accounts from '../../Accounts'
import Storage from '../../Storage'
import Events from '../../Events'
import About from '../../About'

import cozLogo from '../../images/coz-inverted.svg'

import './style.css'

import util from 'util'

class Main extends Component {
  constructor(props) {
    super(props)

    console.log('this.props: '+this.props)

    this.leftPaneToggleHidden = this.leftPaneToggleHidden.bind(this)

    this.state = {
      leftPaneHidden: true
    }
  }

  componentDidMount() {

  }
  // <CardImg top width='100%' src={cozLogo} alt='Card image cap' />

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
    footerContent = 'footer footer footer footer footer footerfooter footer footerfooter footer footerfooter footer footerfooter footer footerfooter footer footerfooter footer footerfooter footer footerfooter footer footerfooter footer footerfooter footer footer'
    // console.log('this.props: '+util.inspect(this.props, {depth: null}))

    console.log('pathname: ' + this.props.location.pathname)


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
