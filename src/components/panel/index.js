import React, {Component} from 'react'

import ReactPanels from 'react-panels'

import PropTypes from 'prop-types';

import { Container, Row, Col, Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle, Button } from 'reactstrap';

import cozLogo from '../../images/coz-inverted.svg'

import './style.css'

class Panel extends Component {
  constructor(props) {
    super(props)

    this.state = {
    }
  }

  componentDidMount() {

  }
  // <CardImg top width="100%" src={cozLogo} alt="Card image cap" />

  render() {
    let headerContent = this.props.headerContent ? this.props.headerContent : ''
    let leftPaneContent = this.props.leftPaneContent ? this.props.leftPaneContent : ''
    let rightPaneContent = this.props.rightPaneContent ? this.props.rightPaneContent : ''

    return (
      <div>
      <Container fluid className="">
      <Row className="">
        <Col className="">
        {headerContent}
        <hr/>
        </Col>
      </Row>
      <Row className="wrapper">
        <Col className="left" >
          {leftPaneContent}
        </Col>
        <Col className="main">
          {rightPaneContent}
        </Col>
      </Row>
      </Container>
      </div>
    )
  }
}
export default Panel
