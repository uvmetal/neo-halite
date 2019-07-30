import React, { Component } from 'react'
import { MemoryRouter, Switch, Route, Router, Redirect } from 'react-router'

import Main from './components/Ui/Main/Main'

import worker from './app.worker.js'
import WebWorker from './WebWorker'

import util from 'util'

import './App.css'

const electron = window.require("electron")

class App extends Component {
  constructor(props) {
      super(props)

      this.state = {
          isLoading: true,
          users: [],
          isSorting: false,
          isFirstRun: false
      }
  }

  componentDidMount() {
    this.worker = new WebWorker(worker)

    this.worker.addEventListener('message', event => {
        const sortedList = event.data
        this.setState({
            users: sortedList
        })
    })

    let self = this

    electron.ipcRenderer.on('check-install-reply', function (event, arg) {
      console.log('Got installer message. isFirstRun is ' + arg)

      self.setState({ isFirstRun: arg })
    })

    electron.ipcRenderer.send('check-install')
  }

  handleSort() {
      this.worker.postMessage(this.state.users)
  }

  render() {
    if (this.state.isFirstRun === true) {
      console.log('redirecting to installer')

      return (
        <MemoryRouter>
          <Switch>
          <Route render={(props) => <Main {...props} redirect='/InstallerMain'/>} />
          </Switch>
        </MemoryRouter>
      )
    }

    return (
      // <Main rightPaneContent={rightPaneContent} footerContent={footerContent} />

      <MemoryRouter>
        <Switch>
        <Route render={(props) => <Main {...props} />} />
        </Switch>
      </MemoryRouter>
    )
  }
}

export default App
