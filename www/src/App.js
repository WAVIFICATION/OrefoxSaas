import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import TypoGraphy from '@material-ui/core/Typography'
import './App.css';
import NavBar from './navbar.js'
import Signin from './signin.js'
import Signup from './signup.js'
import Services from './services.js'

class App extends Component {
  render(){
    return(
      <div>
        <Services/>
      </div>
    )
  }
}



export default App;
