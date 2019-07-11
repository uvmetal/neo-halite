import React from 'react';
import { MemoryRouter, Switch, Route } from 'react-router';

import Home from './Home';

// import Accounts from './Accounts';


import logo from './logo.svg';
import './App.css';

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
      <Route path="/" component={Home} />
    </Switch>
  </MemoryRouter>
);


export default App;
