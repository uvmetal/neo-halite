import React from 'react';
import { Link } from 'react-router-dom';
import Terminal from 'terminal-in-react';
import NavBar from './components/navbar'
// import NavBar from './components/navbar'

const Console = () => (
  <React.Fragment>
    <NavBar />
    <div class="container">
      <div><h2 class="text-muted">Console</h2></div>
     <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "630px"
          }}>
          <Terminal
            color='#dee5eb'
            backgroundColor='#191c49'
            fullscreen
            hideTopBar
            startState='maximised'
            showActions={false}
            allowTabs={false}
            watchConsoleLogging
            barColor='#363963'
            msg='Neodymium console opened.'
            style={{ fontWeight: "bold", fontSize: "1em", minHeight: "500px", height: "500px", lineHeight: "1em" }}
            commands={{
              exec: () => alert('Not implemented.'),
            }}
            descriptions={{
              exec: 'Execute Neo-One API command',
              show: false
            }}
          />
      </div>
    </div>
  </React.Fragment>
);

export default Console;
