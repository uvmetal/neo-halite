import React, { Component } from 'react'
import { Jumbotron, Button } from 'reactstrap'

import util from 'util'

import '../style.css'

import cozLogo from '../../../images/coz-inverted.svg'
import neoOneLogo from '../../../images/neo-one.png'

class WorkspaceServer extends Component {
  constructor(props) {
    super(props)

    this.lift = this.lift.bind(this)
    this.lower = this.lower.bind(this)

    this.state = {
    }
  }

  lift() {
    window.ipcRenderer.send('start-server')
  }

  lower() {
    window.ipcRenderer.send('stop-server')
  }

  componentDidMount() {
    // receive ipc when sails loads then fetch the page to show in this window
    fetch(`http://localhost:1337`)
      .then((response) => {
        console.log('sails response: '+ util.inspect(response, {depth: null}))
      })
  }

  render() {
    return(
      <React.Fragment>
        <Jumbotron className="vertical-center">
        <div className="container hero-container text-center">
          <h1 className="display-4">Server </h1>
          <p className="lead">Lorem ipsum dolor</p>
          <hr className="my-4" />
          <p className="lead mx-auto">
          </p>
          <Button size="sm" onClick={this.lift} >Start Neo-One</Button>
          <Button size="sm" onClick={this.lower} >Stop Neo-One</Button>
        </div>
        </Jumbotron>
        <img src={neoOneLogo} className="img-fluid mx-auto d-block" alt="Neo One" />
        <div className="footer coz-medium pt-1">
          <img src={cozLogo} width="276" height="50" alt="City of Zion" className="img-fluid mx-auto d-block" />
        </div>
      </React.Fragment>
    )
  }
}
export default WorkspaceServer
