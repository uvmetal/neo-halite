import React, {Component} from 'react'
import { Link } from 'react-router-dom'
import { Jumbotron, Button } from 'reactstrap'

import './style.css'

import cozLogo from '../../images/coz-inverted.svg'
import neoOneLogo from '../../images/neo-one.png'

// import ipcRenderer from 'electron'

// const { ipcRenderer } = window.require('electron')
//
// import Sails from 'sails'
// import util from 'util'
//
// let sailsServer = null

class Home extends Component {
  constructor(props) {
    super(props)

    this.lift = this.lift.bind(this)
    this.lower = this.lower.bind(this)

    this.state = {

    }
  }

  lift() {
  //   if (sailsServer === null) {
  //     sailsServer = new Sails.constructor()
  //     console.log('sails.config: ' + util.inspect(sailsServer.config, {depth: null}))
  //
  //     sailsServer.lift({appPath: './server/'}, function(err) {
  //       if (err) {
  //           console.log('Error occurred lifting Sails app:', err)
  //           return
  //         }
  //
  //         // --•
  //         console.log('Sails app lifted successfully!')
  //         console.log('sails.config: ' + util.inspect(sailsServer.config, {depth: null}))
  //     })
  //   } else console.log('sails server is already running')
    window.ipcRenderer.send('start-server')
  }

  lower() {
    // if (sailsServer !== null) {
    //   sailsServer.lower(
    //     function (err) {
    //       if (err) {
    //         return console.log("Error occurred lowering Sails app: ", err);
    //       }
    //       console.log("Sails app lowered successfully!");
    //     }
    //   )
    // } else console.log('sails is not running')

    window.ipcRenderer.send('stop-server')

  }

  componentDidMount() {
    // if (isElectron()) {
			// console.log(window.ipcRenderer);
			// window.ipcRenderer.send('start-server')
		// }
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
              <p/>
              <Button size="sm" onClick={this.lift} >Start Sails</Button>
              <Button size="sm" onClick={this.lower} >Stop Sails</Button>

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
export default Home
