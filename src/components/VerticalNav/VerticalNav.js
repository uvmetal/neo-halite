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

class VerticalNav extends Component {
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
    if (!this.props.hidden) {
      return(
        <div>
          <Navbar color="faded" light expand="md">
            <Collapse isOpen={!this.state.isOpen} navbar>
              <Nav vertical navbar>
                <NavItem >
                  <NavLink tag={RRNavLink} exct to="/" activeClassName="active">Home</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag={RRNavLink} exact to="/About" activeClassName="active">About</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag={RRNavLink} exact to="/Accounts" activeClassName="active">Accounts</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag={RRNavLink} exact to="/Blocks" activeClassName="active">Blocks</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag={RRNavLink} exact to="/Console" activeClassName="active">Console</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag={RRNavLink} exact to="/Contracts" activeClassName="active">Contracts</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag={RRNavLink} exact to="/Events" activeClassName="active">Events</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag={RRNavLink} exact to="/Storage" activeClassName="active">Storage</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag={RRNavLink} exact to="/Transactions" activeClassName="active">Transactions</NavLink>
                </NavItem>

              </Nav>
            </Collapse>
          </Navbar>

        </div>
      )
    }
  }
}
export default VerticalNav
