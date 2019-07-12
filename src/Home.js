import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import NavBar from './components/navbar';

import './Home.css';

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {

    }
  }

  componentDidMount() {

  }

  render() {
    return(
      <div>
        <NavBar />
      </div>
    );
  }
}
export default Home;
