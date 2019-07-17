import React, {Component} from 'react'

import ReactPanels from 'react-panels'

import PropTypes from 'prop-types';

import { Container, Row, Col, Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle, Button } from 'reactstrap';

import HeaderControls from '../../components/HeaderControls/HeaderControls'

import cozLogo from '../../images/coz-inverted.svg'

import './style.css'

class Panel extends Component {
  constructor(props) {
    super(props)

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
    let headerContent = this.props.headerContent ? this.props.headerContent : <HeaderControls hideLeftPane={this.leftPaneToggleHidden} />
    let leftPaneContent = this.props.leftPaneContent ? this.props.leftPanelContent : ''
    let rightPaneContent = this.props.rightPaneContent ? this.props.rightPanelContent : ''
    let footerContent = this.props.footerContent ? this.props.footerContent : ''

    return (
        <div class='wrapper container'>
          <div class='headerContent'>{headerContent}</div>
          { !this.state.leftPaneHidden &&
            <div class='leftPaneContent'>
            {leftPaneContent}
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
export default Panel
