import React from 'react'
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

// import Accounts from './Accounts';


import logo from './logo.svg'
import './App.css'

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

const App = () => (
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
);


export default App
