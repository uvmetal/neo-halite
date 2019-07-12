import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import { Jumbotron, Button } from 'reactstrap';
// const { ipcRenderer } = require('electron');

import cozLogo from './images/coz-inverted.svg';
import neoOneLogo from './images/neo-one.png';
import neoLogo from './images/neo_logo.svg';

import './Home.css';

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
      <h3>Session Status</h3>
      <p>Running Networks ({props.networks.running.length}):</p>
      <ul>
      {listItems}
      </ul>
    </div>
  );
}

class Home extends Component {
  constructor(props) {
    super(props);
    // this.listenerFunction = this.listenerFunction.bind(this);
  }
  state = {
    ready: true,
    networks: {
      running: ['BlueNet', 'RedNet']
      // running: []
    },
  };

  componentDidMount() {

  }

  render() {
    return(
      <React.Fragment>
      <style>{'body { background-color: #808080; font-family: Verdana};'}</style>
        <Jumbotron className="vertical-center">
        <div className="container hero-container text-center">
        <div className="TopLeftCorner">
          <img src={neoLogo} alt="Neo One" />
        </div>
          <h1 className="Title">Neo Black</h1>
          <h3> Network Orchestration</h3>
          <div className="TopCorner">
            <div >
              <img src={neoOneLogo} className="clear: right" alt="Neo One" />
            </div>
            <div>
              <img src={cozLogo} width="100" height="24" alt="City of Zion" className="img-fluid mx-auto d-block" />
            </div>
          </div>

          <hr style={{ color: color, backgroundColor: color, height: 3
        }} />
          <RunningNetworks networks={this.state.networks} />
          <p className="lead mx-auto">
            <Link to={this.state.ready ? 'blocks' : '#'} className={this.state.ready ? "btn coz-teal btn-lg mr-2" : "btn btn-outline-light disabled-link btn-lg"}><i className="fas fa-stopwatch mr-2"/>Quick start</Link>
            <button type="button" disabled className="btn btn-secondary btn-lg ml-2"><i className="fas fa-list mr-2" />Customize</button>
          </p>
        </div>
      </Jumbotron>

      </React.Fragment>
    );
  }
}
export default Home;
