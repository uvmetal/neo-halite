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

class VerticalNav extends Component {
  constructor(props) {
    super(props)

    this.toggle = this.toggle.bind(this)

    this.state = {
      isOpen: false,
    }
  }

  toggle() {
      this.setState({
          isOpen: !this.state.isOpen
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
                  <NavLink tag={RRNavLink} exact to="/" activeClassName="active">Home</NavLink>
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
                  <NavLink tag={RRNavLink} exact to="/Quickstart" activeClassName="active">Quickstart</NavLink>
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
