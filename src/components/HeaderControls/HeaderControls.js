import React, {Component} from 'react'
import { NavLink as RRNavLink } from 'react-router-dom'
import {
  Card,
  CardBody,
  Button,
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap'

import './style.css'


function RunningNetworks(props) {
  let listItems

  if (props && props.networks && props.networks.running.length) {
    listItems = props.networks.running.map((net) =>
      <li>
      <Button size="sm" outline color="success" style={{ marginLeft: '1rem', marginBottom: '1rem' }}>Start</Button>
      <Button size="sm" outline color="success" style={{ marginLeft: '1rem', marginBottom: '1rem' }}>Stop</Button>
      <Button size="sm" outline color="success" style={{ marginLeft: '1rem', marginBottom: '1rem' }}>Restart</Button>
      <a href="">{net}</a> </li>
    )
  }

  return (
    <div>
      <p>Running Networks ({props.networks.running.length}):</p>
      <ul>
      {listItems}
      </ul>
    </div>
  )
}

class NavBar extends Component {
  constructor(props) {
    super(props)
    // this.listenerFunction = this.listenerFunction.bind(this)

    this.toggle = this.toggle.bind(this)
    this.toggleNetworkStatus = this.toggleNetworkStatus.bind(this)
    this.stopAllClick = this.stopAllClick.bind(this)

    this.state = {
      networkStatusToggle: false,
      isOpen: false,
      ready: true,
      networks: {
        running: []
      }
    }
  }

  toggle() {
      this.setState({
          isOpen: !this.state.isOpen
      })
  }

  toggleNetworkStatus() {
      this.setState({
          networkStatusToggle: !this.state.networkStatusToggle
      })
  }

  startAllClick() {
      this.setState({
          networks: {
            running: ['BlueNet', 'RedNet']
          }
      })
  }

  stopAllClick() {
      this.setState({
          networks: {
            running: []
          }
      })
  }

  componentDidMount() {

  }

  render() {
    return(
      <div>
        <Navbar color="faded" light expand="md">
          <NavbarBrand href="/">Black Orc</NavbarBrand>

          </Navbar>
          <Button size="sm" onClick={this.props.hideLeftPane}  className="mr-2" >...</Button>
        <Button size="sm" outline color="success" onClick={this.toggleNetworkStatus} >Session Status</Button>
          <Collapse isOpen={this.state.networkStatusToggle}>
            <Card style={{ marginLeft: '1rem', marginRight: '1rem', marginBottom: '1rem' }}>
              <CardBody>
              <Button size="sm" outline color="success" onClick={() => this.startAllClick()}>Start All</Button>
              <Button size="sm" outline color="danger" onClick={() => this.stopAllClick()}>Stop All</Button>
              <RunningNetworks networks={this.state.networks} />
              </CardBody>
            </Card>
          </Collapse>
      </div>
    )
  }
}
export default NavBar
