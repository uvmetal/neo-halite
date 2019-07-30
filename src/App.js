import React, { Component } from 'react'
import { MemoryRouter, Switch, Route } from 'react-router'

import Main from './components/Ui/Main/Main'

import worker from './app.worker.js'
import WebWorker from './WebWorker'

import './App.css'

const electron = window.require("electron")



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

    electron.ipcRenderer.on('check-install-reply', function (event, arg) {
      console.log('Got installer message. isFirstRun is ' + arg)
    })

    electron.ipcRenderer.send('check-install')
  }

  handleSort() {
      this.worker.postMessage(this.state.users)
  }

  render() {
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
