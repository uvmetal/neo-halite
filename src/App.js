import React, { Component } from 'react'
import { MemoryRouter, Switch, Route } from 'react-router'

import Home from './Home'
import Console from './Console'
// import Quickstart from './Quickstart'
import Blocks from './Blocks'
import Transactions from './Transactions'
import Contracts from './Contracts'
import Accounts from './Accounts'
import Storage from './Storage'
import Events from './Events'
import About from './About'

import worker from './app.worker.js'
import WebWorker from './WebWorker'

import './App.css'

class App extends Component {
  constructor(props) {
      super(props);

      this.state = {
          isLoading: true,
          users: [],
          isSorting: false,
      };
  }

  componentDidMount() {
      this.worker = new WebWorker(worker);

      this.worker.addEventListener('message', event => {
          const sortedList = event.data
          this.setState({
              users: sortedList
          })
      })
  }

  handleSort() {
      this.worker.postMessage(this.state.users)
  }

  render() {
    return (
      <MemoryRouter>
        <Switch>
        <Route path="/accounts" component={Accounts} />
        <Route path="/transactions" component={Transactions} />
        <Route path="/contracts" component={Contracts} />
        <Route path="/storage" component={Storage} />
        <Route path="/blocks" component={Blocks} />
        <Route path="/events" component={Events} />
        <Route path="/console" component={Console} />
        <Route path="/about" component={About} />
        <Route path="/" component={Home} />
        </Switch>
      </MemoryRouter>
    )
  }
}

export default App
