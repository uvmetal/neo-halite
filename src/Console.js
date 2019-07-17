import React from 'react';
import Terminal from 'terminal-in-react';
import NavBar from './components/NavBar/NavBar'
// import NavBar from './components/NavBar/NavBar'

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
            backgroundColor='#000000'
            fullscreen
            hideTopBar
            startState='maximised'
            showActions={false}
            allowTabs={false}
            watchConsoleLogging
            barColor='#363963'
            msg='Your sword is glowing a faint green. A black orc swirls from the shadows. What do you do?'
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
