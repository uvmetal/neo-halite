import React, {Component} from 'react'
import { Link } from 'react-router-dom'
import { Jumbotron, Button } from 'reactstrap';
import NavBar from './components/navbar'

import './Home.css'

import cozLogo from './images/coz-inverted.svg'
import neoOneLogo from './images/neo-one.png'
import neoLogo from './images/neo_logo.svg'

class About extends Component {
  constructor(props) {
    super(props);

    this.state = {

    }
  }

  componentDidMount() {

  }

  render() {
    return(
        <React.Fragment>
        <NavBar />
          <Jumbotron className="vertical-center">
          <div className="container hero-container text-center">
            <h1 className="display-4">About </h1>
            <p className="lead">Lorem ipsum dolor</p>
            <hr className="my-4" />
            <p className="lead mx-auto">

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
export default About
