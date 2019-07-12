import React, {Component} from 'react'
import { NavLink as RRNavLink } from 'react-router-dom'
import {
  Card,
  CardBody,
  Jumbotron,
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
  DropdownItem,
  Breadcrumb,
  BreadcrumbItem } from 'reactstrap'

import cozLogo from '../../images/coz-inverted.svg'
import neoOneLogo from '../../images/neo-one.png'
import neoLogo from '../../images/neo_logo.svg'

import './style.css'

let color = "black"

function RunningNetworks(props) {
  let listItems

  if (props && props.networks && props.networks.running.length) {
    listItems = props.networks.running.map((net) =>
      <li>[<a href="">Start</a> | <a href="">Stop</a> | <a href="">Restart</a>] <a href="">{net}</a> </li>
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
    // this.listenerFunction = this.listenerFunction.bind(this);

    this.toggle = this.toggle.bind(this);
    this.toggleNetworkStatus = this.toggleNetworkStatus.bind(this);
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
      });
  }

  toggleNetworkStatus() {
      this.setState({
          networkStatusToggle: !this.state.networkStatusToggle
      });
  }

  startAllClick() {
      this.setState({
          networks: {
            running: ['BlueNet', 'RedNet']
          }
      });
  }

  stopAllClick() {
      this.setState({
          networks: {
            running: []
          }
      });
  }


  componentDidMount() {

  }

  render() {
    return(
      <div>
        <Navbar color="faded" light expand="md">
          <NavbarBrand href="/">Neo Black</NavbarBrand>
          <NavbarToggler onClick={this.toggle}  className="mr-2" />
          <Collapse isOpen={!this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem >
                <NavLink href="/">Home</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/accounts">Accounts</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/transactions">Transactions</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/contracts">Contracts</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/storage">Storage</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/blocks">Blocks</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/events">Events</NavLink>
              </NavItem>
              <NavItem>
                <NavLink tag={RRNavLink} exact to="/console" activeClassName="active">Console</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/about">About</NavLink>
              </NavItem>
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                  Options
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem>
                    Option 1
                  </DropdownItem>
                  <DropdownItem>
                    Option 2
                  </DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem>
                    Reset
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </Nav>
          </Collapse>
        </Navbar>
        <Button size="sm" outline color="success" onClick={this.toggleNetworkStatus} style={{ marginLeft: '1rem', marginBottom: '1rem' }}>Session Status</Button>
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
