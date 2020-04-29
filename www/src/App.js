import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import TypoGraphy from '@material-ui/core/Typography'
import './App.css';
import NavBar from './navbar.js'
import Signin from './signin.js'
import Signup from './signup.js'
import Services from './services.js'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

class App extends Component {
  render(){
    return(
      <div>
        <Signup/>
      </div>
    )
  }
}



export default App;
