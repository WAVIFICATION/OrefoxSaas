import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom'
import './index.css';
import App from './App';
import Signin from './signin'
import * as serviceWorker from './serviceWorker';
import Services from './services';
import Signup from './signup';
import ProjectTable from './projectTable'
import Projects from './projects'
import PasswordReset from './ResetPassword'
import EmailValidation from './EmailValidation'
import FAQ from './FAQ';
import Dash from './orefoxDash';




const routing = (
  <div>
    <Router>
    
    <Route exact path="/" component={App} />
    <Route path="/signin" component={Signin} />
    <Route path="/signup" component={Signup}/>
    <Route path="/projects" component={Projects}/>
    <Route path="/projectTable" component={ProjectTable}/>
    <Route path="/PasswordReset" component={PasswordReset}/>
    <Route path='/EmailValidation' component={EmailValidation}/>
    <Route path='/FAQ' component={FAQ}/>
    <Route path='/OrefoxDash' component={Dash}/>
    </Router>
  </div>
  
)





ReactDOM.render(routing,
  /*
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  */

  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
