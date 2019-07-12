import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import {
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
  BreadcrumbItem } from 'reactstrap';

import cozLogo from '../../images/coz-inverted.svg';
import neoOneLogo from '../../images/neo-one.png';
import neoLogo from '../../images/neo_logo.svg';

import './style.css';

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
  );
}

class NavBar extends Component {
  constructor(props) {
    super(props);
    // this.listenerFunction = this.listenerFunction.bind(this);

    this.toggle = this.toggle.bind(this);
    this.stopAllClick = this.stopAllClick.bind(this);

    this.state = {
      isOpen: false,
      ready: true,
      networks: {
        running: []
            // running: []

      }
    }
  }
  // state = {
  //   ready: true,
  //   networks: {
  //     running: ['BlueNet', 'RedNet']
  //     // running: []
  //   },
  // };

  toggle() {
      this.setState({
          isOpen: !this.state.isOpen
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
                <NavLink href="/">Accounts</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/">Transactions</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/">Contracts</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/">Storage</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/">Blocks</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/">Events</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/">Console</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/">About</NavLink>
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
        <hr></hr>
        <h3>Session Status</h3>

        <Button size="sm" outline color="success" onClick={() => this.startAllClick()}>Start All</Button>
        <Button size="sm" outline color="danger" onClick={() => this.stopAllClick()}>Stop All</Button>
        <RunningNetworks networks={this.state.networks} />
      </div>
    );
  }
}
export default NavBar;
