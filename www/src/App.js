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

import DropzoneDialogExample from './dropzone.js'
import Projects from './projects.js'
import FormDialog from './dialogInput'
import NestedMenu from './rough'
import FormDialog1 from './fileUpload'
import FeedBack from './feedback'
import { Feed } from 'semantic-ui-react';

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
