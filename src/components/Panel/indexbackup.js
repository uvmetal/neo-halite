import React, {Component} from 'react'

import ReactPanels from 'react-panels'

import PropTypes from 'prop-types';

import './style.css'

let ReactPanel = ReactPanels.Panel
let Tab = ReactPanels.Tab
let Toolbar = ReactPanels.Toolbar
let Content = ReactPanels.Content
let Footer = ReactPanels.Footer
let ToggleButton = ReactPanels.ToggleButton
let Button = ReactPanels.Button

type Props = {
    extendedProps: React.PropTypes.object.isRequired,
    initialTabs: React.PropTypes.array.isRequired,
    theme: React.PropTypes.string,
    extendedProps: React.PropTypes.object.isRequired,
    initialTabs: React.PropTypes.array.isRequired
}

type State = {
  toolbars: boolean,
  tabs: []
}

class Panel extends React.Component {
  static defaultProps = {
    toolbars: true,
    tabs: [],
    theme: ''
  }

  state = {
    toolbars: true,
    tabs: []
  }

  getInitialState() {
      return {
          tabs: this.props.initialTabs,
          toolbars: true
      }
  }

  handleToggleToolbars() {
      this.setState({toolbars: !this.state.toolbars})
  }

  addTab() {                   //produces a 4 digit random string to use as tab's name and key
      var newTabs = this.state.tabs.concat([("0000" + (Math.random()*Math.pow(36,4) << 0).toString(36)).slice(-4).toUpperCase()])
      this.setState({tabs: newTabs})
  }

  removeTab() {
    var self = this,
      newTabs = this.state.tabs,
      selectedIndex = this.refs.panel.getSelectedIndex()
    newTabs.splice(selectedIndex, 1)
    self.setState({tabs: newTabs})
  }


  componentDidMount() {

  }

  render() {
    // var tabs = this.state.tabs.map(function(item, i) {
    //     var tabTitle = "TAB " + item
    //     return (
    //         <Tab key={item} title={tabTitle} icon="fa fa-cube"
    //              showToolbar={this.state.toolbars} {...this.props.extendedProps.tab}>
    //             <Toolbar>Toolbar</Toolbar>
    //             <Content>Content of {tabTitle}</Content>
    //             <Footer>Footer</Footer>
    //         </Tab>
    //     )
    // }.bind(this))

    return (
      <div>
      <Container fluid className="">
      <Row className="">
        <Col className="">
        {headerContent}
        <hr/>
        </Col>
      </Row>
      <Row id="flex-container">
        <Col id='raw' className='raw-item'>
          {leftPaneContent}
        </Col>
        <Col id='flex' className='flex-item'>
          {rightPaneContent}
        </Col>
      </Row>
      </Container>
        <ReactPanel theme="chemical">
        <Tab title="One" icon="fa fa-plane">
         <Toolbar>Toolbar content of One</Toolbar>
         <Content>Content of One</Content>
         <Footer>Footer content of One</Footer>
        </Tab>
        <Tab title="Two" icon="fa fa-fire">
         <Content>Content of Two</Content>
        </Tab>
        </ReactPanel>
      </div>
    )
  }
}
export default Panel
