import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import { Jumbotron, Button } from 'reactstrap';
// const { ipcRenderer } = require('electron');

import cozLogo from './images/coz.png';
import neoOneLogo from './images/neo-one.png';


class Home extends Component {
  constructor(props) {
    super(props);
    // this.listenerFunction = this.listenerFunction.bind(this);
  }
  state = {
    ready: true
  };

  // listenerFunction (event, data){
  //   if (data.includes("neo_relay_block"))
  //   {
  //         this.setState({ready: true});
  //         ipcRenderer.removeListener('logmessage', this.listenerFunction);
  //   }
  // };

  componentDidMount() {

   //ipcRenderer.on('logmessage', this.listenerFunction);

/*
    setTimeout(() => {
      // wait for node to bind to port
      console.log("Enabling button");
      this.setState({ready: true});
    }, 2000);
*/
  }

  render() {
    return(
<React.Fragment>
  <Jumbotron className="vertical-center">
  <div className="container hero-container text-center">
    <h1 className="display-4">Neodymium</h1>
    <p className="lead">Launch a custom Neo privatenet instantly</p>
    <hr className="my-4" />
    <p className="lead mx-auto">
      <Link to={this.state.ready ? 'blocks' : '#'} className={this.state.ready ? "btn coz-teal btn-lg mr-2" : "btn btn-outline-light disabled-link btn-lg"}><i className="fas fa-stopwatch mr-2"/>Quick start</Link>
      <button type="button" disabled className="btn btn-secondary btn-lg ml-2"><i className="fas fa-list mr-2" />Customize</button>
    </p>
  </div>
</Jumbotron>
<img src={neoOneLogo} className="img-fluid mx-auto d-block" alt="Neo One" />
<div className="footer coz-medium pt-1">
  <img src={cozLogo} width="276" height="50" alt="City of Zion" className="img-fluid mx-auto d-block" />
</div>
</React.Fragment>
    );
  }
}
export default Home;
